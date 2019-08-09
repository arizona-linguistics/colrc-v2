import React, { Component } from 'react';
import ReactTable from "react-table";
import AudioPlayer from "../utilities/AudioPlayer";
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { withRouter, Link } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';
import { getTextsQuery } from '../queries/queries';


class TextsList extends Component {
  constructor() {
    super();
    this.state = {
    	data: [],
    	loading: true,
     };
  }

  //we call our main function, which includes all the helper functions.
  async componentDidMount() {
    const getTextData = await this.props.client.query({
      query: getTextsQuery,
      variables: {
      }
    })
    let data = getTextData.data.texts_Q
    console.log(data)
    let newData = this.sourcefiles(data)
    console.log(newData)
  }


sourcefiles(json) {
	//you have the data from getTextsQuery, call it json.  
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
  					title: json[i]["textfiles"][j].resType + " pdf",
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
	  					title: json[i]["textfiles"][j].resType + " image files",
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
  		while (j < json[i]["audiosets"].length) {
  			//here we create the data that is needed to pass to the AudioPlayer
   			json[i]["sourcefiles"].push(
  				{
  					speaker: json[i]["audiosets"][j].speaker,
  					title: json[i]["audiosets"][j].title,
  					sources: json[i]["audiosets"][j].audiofiles,
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
           data={this.props.getTextsQuery.texts_Q}
           loading={this.props.getTextsQuery.loading}
           columns={columns}
           filterable
           SubComponent={row => {
           		return (
           		<ReactTable
           			data={row.original.sourcefiles}
           			columns={subcolumns}
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

export default compose(
  withApollo,
  graphql(getTextsQuery, { name: 'getTextsQuery' }),
)(withRouter(TextsList));
