import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';
import { getRootsQuery, deleteRootMutation, getUserFromToken } from '../queries/queries';
import SimpleKeyboard from "../utilities/SimpleKeyboard";

class RootsDictionary extends Component {
  constructor() {
    //get all the props so we can refer to them
    super();
    //bind the functions we've defined
    this.onDelete = this.onDelete.bind(this);
    //set the initial state
    this.state = {
      //set up an empty array and a loading state for react-table
    	data: [],
      loading: true,
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
      //set up initial state for the checkboxes that allow show/hide columns.  Always default to show Nicodemus and English.  Always initially hide scary-looking orthographies like salish.
      rootSelected: true,
    	numberSelected: false,
	    salishSelected: false,
	    nicodemusSelected: true,
	    englishSelected: true,
	    usernameSelected: true,
      editSelected: false,
      usernameSelected: false,
      activeSelected: false,
      prevIdSelected: false,
      editnoteSelected: false,
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
        admin: user.roles.includes("admin"),
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
    } catch(error) {
      console.log(error)
    }
  }

//handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  handleRootChange(value) {
    this.setState({ rootSelected: !this.state.rootSelected });
  };
  handleNumberChange(value) {
    this.setState({ numberSelected: !this.state.numberSelected });
  };
	handleSalishChange(value) {
    this.setState({ salishSelected: !this.state.salishSelected });
  };
  handleNicodemusChange(value) {
    this.setState({ nicodemusSelected: !this.state.nicodemusSelected });
  };
  handleEnglishChange(value) {
    this.setState({ englishSelected: !this.state.englishSelected });
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
  handleEditnoteChange(value) {
   this.setState({ editnoteSelected: !this.state.editnoteSelected });
  };
  handleEditChange(value) {
   this.setState({ editSelected: !this.state.editSelected });
  };
  
  // allow an admin or owner to delete roots.  Deletion sets the 'active' flag to 'N' on the stems, it does not delete anything
  async onDelete(id) {
    console.log("In deletion");
    try {
      await this.props.deleteRootMutation({
        variables: {
          id: id
        },
    //after setting the flag, refetch the roots from the db
		refetchQueries: [{ query: getRootsQuery }]
      });
      //then send the user back to the rootsdictionary display
      this.props.history.push('/roots');
    } catch (err) {
      console.log(err);
      this.props.history.push('/roots');
    }
  };

  render() {
  //give the render a way to access values for the checkboxes that show/hide columns by setting state
  const { rootSelected, salishSelected, nicodemusSelected, englishSelected, numberSelected, usernameSelected, editSelected, activeSelected, prevIdSelected, editnoteSelected } = this.state;
  
  //provide a function to set column widths dynamically based on the data returned.   
  const getColumnWidth = (rows, accessor, headerText) => {
  	const maxWidth = 600
  	const magicSpacing = 18
  	const cellLength = Math.max(
  	   ...rows.map(row => (`${row[accessor]}` || '').length),
  	  headerText.length,
  	  )
  	  return Math.min(maxWidth, cellLength * magicSpacing)
  };

   //set up the table columns.  Header is the column header text, accessor is the name of the column in the db.
	 const columns = [{
      Header: 'Root',
      accessor: 'root',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["root"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      width: getColumnWidth(this.state.data, 'root', 'Root'),
      show: rootSelected,
  	},
	  {
	    Header: '#',
	    accessor: 'number',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["#"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: 50,
	    show: numberSelected,
	  },
	  {
	    Header: 'Salish',
	    accessor: 'salish',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["salish"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      show: salishSelected,
	  },
	  {
	    Header: 'Nicodemus',
	    accessor: 'nicodemus',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["nicodemus"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    show: nicodemusSelected,
	  },
	  {
	    Header: 'English',
	    accessor: 'english',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      //this should allow text in this column to break on whitespace and wrap, rather than overflowing
	    style: { 'whiteSpace': 'unset' },
		  show: englishSelected,
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
      Header: 'Edit Note',
      accessor: 'editnote',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["editnote"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      width: 75,
      show: editnoteSelected,
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
      show: editSelected,
      //get original row id, allow user to call onDelete, or edit.  Linkto passes original root values into editroot form via the location string
      Cell: ({row, original}) => (
        <div>
          <Button icon floated='right' onClick={() => this.onDelete(original.id)}>
              <Icon name='trash' />
          </Button>
          <Link to={{
            pathname: '/editroot/',
            search: '?id=' + original.id +
            '&root=' + original.root +
            '&number=' + original.number +
            '&salish=' + original.salish +
            '&nicodemus=' + original.nicodemus +
            '&english=' + original.english
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
  const CheckboxRoot = () => (
		<div className="checkBoxMenu">
      <label className="checkBoxLabel">Root</label>
      <input
        name="root"
        type="checkbox"
        checked={this.state.rootSelected}
        onChange={this.handleRootChange.bind(this)}
      />
		  <label className="checkBoxLabel">#</label>
		  <input
		  	name="number"
        type="checkbox"
        checked={this.state.numberSelected}
        onChange={this.handleNumberChange.bind(this)}
      />
		  <label className="checkBoxLabel">Salish</label>
		  <input
		  	name="salish"
        type="checkbox"
        checked={this.state.salishSelected}
        onChange={this.handleSalishChange.bind(this)}
      />
      <label className="checkBoxLabel">Nicodemus</label>
      <input
        name="nicodemus"
        type="checkbox"
        checked={this.state.nicodemusSelected}
        onChange={this.handleNicodemusChange.bind(this)}
      />
      <label className="checkBoxLabel">English</label>
      <input
        name="english"
        type="checkbox"
        checked={this.state.englishSelected}
        onChange={this.handleEnglishChange.bind(this)}
      />  
{/* Here begin the admin-only checkboxes         */}
      {this.state.admin && (
        <div>
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
        <label className="checkBoxLabel">Edit Note</label>
        <input
          name="editnote"
          type="checkbox"
          checked={this.state.editnoteSelected}
          onChange={this.handleEditnoteChange.bind(this)}
        />
        <label className="checkBoxLabel">User Name</label>
        <input
          name="user.username"
          type="checkbox"
          checked={this.state.usernameSelected}
          onChange={this.handleUserChange.bind(this)}
        />
        <label className="checkBoxLabel">Edit/Delete</label>
        <input
          name="edit"
          type="checkbox"
          checked={this.state.editSelected}
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
        data={this.props.getRootsQuery.roots_Q}
        loading={this.props.getRootsQuery.loading}
        columns={columns}
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
      />;

    return (
      <div className='ui content'>
        <h3>Lyon and Green-Wood's Root Dictionary</h3>
        <p></p>
        <div className="text-right">
          { this.state.admin && (
            <div>
              <Link to={{
                pathname: '/addroot/'
              }} >
                <Button icon labelPosition='left' size='small'>
                <Icon name='plus' />
                  Add a root
                </Button>
              </Link>
            </div>
          )}
        </div>
    		<p></p>
    		<SimpleKeyboard />
    		<p></p>
    		<CheckboxRoot />
        {dataOrError}
      </div>
    );
  }
}

export default compose(
	graphql(getRootsQuery, { name: 'getRootsQuery' }),
  graphql(deleteRootMutation, { name: 'deleteRootMutation' })
)(withRouter(withApollo(RootsDictionary)));
