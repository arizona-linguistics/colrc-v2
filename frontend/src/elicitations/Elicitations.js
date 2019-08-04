import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import AudioPlayer from "../utilities/AudioPlayer";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose } from 'react-apollo';
import { getElicitationSetsQuery } from '../queries/queries';

class Elicitations extends Component {
  constructor() {
    super();
    // this.buildEliciationLink = this.buildElicitationLink.bind(this)
    this.state = {
    	data: [],
    	loading: true
     };
  }


  // buildElicitationLink() {
  //   const staticPath = "http://localhost:3500/elicitations/"
  //   let data = this.props.getElicitationSetsQuery.elicitationsets_Q;
  //   if (!this.props.getElicitationSetsQuery.loading) {
  //     console.log(data)
  //     console.log("I'm in the data loop")
  //     let i = 0;
  //     while (i < data.length) {
  //       let j = 0;
  //       while (j < data[i]["elicitationfiles"].length) {
  //         data[i]["elicitationfiles"][j]["src"] = staticPath + data[i]["elicitationfiles"][j]["src"];
  //         console.log(data[i]["elicitationfiles"][j]["src"])
  //         j++;
  //       }
  //       data[i]["key"] = data[i]["id"];
  //       i++;
  //     } 
  //     return data
  //   } else {
  //     return []
  //   }
  // }

  render() {

    const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["title"], threshold: matchSorter.rankings.CONTAINS }),
            filterAll: true,
      //Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    },
    {
      Header: 'Audio',
      accessor: 'audio',
      Cell: ({row, original}) => ( <AudioPlayer key={original.id} title='' sources={original.elicitationfiles} />),
    }
    ];

    const dataOrError = this.state.error ?
         <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
         <ReactTable
           data={this.props.getElicitationSetsQuery.elicitationsets_Q}
           loading={this.props.getElicitationSetsQuery.loading}
           columns={columns}
           filterable
           defaultPageSize={5}
           className="-striped -highlight"
         />;

    return (
      <div className='ui content'>
        <h3>Elicitations</h3>
        <p></p>
        {dataOrError}
		    <p></p>
		    <SimpleKeyboard / >
		    <p></p>
      </div>
    );
  }
}

export default compose(
  graphql(getElicitationSetsQuery, { name: 'getElicitationSetsQuery' }),
)(withRouter(Elicitations));