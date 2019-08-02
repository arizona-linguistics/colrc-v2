import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import AudioPlayer from "../utilities/AudioPlayer";
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { getAudioSetsQuery } from '../queries/queries';
//we will need to get the path to the static server, which is in our .env file

class AudioList extends Component {
  constructor() {
    super();
    this.buildAudioLink = this.buildAudioLink.bind(this)
    this.state = {
    	data: [],
    	loading: true
     };
  }

  buildAudioLink() {
    const staticPath = "http://localhost:3500/texts/"
    console.log("the static path is " + staticPath)
    let data = this.props.getAudioSetsQuery.audiosets_Q;
    if (data) {
      let i = 0;
      while (i < data.length) {
        let j = 0;
        while (j < data[i]["audiofiles"].length) {
          data[i]["audiofiles"][j]["src"] = staticPath + data[i]["audiofiles"][j]["subdir"] + "/" + data[i]["audiofiles"][j]["src"];
            j++;
        }
        data[i]["key"] = data[i]["id"];
        i++;
      } 
      return data
    } else {
      return []
    }
  }

  // async loadAudioSets() {
  //   try {
  //     //assumes audiofiles will all be located in the texts directory
  //     const staticPath = 'http://localhost:3500/texts/';
  //     const response = await fetch(`http://localhost:4000/audiosets?_embed=audiofiles`);
  //     if (!response.ok) {
  //       throw Error(response.statusText);
  //     }
  //     const json = await response.json();
  //     //console.log(json);
  //     // Find audio files for each audioset from the static server
  //     let i = 0;
  //     while (i < json.length) {
  //       let j = 0;
  //       while (j < json[i]["audiofiles"].length) {
  //      json[i]["audiofiles"][j]["src"] = staticPath + json[i]["audiofiles"][j]["subdir"] + "/" + json[i]["audiofiles"][j]["src"];
  //         j++;
  //       }
  //       json[i]["key"] = json[i]["id"];
  //       i++;
  //     }
  //     console.log(json);
  //     this.setState({ loading: false, data: json });
  //   } catch (error) {
  //     console.log("This is my Error: " + error);
  //     this.setState({ error: error });
  //   }
  // }
  render() {

    const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      style: { 'whiteSpace': 'unset'},
      filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["title"], threshold: matchSorter.rankings.CONTAINS }),
            filterAll: true,
    },
    {
      Header: 'Speaker',
      accessor: 'speaker',
      filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["speaker"], threshold: matchSorter.rankings.CONTAINS }),
            filterAll: true,
    },
    {
      Header: 'Audio',
      accessor: 'audio',
      Cell: ({row, original}) => ( <AudioPlayer key={original.id} title='' sources={original.audiofiles} />),
    }
    ];

    const dataOrError = this.state.error ?
         <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
         <ReactTable
           data={this.buildAudioLink()}
           loading={this.props.getAudioSetsQuery.loading}
           columns={columns}
           filterable
           defaultPageSize={5}
           className="-striped -highlight"
         />;

    return (
      <div className='ui content'>
        <h3>Audios</h3>
        <p></p>
        <SimpleKeyboard />
        <p></p>
        {dataOrError}
      </div>
    );
  }
}

export default compose(
  graphql(getAudioSetsQuery, { name: 'getAudioSetsQuery' }),
)(withRouter(AudioList));