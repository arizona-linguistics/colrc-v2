import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import AudioPlayer from "../utilities/AudioPlayer";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SimpleKeyboard from "../utilities/SimpleKeyboard";

class Elicitations extends Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.loadElicitationData = this.loadElicitationData.bind(this);
    this.loadAudioFiles = this.loadAudioFiles.bind(this);
    this.state = {
    	data: [],
    	loading: true
     };
  }

  async componentDidMount() {
    this.loadElicitationData();
  }

  async loadElicitationData() {
    try {
      const staticPath = 'http://localhost:3500/elicitations/';
      const response = await fetch(`http://localhost:4000/elicitations?_embed=audiofiles`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      //console.log(json);
      // Find audio files for each elicitation from the static server
      let i = 0;
      while (i < json.length) {
        //let audioJson = await this.loadAudioFiles(json[i]["id"]);
        let j = 0;
        while (j < json[i]["audiofiles"].length) {
          json[i]["audiofiles"][j]["src"] = staticPath + json[i]["audiofiles"][j]["src"];
          j++;
        }
        //json[i]["audiofiles"] = audioJson;
        json[i]["key"] = json[i]["id"];
        i++;
      }
      console.log(json);
      this.setState({ loading: false, data: json });
    } catch (error) {
      console.log("This is my Error: " + error);
      this.setState({ error: error });
    }
  }

  async loadAudioFiles(elicitationId) {
    //console.log("Elicitation ID = " + elicitationId);
    try {
      const response = await fetch(`http://localhost:4000/audioFiles/?elicitationId=${elicitationId}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      //console.log(json);
      return json;
    } catch (error) {
      console.log("This is my Error: " + error);
      throw Error(error);
    }
  }

  async onDelete(id) {
    //console.log("In deletion");
    try {
      const body = {
        id: id
      };
      const path = 'http://localhost:4000/elicitations/' + id;
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*"
      };
      const response = await axios.delete(path, body, {headers});
      //console.log(response);
      //this.props.history.push(`/rootdictionary`);
      this.loadElicitationData();
    } catch (err) {
      console.log(err);
      this.loadElicitationData();
    }
  };

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
      Cell: ({row, original}) => ( <AudioPlayer key={original.id} title='' sources={original.audiofiles} />),
    }
    ];

    const dataOrError = this.state.error ?
         <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
         <ReactTable
           data={this.state.data}
           loading={this.state.loading}
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

export default withRouter(Elicitations);
