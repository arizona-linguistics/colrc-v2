import React, {	Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Link, withRouter } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react';
import { withApollo, graphql, compose } from 'react-apollo';
import { getAffixesQuery, deleteAffixMutation, getUserFromToken } from '../queries/queries';

class AffixList extends Component {
	constructor(props) {
    //get all the props so we can refer to them
	  super(props);
    //bind the functions we've defined
    this.onDelete = this.onDelete.bind(this);
	  this.weblink = this.weblink.bind(this);
    this.affixDropdown = this.affixDropdown.bind(this); 
    //set the initial state
	  this.state = {
      //set up an empty array and a loading state for react-table
    	data: [],
      loading: true,
      affixvars: {},
      //assume the user is not logged in as admin, prepare to get user info from token
      admin: false,
      fields: {
        first: '',
        last: '',
        email: '',
        username: '',
        password: '',
        roles: []
      },
      //get initial state for the checkboxes that allow show/hide columns from Colrc.js.  
      page: this.props.affixState.page,
      pageSize: this.props.affixState.pageSize,
      sorted: this.props.affixState.sorted,
      filtered: this.props.affixState.filtered,
      resized: this.props.affixState.resized,
      selected: {
        type: this.props.affixState.selected.type,
  		  salish: this.props.affixState.selected.salish,
  		  nicodemus: this.props.affixState.selected.nicodemus,
  		  english: this.props.affixState.selected.english,
  		  link: this.props.affixState.selected.link,
        edit: this.props.affixState.selected.edit,
  	    username: this.props.affixState.selected.username,
        active: this.props.affixState.selected.active,
        prevId: this.props.affixState.selected.prevId,
        editnote: this.props.affixState.selected.editnote,
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
      // now we're going to get only active affixes if we are not admin, else 
      // we will get all the affixes
      // let affixvars = {}
      if (!this.state.fields.roles.includes("admin")){
        this.state.affixvars.active = 'Y'
      }
      const getAffixes = await this.props.client.query({
        query: getAffixesQuery,
        variables: this.state.affixvars 
      })
      this.setState({
        data: getAffixes.data.affixes_Q,
        loading: false
      })
      
    } catch(error) {
      console.log(error)
    }
  } 

componentWillUnmount() {
  let currentState = Object.assign({}, this.state) 
  this.props.changeAffixState(currentState)
}

 //weblink combines whatever is in the link field with whatever is in the page field to make a single element that's a weblink with 'page' as the thing the user sees and 'link' as the destination.
  weblink(link, page) {
    return (
      link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a>
    );
  }

//handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  async handleTypeChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.type = !currentState.selected.type
    await this.setState(currentState)
  }

	async handleSalishChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.salish = !currentState.selected.salish
    await this.setState(currentState)
	}

	async handleNicodemusChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.nicodemus = !currentState.selected.nicodemus
    await this.setState(currentState)
	}

	async handleEnglishChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.english = !currentState.selected.english
    await this.setState(currentState)
	}

	async handleLinkChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.link = !currentState.selected.link
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

  async handleEditnoteChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.editnote = !currentState.selected.editnote
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

// allow an admin or owner to delete affixes.  Deletion sets the 'active' flag to 'N' on the affix, it does not delete anything
  async onDelete(id) {
    console.log("In deletion");
    try {
      await this.props.deleteAffixMutation({
        variables: {
          id: id
        },
      //after setting the flag, refetch the affixes from the db
		  refetchQueries: [{ query: getAffixesQuery, variables: this.state.affixvars }]
      });
      //then send the user back to the affixlist display
      this.props.history.push('/affixes');
    } catch (err) {
      console.log(err.graphQLErrors[0].message);
      this.props.history.push('/affixes');
    }
  };
  affixDropdown(original) {
    if (original === 'd') {
      original = original.replace('d', 'directional')
    } else if (original === 'l') {
      original = original.replace('l', 'locative')
    } else if (original === 'ls') {
      original = original.replace('ls', 'lexical suffix')
    } else if (original === 'lp') {
      original = original.replace('lp', 'lexical prefix')
    } 
    return(<span>{original}</span>)
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
	    Header: 'Type',
	    accessor: 'type',
	    width: 100,
      //setup the dropdown menu for 'type'.
		  filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return row[filter.id] === filter.value;
      },
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option value="d">Directional</option>
          <option value="l">Locative</option>
          <option value="lp">Lexical Prefixes</option>
          <option value="ls">Lexical Suffixes</option>
        </select>,
      show: this.state.selected.type,
      Cell: ({row, original}) => ( this.affixDropdown(original.type) )
	  	},
  	  {
  	    Header: 'Salish',
  	    accessor: 'salish',
  	    filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["salish"], threshold: matchSorter.rankings.CONTAINS }),
            filterAll: true,
        show: this.state.selected.salish,
  	  },
  	  {
  	    Header: 'Nicodemus',
  	    accessor: 'nicodemus',
  	    filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nicodemus"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
        show: this.state.selected.nicodemus,
  	  	},
  	  {
  	    Header: 'English',
  	    accessor: 'english',
  	    style: { 'whiteSpace': 'unset' },
  	    filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
        show: this.state.selected.english,
  	  	},
  	  {
  	    Header: 'Link',
  	    accessor: 'link',
  	    Cell: ({row, original}) => ( this.weblink(original.link, original.page) ),
  	    show: this.state.selected.link,
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
        Header: 'Edit Note',
        accessor: 'editnote',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["editnote"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
        width: 75,
        show: this.state.selected.editnote,
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
        //get original row id, allow user to call onDelete, or edit.  Linkto passes original affix values into editaffix form via the location string
        Cell: ({row, original}) => (
          <div>
            <Button icon floated='right' onClick={() => this.onDelete(original.id)}>
                <Icon name='trash' />
            </Button>
            <Link to={{
              pathname: '/editaffix/',
              search: '?id=' + original.id +
              '&type=' + original.type +
              '&salish=' + original.salish +
              '&nicodemus=' + original.nicodemus +
              '&english=' + original.english +
              '&link=' + original.link +
              '&page=' + original.page +
              '&editnote=' + original.editnote 
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
	const CheckboxAffix = () => (
		<div className="checkBoxMenu">
		  <label className="checkBoxLabel">Type</label>
      <input
        name="type"
        type="checkbox"
        checked={this.state.selected.type}
        onChange={this.handleTypeChange.bind(this)}
      />
      <label className="checkBoxLabel">Salish</label>
		  <input
		  	name="salish"
        type="checkbox"
        checked={this.state.selected.salish}
        onChange={this.handleSalishChange.bind(this)}
      />
      <label className="checkBoxLabel">Nicodemus</label>
      <input
        name="nicodemus"
        type="checkbox"
        checked={this.state.selected.nicodemus}
        onChange={this.handleNicodemusChange.bind(this)}
      />
      <label className="checkBoxLabel">English</label>
      <input
        name="english"
        type="checkbox"
        checked={this.state.selected.english}
        onChange={this.handleEnglishChange.bind(this)}
      />
      <label className="checkBoxLabel">Link</label>
      <input
        name="link"
        type="checkbox"
        checked={this.state.selected.link}
        onChange={this.handleLinkChange.bind(this)}
      />
{/* Here begin the admin-only checkboxes   */}
      {this.state.admin && (
        <div>
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
        <label className="checkBoxLabel">Edit Note</label>
        <input
          name="editnote"
          type="checkbox"
          checked={this.state.selected.editnote}
          onChange={this.handleEditnoteChange.bind(this)}
        />
        <label className="checkBoxLabel">User Name</label>
        <input
          name="user.username"
          type="checkbox"
          checked={this.state.selected.username}
          onChange={this.handleUserChange.bind(this)}
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
        <h3>Affix List</h3>
	  	  <div className="text-right">
          { this.state.admin && (
            <div>
              <Link to={{
                pathname: '/addaffix/'
              }} >
                <Button icon labelPosition='left' size='small'>
                  <Icon name='plus' />
                  Add an affix
                </Button>
              </Link>
          </div>
          )}
		    </div>
  		  <p></p>
  		  <SimpleKeyboard />
  		  <p></p>
  		  <CheckboxAffix />
        <p></p>
  		  {dataOrError}
  		</div>
	  );
	}
}

export default compose(
	graphql(getAffixesQuery, { name: 'getAffixesQuery' }),
	graphql(deleteAffixMutation, { name: 'deleteAffixMutation' })
)(withRouter(withApollo(AffixList)));
