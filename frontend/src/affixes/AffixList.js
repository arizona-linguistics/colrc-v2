import React, {	Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Link, withRouter } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import { withApollo, graphql, compose } from 'react-apollo';
import { getAffixesQuery, deleteAffixMutation, getUserFromToken } from '../queries/queries';

class AffixList extends Component {
	constructor(props) {
    //get all the props so we can refer to them
	  super(props);
    //bind the functions we've defined
    this.onDelete = this.onDelete.bind(this);
    this.weblink = this.weblink.bind(this);
    this.onDelete = this.onDelete.bind(this);
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
      //set up initial state for the checkboxes that allow show/hide columns.  Always default to show Nicodemus and English.  Always initially hide scary-looking orthographies like salish.
      typeSelected: false,
		  salishSelected: false,
		  nicodemusSelected: true,
		  englishSelected: true,
		  linkSelected: true,
      editSelected: false,
	    usernameSelected: false,
      activeSelected: false,
      prevIdSelected: false,
      editnoteSelected: false,
	  };
	}

 //weblink combines whatever is in the link field with whatever is in the page field to make a single element that's a weblink with 'page' as the thing the user sees and 'link' as the destination.
	weblink(link, page) {
		return (
			link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a>
		);
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
          console.log("My user is ")
          console.log(this.state.fields)
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
          console.log("here's the anonymous user role " + this.state.fields.roles)
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

//handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  handleTypeChange(value) {
   this.setState({ typeSelected: !this.state.typeSelected });
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
	handleLinkChange(value) {
	 this.setState({ linkSelected: !this.state.linkSelected });
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
// allow an admin or owner to delete affixes.  Deletion sets the 'active' flag to 'N' on the affix, it does not delete anything
  async onDelete(id, setSubmitting) {
    console.log("In deletion");
    try {
      await this.props.deleteAffixMutation({
        variables: {
          id: id
        },
      //after setting the flag, refetch the affixes from the db
		  refetchQueries: [{ query: getAffixesQuery, variables: this.state.affixvars }]
      });
      setSubmitting(false)
      console.log(setSubmitting)
      //then send the user back to the affixlist display
      this.props.history.push('/affixes');
    } catch (err) {
      console.log(err.graphQLErrors[0].message);
      setSubmitting(false)
      this.props.history.push('/affixes');
    }
  };

	render() {
    //give the render a way to access values for the checkboxes that show/hide columns by setting state
    const { typeSelected, salishSelected, nicodemusSelected, englishSelected, linkSelected, usernameSelected, editSelected, activeSelected, prevIdSelected, editnoteSelected } = this.state;
    
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
	  const columns = [{
	    Header: 'Type',
	    accessor: 'type',
	    width: 100,
      show: typeSelected,
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
          <option value="d">Directional ('d')</option>
          <option value="l">Locative ('l')</option>
        </select>,
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
  	    style: { 'whiteSpace': 'unset' },
  	    filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
        show: englishSelected,
  	  	},
  	  {
  	    Header: 'Link',
  	    accessor: 'link',
  	    Cell: ({row, original}) => ( this.weblink(original.link, original.page) ),
  	    show: linkSelected,
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
        show: editSelected,
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
        checked={this.state.typeSelected}
        onChange={this.handleTypeChange.bind(this)}
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
      <label className="checkBoxLabel">Link</label>
      <input
        name="link"
        type="checkbox"
        checked={this.state.linkSelected}
        onChange={this.handleLinkChange.bind(this)}
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

    //now build the table.  If successful, the table will populate, if error the error message will appear.
    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
			  data={this.state.data}
			  loading={this.state.loading}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight left"
        filterable
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
