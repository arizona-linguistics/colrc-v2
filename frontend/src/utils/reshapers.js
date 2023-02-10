export function sortReshape(sortBy, sortId) {
    let res = []
    sortBy.forEach((item) => {
        let h = {}
        if (item.desc) {
            h = { [item.id]: "desc"}
        }
        else {
            h = { [item.id]: "asc"}           
        }
        res.push(h)
    })
    if (sortId) {
      res.push({[sortId]: "asc"})
    }
    else {
      res.push({"id": "asc"})
    }
    console.log("The result of the sort: ", res)
    
    return(res)
}

// "where": { "_and": [
//                      {"active": {"_eq": "Y"}}, 
//                      {"_and": [
//                                  {"english": {"_like": "%pu"}}, 
//                                  {"nicodemus": {"_like": "%ha%"}},
//                                  {"_or": [
//                                            {"english": {"_like": "%he%"}},
//                                            {"nicodemus": {"_like": "%he%"}}
//                                          ]
//                                  }
//                               ]
//                      }
//                    ]
//           }
//
// "filters": [
//     {
//       "id": "nicodemus",
//       "value": "ha"
//     },
//     {
//       "id": "english",
//       "value": "pu"
//     },
//   ]
//
//  "globalFilter": "he"
//
//  "globalFilterVariables": ["english", "nicodemus"]


export function filterReshape(filters, globalFilter, globalFilterVariables) {
    //console.log('filters', filters)
    //console.log('globalFilter', globalFilter)
    //console.log('globalFilterVariables', globalFilterVariables)
    let res = {}
    let andCond = []
    let globalOrCond = []

    if (globalFilterVariables && globalFilter) {
        globalFilterVariables.forEach((item) => {
            let h = {}
            h = { [item]: { "_ilike": "%" + globalFilter + "%" } }     
            globalOrCond.push(h)        
        })
    }

    if (filters) {
        filters.forEach((item) => {
            let h = {}
            if (item.id.includes(".")) {
                // Make an assumption that there is only one '.' char in the string
                let [outer, inner] = item.id.split(".")
                h = { [outer]: { [inner]: { "_ilike": "%" + item.value + "%" } } }
            } else {
                h = { [item.id]: { "_ilike": "%" + item.value + "%" } }
            }
            andCond.push(h)
        })
    }
    if (globalFilter && globalFilterVariables && globalFilterVariables.length > 0 && globalFilter.length > 0) {
        andCond.push({"_or": globalOrCond})
    }

    if (andCond.length > 0) {
        res = {"_and": andCond}
    } else {
        res = {}
    }
        
    console.log("The filter result: ", res)

    return(res)
}

export function textReshape(jsonData) {
    let json = JSON.parse(JSON.stringify(jsonData))
    console.log("our json is ", json)
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
        while (j < json[i]["texts_textfiles"].length) {
          // Convert metadata into series of fields and values
          let metadata = []
          if (json[i]["texts_textfiles"][j]["textfilemetadata"].length > 0) {
            Object.entries(json[i]["texts_textfiles"][j]["textfilemetadata"][0].metadata).forEach(
              ([field, value]) => metadata.push({field: field, value: value}))
          }
          
          json[i]["sourcefiles"].push(
            {
              src: json[i]["texts_textfiles"][j].src,
              title: json[i]["texts_textfiles"][j].resType + " pdf",
              fileType: json[i]["texts_textfiles"][j].fileType,
              metadata: metadata,
              msType: json[i]["texts_textfiles"][j].msType,
              path: json[i]["texts_textfiles"][j].textfile_with_path,
              type: "text",
              key: k
            }
          );
          if (json[i]["texts_textfiles"][j]["textimages"].length > 0) {
            k++;
            // for each textfile, build the query string so that imageviewer can derive the images from it.
            let l = 0;
            json[i]["texts_textfiles"][j]["imagequerystring"]='';
            while (l < json[i]["texts_textfiles"][j]["textimages"].length) {
              json[i]["texts_textfiles"][j]["imagequerystring"] = json[i]["texts_textfiles"][j]["imagequerystring"] + '&images=' + json[i]["texts_textfiles"][j]["textimages"][l]["textimage_with_path"];
              l++;
            }
            //console.log(json[i]["texts_textfiles"][j]["imagequerystring"]);

          json[i]["sourcefiles"].push(
              {
                src: json[i]["texts_textfiles"][j]["imagequerystring"],
                title: json[i]["texts_textfiles"][j].resType + " image files",
                fileType: json[i]["texts_textfiles"][j].fileType,
                type: "textimages",
                key: k
              }
            );
            //SplitView needs to know if the imagefiles are for handwritten
            //or typed fieldnotes.  Here's where we tell it.
            if (json[i]["texts_textfiles"][j].msType === "Handwritten") {
              handImages = json[i]["texts_textfiles"][j]["imagequerystring"];
            }
              if (json[i]["texts_textfiles"][j].msType === "Typed") {
              typedImages = json[i]["texts_textfiles"][j]["imagequerystring"];
            }
          }
          j++; k++;
        }
        j=0;
        while (j < json[i]["audiosets"].length) {
          //here we create the data that is needed to pass to the AudioPlayer
          let l = 0
          while (l < json[i]["audiosets"][j].audiosets_audiofiles.length) { 
            json[i]["audiosets"][j].audiosets_audiofiles[l].key = i.toString() + '_' + j.toString() + '_' + l.toString()
            l++
          }
          console.log('the audiosets_audiofiles are ', json[i]["audiosets"][j].audiosets_audiofiles)
          json[i]["sourcefiles"].push(
            {
              speaker: json[i]["audiosets"][j].speaker,
              title: json[i]["audiosets"][j].title,
              sources: json[i]["audiosets"][j].audiosets_audiofiles,
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

   export function audioReshape(jsonData) {
    let json = JSON.parse(JSON.stringify(jsonData))
    while (json.length) {
      let i = 0
      let j = 0
      while (i < json["audiosets"][i].audiosets_audiofiles.length) { 
        json["audiosets"][i].audiosets_audiofiles[j].key = i.toString() + '_' + j.toString() 
        i++
      }
      json[i]["sourcefiles"].push(
        {
          speaker: json[i]["audiosets"][j].speaker,
          title: json[i]["audiosets"][j].title,
          sources: json[i]["audiosets"][j].audiosets_audiofiles,
          type: "audio",
          key: i
        }
      );
      i++; 
    }
    return json;
   }

   export function elicitationReshape(jsonData) {
    let json = JSON.parse(JSON.stringify(jsonData))
    while (json.length) {
      let i = 0
      let j = 0
      while (i < json["elicitationsets"][i].elicitationsets_elicitationfiles.length) { 
        json["elicitationsets"][i].elicitationsets_elicitationfiles[j].key = i.toString() + '_' + j.toString() 
        i++
      }
      json[i]["sourcefiles"].push(
        {
          speaker: json[i]["elicitationsets"][j].speaker,
          title: json[i]["elicitationsets"][j].title,
          sources: json[i]["elicitationsets"][j].elicitationsets_elicitationfiles,
          type: "audio",
          key: i
        }
      );
      i++; 
    }
    return json;
   }