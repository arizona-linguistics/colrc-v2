import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import AudioPlayer from "../utilities/AudioPlayer";
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { getAudioSetsQuery, getAudioFilesQuery } from '../queries/queries';

class AudioList extends Component {
  constructor() {
    super();
    // this.loadAudioSets = this.loadAudioSets.bind(this);
    this.state = {
    	data: [],
    	loading: true
     };
  }

  async componentDidMount() {
    // this.loadAudioSets();
  }

  // async loadAudioSets() {
  //   try {
  //     //assumes audiofiles will all be located in the texts directory
  //     const staticPath = 'http://localhost:3500/texts/';
      // const response = await fetch(this.props.getAudioFilesQuery.audiofiles_Q);
      // if (!response.ok) {
      //   throw Error(response.statusText);
      // }
      // const json = await response.json();
      //console.log(json);
      // Find audio files for each audioset from the static server
    //   let i = 0;
    //   while (i < json.length) {
    //     let j = 0;
    //     while (j < json[i]["audiofiles"].length) {
    // 	  json[i]["audiofiles"][j]["src"] = staticPath + json[i]["audiofiles"][j]["subdir"] + "/" + json[i]["audiofiles"][j]["src"];
    //       j++;
    //     }
    //     json[i]["key"] = json[i]["id"];
    //     i++;
    //   }
    //   console.log(json);
    //   this.setState({ loading: false, data: json });
    // } catch (error) {
    //   console.log("This is my Error: " + error);
    //   this.setState({ error: error });
    // }
  //}

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
           data={this.props.getAudioSetsQuery.audiosets_Q}
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
  graphql(getAudioFilesQuery, { name: 'getAudioFilesQuery' })
)(withRouter(AudioList));