import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import AudioPlayer from "../utilities/AudioPlayer";
import { withRouter, Link } from 'react-router-dom';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Button, Icon } from 'semantic-ui-react'
import { withApollo, graphql, compose } from 'react-apollo';
import { getElicitationSetsQuery } from '../queries/queries';

class Elicitations extends Component {
  isMounted = false
  
  constructor(props) {
    super(props);
    this.state = {
    	data: [],
      loading: true,
      //assume the user is not logged in as admin, prepare to get user info from token
      admin: this.props.admin,
      //get initial state for the checkboxes that allow show/hide columns from Colrc.js.
      page: this.props.elicitationState.page,
      pageSize: this.props.elicitationState.pageSize,
      sorted: this.props.elicitationState.sorted,
      filtered: this.props.elicitationState.filtered,
      resized: this.props.elicitationState.resized,
      selected: {
        title: this.props.elicitationState.selected.title,
        audio: this.props.elicitationState.selected.audio,
        transcription: this.props.elicitationState.selected.transcription,
        username: this.props.elicitationState.selected.username,
        active: this.props.elicitationState.selected.active,
        prevId: this.props.elicitationState.selected.prevId,
        edit: this.props.elicitationState.selected.edit,
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true
    try {
      let variables = {}
      if (!this.state.admin){
        variables.active = 'Y'
      }    
      // now we're going to get only active elicitations if we are not admin, else 
      // we will get all the elicitations
      const getElicitationSets = await this.props.client.query({
        query: getElicitationSetsQuery,
        variables: variables 
      })
      let currentState = Object.assign({}, this.state)
      currentState.data = getElicitationSets.data.elicitationsets_Q
      currentState.loading = false
      if (this._isMounted) {
        await this.setState(currentState)
      }
    } catch(error) {
      console.log(error)
    }
  } 

  async componentWillUnmount() {
    this._isMounted = false;
    console.log("affixList is unmounting")
  }

  //handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  async handleActiveChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.active = !currentState.selected.active
    await this.setState(currentState)
  }

  async handlePrevIdChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.prevId = !currentState.selected.prevId
    await this.setState(currentState)
  }

	async handleUserChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.username = !currentState.selected.username
    await this.setState(currentState)
  }
  
  async handleEditChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.edit = !currentState.selected.edit
    await this.setState(currentState)
  }

  async handlePageChange(page) {
    console.log(page)
    let currentState = Object.assign({}, this.state) 
    currentState.page = page
    await this.setState(currentState)
  }

  async handlePageSizeChange(pageSize,page) {
    console.log(pageSize + ' ' + page)
    let currentState = Object.assign({}, this.state) 
    currentState.pageSize = pageSize
    currentState.page = page
    await this.setState(currentState)
  }

  async handleSortChange(newSorted,column,shiftKey) {
    let currentState = Object.assign({}, this.state) 
    currentState.sorted = newSorted
    await this.setState(currentState)
  }

  async handleFilteredChange(filtered,column) {
    let currentState = Object.assign({}, this.state) 
    console.log('filtered = ' + filtered + ', column = ' + column)
    console.log(filtered)
    console.log(column)
    currentState.filtered = filtered
    await this.setState(currentState)
  }

  async handleResizedChange(newResized, event) {
    let currentState = Object.assign({}, this.state) 
    currentState.resized = newResized
    await this.setState(currentState)
  }

  render() {
    //give the render a way to access values for the checkboxes that show/hide columns by setting state
    const { admin } = this.state
     //provide a function to set column widths dynamically based on the data returned.       
   	const getColumnWidth = (rows, accessor, headerText) => {
  	  const maxWidth = 600
  	  const magicSpacing = 15
  	  const cellLength = Math.max(
  	    ...rows.map(row => (`${row[accessor]}` || '').length),
  	    headerText.length,
  	  )
  	  return Math.min(maxWidth, cellLength * magicSpacing)
    };
    //set up the table columns.  Header is the column header text, accessor is the name of the column in the db.
    const columns = [
    {
      Header: 'Item',
      accessor: 'title',
      width: 300,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["title"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      style: { 'whiteSpace': 'unset'},
    },
    {
      Header: 'Audio',
      accessor: 'audio',
      Cell: ({row, original}) => ( <AudioPlayer key={original.key} title={original.title} speaker={original.speaker} language={original.language} sources={original.elicitationfiles} />),
    }, 
    { 
      Header: 'Transcription'
    },
    {
      Header: 'Active',
      accessor: 'active',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["active"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      show: this.state.selected.active,
      width: 50,
    },
    {
      Header: 'PrevID',
      accessor: 'prevId',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["prevId"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      show: this.state.selected.prevId,
      width: 50,
    },
    {
      Header: 'User Name',
      accessor: 'user.username',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["user.username"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      show: this.state.selected.username,
      width: 100,
    },
    {
      Header: 'Edit Note',
      accessor: 'editnote',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["editnote"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      width: 75,
      show: this.state.selected.editnote,
    },
    {
      Header: 'Edit',
      filterable: false,
      sortable: false,
      show: this.state.selected.edit,
      width: 100,
      //get original row id, allow user to call onDelete, or edit.  Linkto passes original elicitation values into editelicitation form via the location string
        Cell: ({row, original}) => (
          <div>
            <Link to={{
              pathname: '/editelicitation/',
              search: '?id=' + original.id +
              '&type=' + original.title +
              '&salish=' + original.transcription
            }} >
            <Button icon floated='right'>
              <Icon name='edit' />
            </Button>
            </Link>
          </div>
        )
    }
    ];

     //setup the checkbox bar that allows users to show/hide columns, viewable only to admin.
	  const CheckboxElicitation = () => (
      this.state.admin && (
        <div className="checkBoxMenu">
          <label className="checkBoxLabel">Active</label>
          <input
            name="active"
            type="checkbox"
            checked={this.state.selected.active}
            onChange={this.handleActiveChange.bind(this)}
          />
          <label className="checkBoxLabel">PrevId</label>
          <input
            name="prevId"
            type="checkbox"
            checked={this.state.selected.prevId}
            onChange={this.handlePrevIdChange.bind(this)}
          />
          <label className="checkBoxLabel">User Name</label>
          <input
            name="user.username"
            type="checkbox"
            checked={this.state.selected.username}
            onChange={this.handleUserChange.bind(this)}
          />
          <label className="checkBoxLabel">Edit</label>
          <input
            name="edit"
            type="checkbox"
            checked={this.state.selected.edit}
            onChange={this.handleEditChange.bind(this)}
          />
        </div>
      )
    );
      

    //now build the table.  If successful, the table will populate, if error the error message will appear.
    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.state.data}
        loading={this.state.data.loading}
        columns={columns}
        pageSize={this.state.pageSize}
        className="-striped -highlight left"
        filterable
        filtered={this.state.filtered}
        sorted={this.state.sorted}
        page={this.state.page}
        resized={this.state.resized}
        onPageChange={page => this.handlePageChange(page)}
        onPageSizeChange={(pageSize,page) => this.handlePageSizeChange(pageSize,page)}
        onSortedChange={(newSorted,column,shiftKey) => this.handleSortChange(newSorted,column,shiftKey)}
        onResizedChange={(newResized, event) => this.handleResizedChange(newResized, event)}
        onFilteredChange={(filtered, column) => this.handleFilteredChange(filtered,column)}
      />;

    return (
      <div className='ui content'>
        <h3>Elicitations</h3>
        <p></p>
        <CheckboxElicitation />
		    <p></p>
        {dataOrError}
		    <p></p>
		    <SimpleKeyboard />
        <p></p>
      </div>
    );
  }
}

export default compose(
  graphql(getElicitationSetsQuery, { name: 'getElicitationSetsQuery' }),  
)(withRouter(withApollo(Elicitations)));