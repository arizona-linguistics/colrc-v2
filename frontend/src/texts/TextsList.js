import React, { Component } from 'react';
import ReactTable from "react-table";
import AudioPlayer from "../utilities/AudioPlayer";
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { withRouter, Link } from 'react-router-dom';

/* This is complicated. We're using a bunch of loops; in functional 
* programming we would probably use mapping.  Whatevs, we wanted to
* get something that worked in our mockdb world.  We need to access the 
* following tables in db.json: 
* 	texts = the outermost info for each element: id, title, speaker, and 
*		cycle
*	textfiles = the pdfs associated with each text:  id, subdir(=subdirectory
*		containing the file), src(=filename), title(=Typed Manuscript or 
*		Handwritten Fieldnotes), fileType(=pdf), and textId.
*	textimages = the sets of png files associated with each textfile: id, 
*		textfileId, subdir, and src.
* 	audiosets = each audio element will have multiple audiofiles (.wav, 
*		.mp3).  The audiosets table collects those files into a single 
*		audio entry, and allow us to connect audios to texts: id, title,
* 		speaker, textId
*	audiofiles = the audiofiles that are associated with each audioset 
*		(this table is also used for the elicitation audios): id, subdir
*		(subdirectory is needed because audios associated with texts are 
*		stored in the relevant text directory on our static server), 
*		src, direct, elicitationId, audiosetId.
*	To generate all the 'versions' for each text, we do the following steps:
*	Step 1:  Collect all the textfiles associated with a text (loadTextData), 
*		returns an array of hashes at the level of each text, = 'textfiles'
*		The fetch returns a structure like this:
*		{
*    		"id": 1,
*		    "title": "Cricket Rides Coyote",
*    		"speaker": "Dorthy Nicodemus or Tom Miyal (unconfirmed)",
*		    "cycle": "Coyote Cycle",
*		    "textfiles": [
*      			{
*        			"id": 1,
*        			"subdir": "CricketRidesCoyote",
*	        		"src": "CricketRidesCoyote_Hand.pdf",
*	        		"title": "Handwritten Fieldnotes",
*	        		"msType": "Handwritten",
*	        		"fileType": "pdf",
*	        		"textId": 1
*      			},
*      			{
*   	    		"id": 2,
*	        		"subdir": "CricketRidesCoyote",
*	        		"src": "CricketRidesCoyote_Typed.pdf",
*	       			"title": "Typed Manuscript",
*	        		"msType": "Typed",
*	        		"fileType": "pdf",
*	        		"textId": 1
*      			},
*      			{
*	       			"id": 3,
* 	       			"subdir": "CricketRidesCoyote",
*        			"src": "CricketRidesCoyote_Engl.pdf",
*        			"title": "English Translation",
* 	        		"msType": "English",
*	        		"fileType": "pdf",
*	        		"textId": 1
*      			}
*    		]
*	  	}
*	Step 2:  Collect all the audiofiles associated with a text (loadAudioFiles),
*		returns an array of hashes at the level of each text, = 'audiofiles'
*		The fetch returns a structure like this:
*		{
*		    "id": 1,
*		    "title": "Cricket Rides Coyote - Coeur d'Alene",
*		    "speaker": "Lawrence Nicodemus",
*		    "textId": 1,
*		    "audiofiles": [
*		      {
*		        "id": 11,
*		        "subdir": "CricketRidesCoyote",
*		        "src": "CricketRidesCoyote_Crd.wav",
*		        "type": "audio/wav",
*		        "direct": "yes",
*		        "elicitationId": 0,
*		        "audiosetId": 1
*		      },
*		      {
*		        "id": 12,
*		        "subdir": "CricketRidesCoyote",
*		        "src": "CricketRidesCoyote_Crd.mp3",
*		        "type": "audio/mp3",
*		        "direct": "yes",
*		        "elicitationId": 0,
*		        "audiosetId": 1
*		      }
*		    ]
*		  },
*	Step 3:  Collect all the imagefiles associated with a textfile (
*		loadTextImages), returns an array of hashes at the level of each 
*		textfile, = 'textimages'.  The fetch returns a structure like this:
*		 {
*		    "id": 13,
*		    "textfileId": 1,
*		    "subdir": "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
*		    "src": "CricketRidesCoyote_Hand1.png"
*		  },
*		  {
*		    "id": 14,
*		    "textfileId": 1,
*		    "subdir": "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
*		    "src": "CricketRidesCoyote_Hand2.png"
*		  },
*		  {
*		    "id": 15,
*		    "textfileId": 1,
*		    "subdir": "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
*		    "src": "CricketRidesCoyote_Hand3.png"
*		  },
*	Step 4: Combine textfiles, audiofiles and imagefiles into loadTextsData. 
*	Step 5: Make an array that flattens and regularizes the the data so that
* 		our ReactTable subcomponent can create what's needed in each row.  The
*		array is called 'sourcefiles' and this is what feeds our display.
*	Step 6: Build the structures ReactTable needs to display textfiles, image
*		galleries, audiofiles, and splitview.  Call these in a cell definition
*		in our ReactTable subcomponent for 'versions'.
*	Step 7: Have a cup of coffee.
*/
class TextsList extends Component {
  constructor() {
    super();
    this.loadTextsData = this.loadTextsData.bind(this);
    this.loadAudioFiles = this.loadAudioFiles.bind(this);
    this.loadTextImages = this.loadTextImages.bind(this);
    this.sourcefiles = this.sourcefiles.bind(this);
    this.state = {
    	data: [],
    	loading: true
     };
  }

  //we call our main function, which includes all the helper functions.
  async componentDidMount() {
    this.loadTextsData();
  }
  
  async loadTextsData() {
  	//this is the main function.  It grabs all the data we need, and sets 
  	//the data for the state, and indicates we're no longer loading, or it 
  	//throws an error.
    try {
      const staticPath = 'http://localhost:3500/texts/';
      const response = await fetch(`http://localhost:4000/texts?_embed=textfiles`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let json = await response.json();
      console.log(json);
      //Find files for each text from the static server
      	let i = 0;
      	while (i < json.length) {
         	//wait for the audio to be loaded into audioJson.
        	let audioJson = await this.loadAudioFiles(json[i]["id"]);
        	let j = 0;
        	//loop through the textfiles array and combine the static path with 
        	//the subdirectory to create a working link to the file.
        	//also retreive all associated textimages for this textfile.  
        	//all textimages will be linked under the textimages hash key.
        	while (j < json[i]["textfiles"].length) {
          		json[i]["textfiles"][j]["src"] = staticPath + json[i]["textfiles"][j]["subdir"] + "/" + json[i]["textfiles"][j]["src"];
          		let imageJson = await this.loadTextImages(json[i]["textfiles"][j]["id"]);
				json[i]["textfiles"][j]["textimages"] = imageJson;
          		j++;
       		}
       		//'audiofiles' is the hash key for all the returned audio files, 
       		//a unique key is assigned so that the react table will know which
       		//row this belongs to.
        	json[i]["audiofiles"] = audioJson;
        	json[i]["key"] = json[i]["id"];
        	i++;
      	}
      //this is where all the the texts, audio and textimages are reshaped so 
      //that the react table can display them properly. We set the state to 
      //indicate we're no longer loading and add the reshaped data to the state.
      json=this.sourcefiles(json);
      console.log(json);
      this.setState({ loading: false, data: json });
    } catch (error) {
      console.log("This is my Error: " + error);
      this.setState({ error: error });
    }
  }

  async loadAudioFiles(textId) {
  	//this is the helper function that collects audio files and associates
  	//them with a text.
	const staticPath = 'http://localhost:3500/texts/';
	//after setting up the static path, we get all the audio files that
	//are in an audio set that has a textId that matches the textId we've 
	//been given.
    try {
      const response = await fetch(`http://localhost:4000/audiosets/?_embed=audiofiles&textId=${textId}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      //console.log(json);
  	  let i = 0;
  	  //for each audioset, look through the audiofiles.  Then reform the
  	  //path so that the data can be found.  
  	  while (i < json.length) {
    	let j = 0;
    	while (j < json[i]["audiofiles"].length) {
      		json[i]["audiofiles"][j]["src"] = staticPath + json[i]["audiofiles"][j]["subdir"] + "/" + json[i]["audiofiles"][j]["src"];
        	j++;
      	}
      	i++;
      }
      return json;
    } catch (error) {
      console.log("This is my Error: " + error);
      throw Error(error);
    }
  }

  async loadTextImages(textfileId) {
	const staticPath = 'http://localhost:3500/texts/';
	//after setting the static path, find each imagefile associated with the 
	//textfileId that you are given.
    try {
      const response = await fetch(`http://localhost:4000/textimages?textfileId=${textfileId}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      //console.log(json);
  	  let i = 0;
  	  //for each imagefile, reformulate the path so that the file can be found.
  	  while (i < json.length) {
      	json[i]["src"] = staticPath + json[i]["subdir"] + "/" + json[i]["src"];
      	i++;
      }
      console.log(json);
      return json;
    } catch (error) {
      console.log("This is my Error: " + error);
      throw Error(error);
    }
  }

sourcefiles(json) {
	//you have the json that was created from the loadTextData function.  
	//Now reformulate it so that the ReactTable display can handle it.
  	let i = 0;
  	let k = 0;
  	//set an empty string to hold handImages, and one to hold typedImages.  
  	//These are needed for the SplitView utility that displays handwritten and 
  	//typed fieldnotes side-by-side.
  	while (i < json.length) {
  		let handImages = '';
  		let typedImages = '';
  		//set an empty array to hold 'sourcefiles'.
  		json[i]["sourcefiles"] = [];
  		let j=0;
  		//for each text, provide the data fields 'src', 'title', 'fileType'
  		//'msType'.  Set the entry type as 'text', and give it a key.
  		while (j < json[i]["textfiles"].length) {
  			json[i]["sourcefiles"].push(
  				{
  					src: json[i]["textfiles"][j].src,
  					title: json[i]["textfiles"][j].title + " pdf",
  					fileType: json[i]["textfiles"][j].fileType,
  					msType: json[i]["textfiles"][j].msType,
  					type: "text",
  					key: k
  				}
  			);
  			if (json[i]["textfiles"][j]["textimages"].length > 0) {
  				k++;
  				// for each textfile, build the query string so that imageviewer can derive the images from it.
  				let l = 0;
  				json[i]["textfiles"][j]["imagequerystring"]='';
  				while (l < json[i]["textfiles"][j]["textimages"].length) {
  					json[i]["textfiles"][j]["imagequerystring"] = json[i]["textfiles"][j]["imagequerystring"] + '&images=' + json[i]["textfiles"][j]["textimages"][l]["src"];
  					l++;
  				}
	  			console.log(json[i]["textfiles"][j]["imagequerystring"]);
	 			json[i]["sourcefiles"].push(
	  				{
	  					src: json[i]["textfiles"][j]["imagequerystring"],
	  					title: json[i]["textfiles"][j].title + " image files",
	  					fileType: json[i]["textfiles"][j].fileType,
	  					type: "textimages",
	  					key: k
	  				}
	  			);
	  			//SplitView needs to know if the imagefiles are for handwritten
	  			//or typed fieldnotes.  Here's where we tell it.
	  			if (json[i]["textfiles"][j].msType === "Handwritten") {
	  				handImages = json[i]["textfiles"][j]["imagequerystring"];
	  			}
  	  			if (json[i]["textfiles"][j].msType === "Typed") {
	  				typedImages = json[i]["textfiles"][j]["imagequerystring"];
	  			}
  			}
  			j++; k++;
  		}
  		j=0;
  		while (j < json[i]["audiofiles"].length) {
  			//here we create the data that is needed to pass to the AudioPlayer
   			json[i]["sourcefiles"].push(
  				{
  					speaker: json[i]["audiofiles"][j].speaker,
  					title: json[i]["audiofiles"][j].title,
  					sources: json[i]["audiofiles"][j].audiofiles,
  					type: "audio",
  					key: k
  				}
  			);
  			j++; k++;
  		}
  		//SplitView should only appear if a text has both a set of handwritten
  		//fieldnots and a corresponding set of typed manuscripts. 
  		//For SplitView to read in the imagefiles into the, correct gallery 
  		//we need to modify the query string to replace every instance of 
  		//'images' with either 'handimages' or 'typedimages'.  We use unshift 
  		//instead of push to put the SplitView at the top of the versions list, 
  		//iff a text has a SplitView.
	   	if ( handImages.length >0 && typedImages.length >0){
	   		handImages=handImages.replace(/images/g, "handimages");
			typedImages=typedImages.replace(/images/g, "typedimages");
			json[i]["sourcefiles"].unshift(
				{
					src: handImages + typedImages,
					title: "Dual view of typed and handwritten notes",
					fileType: "images",
					type: "splitview",
					key: k
				}
			);		
	   	}
  		i++;
   	}
   	return json;
 }
	//weblink builds the clickable link for a textfile.
	weblink(link, page) {
		return (
			link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a> 
		);
	}
 render() {
	const columns = [
	    {
		    Header: 'Title',
		    accessor: 'title',
	    },
	    {
	    	Header: 'Speaker',
	    	accessor: 'speaker',
	    },
	    {
	    	Header: 'Cycle',
	      	accessor: 'cycle',
	    },
	];

    const subcolumns = [

		{
			Header: 'Versions',
			accessor: 'source',
			style: { paddingLeft: "50px" },
	    	Cell: ({row, original}) =>
	    	//This builds the different kinds of entries via the sourcefiles
	    	//json.  If the file is a text (pdf), then weblink is called to 
	    	//build the link.  Else, if the file is an audio, then AudioPlayer 
	    	//is called.  Else, if there are textimage sets, we link to 
	    	//ImageViewer. Else, we build SplitView.    
	    	(
	    		original.type === "text" 
	    		? this.weblink(original.src, original.title) 
	    		: (original.type === "audio" 
	    			? <AudioPlayer key={original.key} title={original.title} speaker={original.speaker} sources={original.sources} /> 
	    			: (original.type ==="textimages"
	    				? <Link to={{
			              	pathname: '/imageviewer/',
			              	search: '?key=' + original.key + original.src }}
			              	target="_blank"
			              	rel="noopener noreferrer" 
			          	>
			            	{original.title}
			          	</Link>
				        : <Link to={{
			          		pathname: '/splitview/',
			          		search: '?key=' + original.key + original.src }}
			          		target="_blank"
			          		rel="noopener noreferrer"
			          	>
				          	{original.title}
				          	</Link>	
			          	)
	    			)
	    	)
		},
    ];
    const dataOrError = this.state.error ?
         <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
         <ReactTable
           data={this.state.data}
           loading={this.state.loading}
           columns={columns}
           filterable
           SubComponent={row => {
           		return (
           		<ReactTable
           			data={row.original.sourcefiles}
           			//data={testRecord}
           			columns={subcolumns}
           			//defaultPageSize={testRecord.length}
          			defaultPageSize={row.original.sourcefiles.length}
           			showPagination={false}
           			/>
           		);
           	}} 
	   	  />
    return (
      <div className='ui content'>
        <h3>Texts</h3>
        <SimpleKeyboard />
        <p></p>
        {dataOrError}
      </div>

    );
  }
}

export default withRouter(TextsList);

