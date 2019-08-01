import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import AudioPlayer from "../utilities/AudioPlayer";
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { getAudioSetsQuery } from '../queries/queries';

class AudioList extends Component {
  constructor() {
    super();
    this.state = {
    	data: [],
    	loading: true
     };
  }
  
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
)(withRouter(AudioList));