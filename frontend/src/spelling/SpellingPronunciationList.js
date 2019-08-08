import React, { Component } from 'react';
import DecoratedTextSpan from '../utilities/DecoratedTextSpan';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SimpleKeyboard from '../utilities/SimpleKeyboard';
import { Link, withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from 'react-apollo';
import { getSpellingsQuery, deleteSpellingMutation, getUserFromToken } from '../queries/queries';
import { Button, Icon } from 'semantic-ui-react';

class SpellingPronunciationList extends Component {
  constructor(props) {
    //get all the props so we can refer to them
    super(props);
    //set the initial state
    this.onDelete = this.onDelete.bind(this);
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
      //set up initial state for the checkboxes that allow show/hide columns.
	    nicodemusSelected: true,
	    salishSelected: false,
		  reichardSelected: false,
	    englishSelected: true,
      noteSelected: false,
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
      // now we're going to get only active roots if we are not admin, else 
      // we will get all the roots
      let spellvars = {}
      if (!this.state.fields.roles.includes("admin")){
        spellvars.active = 'Y'
      }
      const getSpellings = await this.props.client.query({
        query: getSpellingsQuery,
        variables: spellvars 
      })
      this.setState({
        data: getSpellings.data.spellings_Q,
        loading: false
      })
    } catch(error) {
      console.log(error)
    }
  } 

//handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
	handleNicodemusChange(value) {
	    this.setState({ nicodemusSelected: !this.state.nicodemusSelected });
	};
	handleReichardChange(value) {
		this.setState({ reichardSelected: !this.state.reichardSelected });
	};
	handleSalishChange(value) {
		this.setState({ salishSelected: !this.state.salishSelected });
	};
	handleEnglishChange(value) {
		this.setState({ englishSelected: !this.state.englishSelected });
	};
	handleNoteChange(value) {
		this.setState({ noteSelected: !this.state.noteSelected });
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

   // allow an admin or owner to delete spellings.  Deletion sets the 'active' flag to 'N' on the spelling, it does not really delete anything
	async onDelete(id) {
    console.log("In deletion");
    try {
      this.props.deleteSpellingMutation({
        variables: {
          id: id
        },
    //after setting the flag, refetch the spellings from the db
    refetchQueries: [{ query: getSpellingsQuery }]
    });
    //then send the user back to the spellinglist display
      this.props.history.push('/spelling');
    } catch (err) {
      console.log(err);
      this.props.history.push('/spelling');
    }
  };

  render() {
    const { admin } = this.state
    //give the render a way to access values for the checkboxes that show/hide columns by setting state
    const { nicodemusSelected, reichardSelected, salishSelected, englishSelected, noteSelected,usernameSelected, editSelected, activeSelected, prevIdSelected, editnoteSelected } = this.state;
    //define the columns for the react table.  This table is set up as a single column with subcolumns.  Note that the utility 'DecoratedTextSpan' is invoked in cells where we expect markup for bold or underline.
  	const columns=[{
  		Header: "List of Symbols",
  		columns: [{
  			Header: 'Nicodemus',
  		  accessor: 'nicodemus',
  	    show: nicodemusSelected,
  			filterMethod: (filter, rows) =>
  	      matchSorter(rows, filter.value, { keys: ["nicodemus"], threshold: matchSorter.rankings.CONTAINS }),
  	    filterAll: true,
  		  Cell: row => ( <DecoratedTextSpan str={row.value} />	),
      },{
        Header: 'Reichard',
        accessor: 'reichard',
  	    show: reichardSelected,
  		  filterMethod: (filter, rows) =>
  	      matchSorter(rows, filter.value, { keys: ["reichard"], threshold: matchSorter.rankings.CONTAINS }),
  	    filterAll: true,
      },{
        Header: 'Salish',
        accessor: 'salish',
  	    show: salishSelected,
  	   	filterMethod: (filter, rows) =>
  	      matchSorter(rows, filter.value, { keys: ["salish"], threshold: matchSorter.rankings.CONTAINS }),
  	    filterAll: true,
      },{
        Header: 'English',
        accessor: 'english',
  	    show: englishSelected,
  	  	filterMethod: (filter, rows) =>
  	    matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
  	    filterAll: true,
        Cell: row => ( <DecoratedTextSpan str={row.value} />	),
      },{
        Header: 'Note',
        accessor: 'note',
  	    style: { 'whiteSpace': 'unset' },
        show: noteSelected,
        filterMethod: (filter, rows) =>
				matchSorter(rows, filter.value, {
					keys: ["note"],
					threshold: matchSorter.rankings.CONTAINS
				}),
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
      show: editSelected,
      //get original row id, allow user to call onDelete, or edit.  Linkto passes original root values into editroot form via the location string
      Cell: ({row, original}) => (
        <div>
          <Button icon floated='right' onClick={() => this.onDelete(original.id)}>
              <Icon name='trash' />
          </Button>
          <Link to={{
            pathname: '/editspell/',
            search: '?id=' + original.id +
            '&reichard=' + original.reichard +
            '&nicodemus=' + original.nicodemus +
            '&salish=' + original.salish +
            '&english=' + original.english +
            '&note=' + original.note
          }} >
          <Button icon floated='right'>
          	<Icon name='edit' />
          </Button>
          </Link>
        </div>
        )
      }
    ]
  	}];
  //setup the checkbox panel to allow show/hide columns
  const CheckboxSpelling = () => (
		<div className="checkBoxMenu">
		  <label className="checkBoxLabel">Nicodemus</label>
		  <input
		  	name="nicodemus"
        type="checkbox"
        checked={this.state.nicodemusSelected}
        onChange={this.handleNicodemusChange.bind(this)}
      />
		  <label className="checkBoxLabel">Reichard</label>
		  <input
		  	name="reichard"
        type="checkbox"
        checked={this.state.reichardSelected}
        onChange={this.handleReichardChange.bind(this)}
      />
      <label className="checkBoxLabel">Salish</label>
      <input
        name="salish"
        type="checkbox"
        checked={this.state.salishSelected}
        onChange={this.handleSalishChange.bind(this)}
      />
      <label className="checkBoxLabel">English</label>
      <input
        name="english"
        type="checkbox"
        checked={this.state.englishSelected}
        onChange={this.handleEnglishChange.bind(this)}
      />
      <label className="checkBoxLabel">Note</label>
      <input
        name="note"
        type="checkbox"
        checked={this.state.noteSelected}
        onChange={this.handleNoteChange.bind(this)}
      />
{/* Here begin the admin-only checkboxes   */}
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
    //then build the table, or show an error
    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.state.data}
        loading={this.state.loading}
        columns={columns}
        filterable
        defaultPageSize={20}
        className="-striped -highlight"
      />;

    return (     
	  	<div className='ui content'> 
        <h3>Spelling and Pronounciation</h3>
        <div className="text-right">
        { this.state.admin && (
          <div>
            <Link to={{pathname: '/addspell/'}} >
              <Button icon labelPosition='left' size='small'>
                <Icon name='plus' />
                Add a spelling
              </Button>
            </Link>
          </div>
        )}
        </div>
			  <p> </p>
        <SimpleKeyboard />
        <p>Spelling and Pronouncing Coeur d'Alene</p>
        <CheckboxSpelling />
        {dataOrError}
        <p></p>
		  </div>
	  );
  }
}

export default compose(
  graphql(getSpellingsQuery, { name: 'getSpellingsQuery' }),
  graphql(deleteSpellingMutation, { name: 'deleteSpellingMutation' })
)(withRouter(withApollo(SpellingPronunciationList)));

