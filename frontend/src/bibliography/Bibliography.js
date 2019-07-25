import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import BibliographyAccordion from "../accordions/BibliographyAccordion";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import { getBibliographiesQuery, deleteBibliographyMutation } from '../queries/queries';
import { graphql, compose } from 'react-apollo';


class Bibliography extends Component {
  constructor() {
    //get all the props so we can refer to them
    super();
    //bind the functions we've defined
    this.onDelete = this.onDelete.bind(this);
    this.weblink = this.weblink.bind(this);
    //set the initial state
    this.state = {
      //set up an empty array and a loading state for react-table
      data: [],
      loading: true,
      //set up initial state for the checkboxes that allow show/hide columns.  Always default to show main content.  Always initially hide procedural content.
      authorSelected: true,
		  yearSelected: true,
		  titleSelected: true,
      referenceSelected: true,
		  linkSelected: true,
      linktextSelected: true,
      activeSelected: false,
      prevIdSelected: false,
      usernameSelected: false,
    };
  }

//weblink combines whatever is in the link field with whatever is in the page field to make a single element that's a weblink with 'page' as the thing the user sees and 'link' as the destination.
  weblink(link, page) {
    return (
      link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a>
    );
  }

  //handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  handleAuthorChange(value) {
    this.setState({ authorSelected: !this.state.authorSelected });
  };
  handleYearChange(value) {
    this.setState({ yearSelected: !this.state.yearSelected });
  };
  handleTitleChange(value) {
    this.setState({ titleSelected: !this.state.titleSelected });
  };
  handleReferenceChange(value) {
    this.setState({ referenceSelected: !this.state.referenceSelected });
  };
  handleLinkChange(value) {
    this.setState({ linkSelected: !this.state.linkSelected });
  };
  handleLinktextChange(value) {
    this.setState({ linktextSelected: !this.state.linktextSelected });
  };
  handleActiveChange(value) {
    this.setState({ activeSelected: !this.state.activeSelected });
  };
  handlePrevIdChange(value) {
    this.setState({ prevIdSelected: !this.state.prevIdSelected });
  };
  handleUserChange(value) {
    this.setState({ usernameSelected: !this.state.usernameSelected });
  };  

  // allow an admin or owner to delete bibliography entry.  Deletion sets the 'active' flag to 'N' on the bibliography, it does not delete anything
  async onDelete(id){
    console.log("In deletion");
    try {
      this.props.deleteBibliographyMutation({
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
  //give the render a way to access values for the checkboxes that show/hide columns by setting state
  const { authorSelected, yearSelected, titleSelected, referenceSelected, linkSelected, linktextSelected, activeSelected, prevIdSelected, usernameSelected  } = this.state;

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
  show: authorSelected,
  filterMethod: (filter, rows) =>
    matchSorter(rows, filter.value, { keys: ["author"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      
  },
{
  Header: 'Year',
  accessor: 'year',
  maxWidth: 100,
  show: yearSelected,
  filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["year"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
  },
{
  Header: 'Title',
  accessor: 'title',
  show: titleSelected,
  style: { 'whiteSpace': 'unset'},
  Cell: ({row, original}) => ( this.weblink(original.link, original.title) ),
  filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["title"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
  },
{
  Header: 'Reference',
  accessor: 'reference',
  show: referenceSelected,
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
  show: activeSelected,
  width: 50,
},
{
  Header: 'PrevID',
  accessor: 'prevId',
  filterMethod: (filter, rows) =>
    matchSorter(rows, filter.value, { keys: ["prevId"], threshold: matchSorter.rankings.CONTAINS }),
  filterAll: true,
  show: prevIdSelected,
  width: 50,
},
{
  Header: 'User Name',
  accessor: 'user.username',
  filterMethod: (filter, rows) =>
    matchSorter(rows, filter.value, { keys: ["user.username"], threshold: matchSorter.rankings.CONTAINS }),
  filterAll: true,
  show: usernameSelected,
  width: 100,
},
{
  Header: 'Edit/Delete',
  filterable: false,
  sortable: false,
  width: 100,
  //get original row id, allow user to call onDelete, or edit.  Linkto passes original affix values into editaffix form via the location string
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
        checked={this.state.authorSelected}
        onChange={this.handleAuthorChange.bind(this)}
      />
		  <label className="checkBoxLabel">Year</label>
      <input
        name="year"
        type="checkbox"
        checked={this.state.yearSelected}
        onChange={this.handleYearChange.bind(this)}
      />
      <label className="checkBoxLabel">Title</label>
      <input
        name="title"
        type="checkbox"
        checked={this.state.titleSelected}
        onChange={this.handleTitleChange.bind(this)}
      />
      <label className="checkBoxLabel">Reference</label>
      <input
        name="reference"
        type="checkbox"
        checked={this.state.referenceSelected}
        onChange={this.handleReferenceChange.bind(this)}
      />
      <label className="checkBoxLabel">User</label>
      <input
        name="username"
        type="checkbox"
        checked={this.state.usernameSelected}
        onChange={this.handleUserChange.bind(this)}
      />
      <label className="checkBoxLabel">Active</label>
      <input
        name="active"
        type="checkbox"
        checked={this.state.activeSelected}
        onChange={this.handleActiveChange.bind(this)}
      />
      <label className="checkBoxLabel">PrevId</label>
      <input
        name="prevId"
        type="checkbox"
        checked={this.state.prevIdSelected}
        onChange={this.handlePrevIdChange.bind(this)}
      />      
    </div>
	);


    //now build the table.  If successful, the table will populate, if error the error message will appear.
    const dataOrError = this.state.error ?
     <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
     <ReactTable
       data={this.props.getBibliographiesQuery.bibliographies_Q}
       loading={this.props.getBibliographiesQuery.loading}
       columns={columns}
       filterable
       defaultPageSize={10}
       className="-striped -highlight"
     />;

    return (
      <div>
      	<BibliographyAccordion />
      	<p></p>
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
	graphql(getBibliographiesQuery, { name: 'getBibliographiesQuery' })
)(withRouter(Bibliography));
