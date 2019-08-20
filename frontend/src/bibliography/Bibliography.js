import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import BibliographyAccordion from "../accordions/BibliographyAccordion";
import { Link, withRouter } from "react-router-dom";
import { getBibliographiesQuery, deleteBibliographyMutation, getUserFromToken } from '../queries/queries';
import { withApollo, graphql, compose } from 'react-apollo';


class Bibliography extends Component {
  constructor(props) {
    //get all the props so we can refer to them
    super(props);
    //bind the functions we've defined
    this.onDelete = this.onDelete.bind(this);
    this.weblink = this.weblink.bind(this);
    //set the initial state
    this.state = {
      //set up an empty array and a loading state for react-table
      data: [],
      loading: true,
      bibvars: {},
      //assume the user is not logged in as admin, prepare to get user info from token
      admin: false,
      //set up initial state for the checkboxes that allow show/hide columns.  Always default to show main content.  Always initially hide procedural content.
      page: this.props.bibliographyState.page,
      pageSize: this.props.bibliographyState.pageSize,
      sorted: [],
      filtered: [],
      resized: [],
      selected: {
        author: this.props.bibliographyState.selected.author,
  		  year: this.props.bibliographyState.selected.year,
  		  title: this.props.bibliographyState.selected.title,
        reference: this.props.bibliographyState.selected.reference,
        edit: this.props.bibliographyState.selected.edit,
  	    username: this.props.bibliographyState.selected.username,
        active: this.props.bibliographyState.selected.active,
        prevId: this.props.bibliographyState.selected.prevId,
      }
    };
  }
    //get user from token, find out users' roles
    async componentDidMount() {
      try {
        const token = localStorage.getItem('TOKEN')
          if (token) {
            let userQuery = await this.props.client.query({
              query: getUserFromToken,
            })
            const user = userQuery.data.getUserFromToken_Q
            // set the state with user info based on token, and if the user has an 'admin' role, set 
            // the state variable 'admin' to true.  Else, set it to false. 
            await this.setState({
              // if the roles array includes admin, set state to logged in as admin
              admin: user.roles.includes("admin")  || user.roles.includes("owner") || user.roles.includes("update"),
              fields: {
                first: user.first,
                last: user.last,
                email: user.email,
                username: user.username,
                roles: user.roles
              }
            }) 
            console.log("My user is " + user)
            console.log(this.state)
          } else {
            await this.setState({
              admin: false,
              fields: {
                first: "anonymous",
                last: "anonymous",
                email: "anonymous",
                username: "anonymous",
                roles: ["view"]
              }
            })
            console.log(this.state)
            console.log("and here's the role " + this.state.fields.roles)
          }
        //now we're going to get only active bibliographies if we are not admin, else 
        //we will get all the bibliographies
        if (!this.state.fields.roles.includes("admin")){
          let currentState = Object.assign({}, this.state) 
          currentState.bibvars.active = 'Y'
          await this.setState(currentState)
        }
        const getBibliographies = await this.props.client.query({
          query: getBibliographiesQuery,
          variables: this.state.bibvars 
        })
        await this.setState({
          data: getBibliographies.data.bibliographies_Q,
          loading: false,
        })
        
      } catch(error) {
        console.log(error)
      }
  } 

  async componentWillUnmount() {
    let currentState = Object.assign({}, this.state) 
    await this.props.changeBibliographyState(currentState)
  }
  //handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
//weblink combines whatever is in the link field with whatever is in the page field to make a single element that's a weblink with 'page' as the thing the user sees and 'link' as the destination.
  weblink(link, page) {
    return (
      link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a>
    );
  }
  async handleAuthorChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.author = !currentState.selected.author
    await this.setState(currentState)
  }
  async handleYearChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.year = !currentState.selected.year
    await this.setState(currentState)
  }
  async handleTitleChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.title = !currentState.selected.title
    await this.setState(currentState)
  }
  async handleReferenceChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.reference = !currentState.selected.reference
    await this.setState(currentState)
  }
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
    let currentState = Object.assign({}, this.state) 
    currentState.page = page
    await this.setState(currentState)
  }
  async handlePageSizeChange(pageSize,page) {
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
    currentState.filtered = filtered
    await this.setState(currentState)
  }
  async handleResizedChange(newResized, event) {
    let currentState = Object.assign({}, this.state) 
    currentState.resized = newResized
    await this.setState(currentState)
  }

  // allow an admin or owner to delete bibliography entry.  Deletion sets the 'active' flag to 'N' on the bibliography, it does not delete anything
  async onDelete(id){
    console.log("In deletion");
    try {
      await this.props.deleteBibliographyMutation({
        variables: {
        id: id
      },
      //after setting the flag, refetch the bibliography from the db
	  	refetchQueries: [{ query: getBibliographiesQuery }]
      });
      //then send the user back to the bibliography display
      this.props.history.push('/bibliography');
    } catch (err) {
      console.log(err);
      this.props.history.push('/bibliography');
    }
  };

render() {

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
const columns = [{
  Header: 'Author',
  accessor: 'author',
  style: { 'whiteSpace': 'unset'},
  show: this.state.selected.author,
  filterMethod: (filter, rows) =>
    matchSorter(rows, filter.value, { keys: ["author"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
  },
  {
  Header: 'Year',
  accessor: 'year',
  maxWidth: 100,
  show: this.state.selected.year,
  filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["year"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
  },
  {
  Header: 'Title',
  accessor: 'title',
  show: this.state.selected.title,
  style: { 'whiteSpace': 'unset'},
  Cell: ({row, original}) => ( this.weblink(original.link, original.title) ),
  filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["title"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
  },
  {
  Header: 'Reference',
  accessor: 'reference',
  show: this.state.selected.reference,
  style: { 'whiteSpace': 'unset' }, //allows text to wrap in a cell
  filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["reference"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
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
  Header: 'Edit/Delete',
  filterable: false,
  sortable: false,
  show: this.state.selected.edit,
  width: 100,
  //get original row id, allow user to call onDelete, or edit.  Linkto passes original bibliography values into editbib form via the location string
  Cell: ({row, original}) => (
    <div>
      <Button icon floated='right' onClick={() => this.onDelete(original.id)}>
          <Icon name='trash' />
      </Button>
      <Link to={{
        pathname: '/editbib/',
        search: '?id=' + original.id +
        '&author=' + original.author +
        '&year=' + original.year +
        '&title=' + original.title +
        '&reference=' + original.reference +
        '&link=' + original.link +
        '&linktext=' + original.linktext
      }} >
      <Button icon floated='right'>
        <Icon name='edit' />
      </Button>
      </Link>
    </div>
  )
}
];

  //setup the checkbox bar that allows users to show/hide columns
	const CheckboxBibliography = () => (
		<div className="checkBoxMenu">
		  <label className="checkBoxLabel">Author</label>
      <input
        name="author"
        type="checkbox"
        checked={this.state.selected.author}
        onChange={this.handleAuthorChange.bind(this)}
      />
		  <label className="checkBoxLabel">Year</label>
      <input
        name="year"
        type="checkbox"
        checked={this.state.selected.year}
        onChange={this.handleYearChange.bind(this)}
      />
      <label className="checkBoxLabel">Title</label>
      <input
        name="title"
        type="checkbox"
        checked={this.state.selected.title}
        onChange={this.handleTitleChange.bind(this)}
      />
      <label className="checkBoxLabel">Reference</label>
      <input
        name="reference"
        type="checkbox"
        checked={this.state.selected.reference}
        onChange={this.handleReferenceChange.bind(this)}
      />
{/* Here begin the admin-only checkboxes   */}
      {this.state.admin && (
        <div>
        <label className="checkBoxLabel">Username</label>
        <input
          name="user.username"
          type="checkbox"
          checked={this.state.selected.username}
          onChange={this.handleUserChange.bind(this)}
        />
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
        <label className="checkBoxLabel">Edit/Delete</label>
        <input
          name="edit"
          type="checkbox"
          checked={this.state.selected.edit}
          onChange={this.handleEditChange.bind(this)}
        />
        </div>
      )}     
    </div>
	);


    //now build the table.  If successful, the table will populate, if error the error message will appear.
    const dataOrError = this.state.error ?
     <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
     <ReactTable
        data={this.state.data}
        loading={this.state.loading}
        columns={columns}
        filterable
        className="-striped -highlight"
        filtered={this.state.filtered}
        sorted={this.state.sorted}
        pageSize={this.state.pageSize}
        page={this.state.page}
        resized={this.state.resized}
        onPageChange={page => this.handlePageChange(page)}
        onPageSizeChange={(pageSize,page) => this.handlePageSizeChange(pageSize,page)}
        onSortedChange={(newSorted,column,shiftKey) => this.handleSortChange(newSorted,column,shiftKey)}
     />;

    return (
      <div>
      	<BibliographyAccordion />
      	<p></p>
        <div className='ui content'>
          <h3>Bibliography List</h3>
        </div>
        <div className="text-right">
          <Link to={{
            pathname: '/addbib/'
          }} >
            <Button icon labelPosition='left' size='small'>
              <Icon name='plus' />
              Add an entry
            </Button>
          </Link>
        </div>
        <p> </p>
		    <SimpleKeyboard />
		    <p> </p>
        <CheckboxBibliography />
		    <p> </p>
        <div>{dataOrError}</div>
      </div>
    );
  }
}


export default compose(
  graphql(getBibliographiesQuery, { name: 'getBibliographiesQuery' }),
  graphql(deleteBibliographyMutation, { name: 'deleteBibliographyMutation' })  
)(withRouter(withApollo(Bibliography)));
