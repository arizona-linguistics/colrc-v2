import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import AudioPlayer from "../utilities/AudioPlayer";
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { getAudioSetsQuery } from '../queries/queries';

class AudioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: [],
    	loading: true,
      page: this.props.audioState.page,
      pageSize: this.props.audioState.pageSize,
     };
  }
  async handlePageChange(page) {
    console.log(page)
    await this.setState({
      page: page
    });
    await this.props.changeAudioState({
      page: this.state.page,
      pageSize: this.state.pageSize
    })
  }
  async handlePageSizeChange(pageSize,page) {
    console.log(pageSize + ' ' + page)
    await this.setState({
      page: page,
      pageSize: pageSize,
    });
    await this.props.changeAudioState({
      page: this.state.page,
      pageSize: this.state.pageSize
    })
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
        pageSizeOptions={[1, 5, 10, 20, 25, 50, 100]}
        pageSize={this.state.pageSize}
        className="-striped -highlight"
        page={this.state.page}
        onPageChange={page => this.handlePageChange(page)}
        onPageSizeChange={(pageSize,page) => this.handlePageSizeChange(pageSize,page)}
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