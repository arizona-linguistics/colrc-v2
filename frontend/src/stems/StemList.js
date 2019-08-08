import React, {Component} from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import DecoratedTextSpan from '../utilities/DecoratedTextSpan';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Link, withRouter } from "react-router-dom";
import { withApollo, graphql, compose } from 'react-apollo';
import { getStemsQuery, deleteStemMutation, getUserFromToken } from '../queries/queries';
import { Button, Icon } from 'semantic-ui-react';

class StemList extends Component {

	constructor() {
    //get all the props so we can refer to them
		super();
    //bind the functions we've defined
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
      //set up initial state for the checkboxes that allow show/hide columns.  Always default to show Nicodemus and English.  Always initially hide scary-looking orthographies like salish.
			categorySelected: false,
      reichardSelected: false,
			doakSelected: false,
			salishSelected: false,
			nicodemusSelected: true,
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
            admin: user.roles.includes("admin") || user.roles.includes("owner") || user.roles.includes("update"),
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
      // now we're going to get only active stems if we are not admin, else 
      // we will get all the stems
      let stemvars = {}
      if (!this.state.fields.roles.includes("admin")){
        stemvars.active = 'Y'
      }
      const getStems = await this.props.client.query({
        query: getStemsQuery,
        variables: stemvars 
      })
      this.setState({
        data: getStems.data.stems_Q,
        loading: false
      })

    } catch(error) {
      console.log(error)
    }
  } 

//handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  handleCategoryChange(value) {
    this.setState({ categorySelected: !this.state.categorySelected });
  };
	handleReichardChange(value) {
		this.setState({ reichardSelected: !this.state.reichardSelected });
	};
	handleDoakChange(value) {
    this.setState({ doakSelected: !this.state.doakSelected });
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
  // allow an admin or owner to delete stems.  Deletion sets the 'active' flag to 'N' on the stem, it does not really delete anything
	async onDelete(id) {
	    console.log("In deletion");
	    try {
				this.props.deleteStemMutation({
					variables: {
						id: id
					},
      //after setting the flag, refetch the stems from the db
			refetchQueries: [{ query: getStemsQuery }]
			});
      //then send the user back to the stemlist display
				this.props.history.push('/stems');
			} catch (err) {
				console.log(err);
				this.props.history.push('/stems');
			}
	  };

	render() {
    //give the render a way to access values for the checkboxes that show/hide columns by setting state
		const { categorySelected, reichardSelected, doakSelected, salishSelected, nicodemusSelected, englishSelected,noteSelected, usernameSelected, editSelected, activeSelected, prevIdSelected, editnoteSelected } = this.state;

    const { admin } = this.state
    //provide a function to set column widths dynamically based on the data returned.   
		const getColumnWidth = (rows, accessor, headerText) => {
			const maxWidth = 600
			const magicSpacing = 22
			const cellLength = Math.max(
				...rows.map(row => (`${row[accessor]}` || '').length),
				headerText.length,
			)
			return Math.min(maxWidth, cellLength * magicSpacing)
		};

   //set up the table columns.  Header is the column header text, accessor is the name of the column in the db. 
		const columns = [{
			Header: 'Category',
			accessor: 'category',
			width: getColumnWidth(this.state.data, 'category', 'Type'),
      //build dropdown list for this column
			filterMethod: (filter, row) => {
				if (filter.value === "all") {
					return true;
				}
				return row[filter.id] === filter.value;
			},
			Filter: ({filter, onChange}) =>
				<select onChange = { event => onChange(event.target.value)}
					style = {{ width: "100%"}}
					value = {filter ? filter.value : "all"} >
				<option value = "all" > Show All </option>
				<option value = "v" > Verbs </option>
				<option value = "n" > Nouns </option>
				<option value = "aci" > Other </option>
				</select>,
		}, 
    {
			Header: 'Reichard',
			accessor: 'reichard',
			filterMethod: (filter, rows) =>
  			matchSorter(rows, filter.value, {
  				keys: ["reichard"],
  				threshold: matchSorter.rankings.CONTAINS
			}),
			filterAll: true,
			show: reichardSelected,
		}, 
    {
			Header: 'Doak',
			accessor: 'doak',
			filterMethod: (filter, rows) =>
				matchSorter(rows, filter.value, {
					keys: ["doak"],
					threshold: matchSorter.rankings.CONTAINS
				}),
			filterAll: true,
			show: doakSelected,
		}, 
    {
			Header: 'Salish',
			accessor: 'salish',
			filterMethod: (filter, rows) =>
				matchSorter(rows, filter.value, {
					keys: ["salish"],
					threshold: matchSorter.rankings.CONTAINS
				}),
			filterAll: true,
			show: salishSelected,
		}, {
			Header: 'Nicodemus',
			accessor: 'nicodemus',
			filterMethod: (filter, rows) =>
				matchSorter(rows, filter.value, {
					keys: ["nicodemus"],
					threshold: matchSorter.rankings.CONTAINS
				}),
			filterAll: true,
      //some Nicodemus entries have markup like <underline></underline>.  DecoratedTextSpan interprets this.
		  Cell: row => ( <DecoratedTextSpan str={row.value} />),
			show: nicodemusSelected,
		}, 
    {
			Header: 'English',
			accessor: 'english',
      //style whiteSpace unset allows English to break on word boundaries rather than overflowing
			style: { 'whiteSpace': 'unset'},
			filterMethod: (filter, rows) =>
				matchSorter(rows, filter.value, {
					keys: ["english"],
					threshold: matchSorter.rankings.CONTAINS
				}),
			filterAll: true,
			show: englishSelected,
		}, 
    {
			Header: 'Note',
			accessor: 'note',
			style: { 'whiteSpace': 'unset' },
			filterMethod: (filter, rows) =>
				matchSorter(rows, filter.value, {
					keys: ["note"],
					threshold: matchSorter.rankings.CONTAINS
				}),
			filterAll: true,
			show: noteSelected,
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
            pathname: '/editstem/',
            search: '?id=' + original.id +
            '&category=' + original.category +
            '&reichard=' + original.reichard +
            '&doak=' + original.doak +
            '&salish=' + original.salish +
            '&nicodemus=' + original.nicodemus +
            '&english=' + original.english +
            '&note=' + original.note
          }} >
          <Button icon floated='right'>
          	<Icon name='edit' />
          </Button>
          </Link>
        </div>
        )
      }];

  //setup the checkbox bar that allows users to show/hide columns
  const CheckboxStem = () => (
    <div className="checkBoxMenu">
      <label className="checkBoxLabel">Category</label>
      <input
        name="category"
        type="checkbox"
        checked={this.state.categorySelected}
        onChange={this.handleCategoryChange.bind(this)}
      />
      <label className="checkBoxLabel">Reichard</label>
      <input
        name="reichard"
        type="checkbox"
        checked={this.state.reichardSelected}
        onChange={this.handleReichardChange.bind(this)}
      />
      <label className="checkBoxLabel">Doak</label>
      <input
        name="doak"
        type="checkbox"
        checked={this.state.doakSelected}
        onChange={this.handleDoakChange.bind(this)}
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

    //now build the table.  If successful, the table will populate, if error the error message will appear.
		const dataOrError = this.state.error ?
     <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
			<ReactTable
				data={this.state.data}
				loading={this.state.loading}
				columns = {columns}
				defaultPageSize = {10}
				className = "-striped -highlight left"
				filterable
			/>;
		return ( 
      <div className = 'ui content'>
        <h3>Stem List</h3>
			  <div className="text-right">
        { this.state.admin && (
          <div>
            <Link to={{pathname: '/addstem/'}} >
              <Button icon labelPosition='left' size='small'>
                <Icon name='plus' />
                Add a stem
              </Button>
            </Link>
          </div>
        )}
        </div>
			  <p> </p>
        <SimpleKeyboard />
        <p>Stem categories used by Reichard: 'Other' = 'Adverbs, Interjections, Conjunctions'</p>
        <CheckboxStem />
        {dataOrError}
        <p></p>
			</div>
		);
	}
}

export default compose(
  withApollo, 
	graphql(getStemsQuery, { name: 'getStemsQuery' }),
	graphql(deleteStemMutation, { name: 'deleteStemMutation' })
)(withRouter(StemList));
