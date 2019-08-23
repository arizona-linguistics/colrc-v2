import React, {Component} from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import DecoratedTextSpan from '../utilities/DecoratedTextSpan';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Link, withRouter } from "react-router-dom";
import { withApollo, graphql, compose } from 'react-apollo';
import { getStemsQuery, deleteStemMutation } from '../queries/queries';
import { Button, Icon } from 'semantic-ui-react';

class StemList extends Component {
  _isMounted = false

	constructor(props) {
    //get all the props so we can refer to them
		super(props);
    //bind the functions we've defined
    this.onDelete = this.onDelete.bind(this);
    this.stemDropdown = this.stemDropdown.bind(this);
		this.state = {
      //set up an empty array and a loading state for react-table
			data: [],
			loading: true,
      //assume the user is not logged in as admin, prepare to get user info from token
      admin: this.props.admin,
      //get initial state for the checkboxes that allow show/hide columns from Colrc.js.  Always initially hide scary-looking orthographies like salish.
			page: this.props.stemState.page,
      pageSize: this.props.stemState.pageSize,
      sorted: this.props.stemState.sorted,
      filtered: this.props.stemState.filtered,
      resized: this.props.stemState.resized,
      selected: {
        category: this.props.stemState.selected.category,
        reichard: this.props.stemState.selected.reichard,
        doak: this.props.stemState.selected.doak,
        salish: this.props.stemState.selected.salish,
  		  nicodemus: this.props.stemState.selected.nicodemus,
  		  english: this.props.stemState.selected.english,
        note: this.props.stemState.selected.note,
        edit: this.props.stemState.selected.edit,
  	    username: this.props.stemState.selected.username,
        active: this.props.stemState.selected.active,
        prevId: this.props.stemState.selected.prevId,
        editnote: this.props.stemState.selected.editnote,
      }
		};
	}

  //get user from token, find out users' roles
  async componentDidMount() {
    this._isMounted = true
    try {
      let variables = {}
      if (!this.state.admin){
        variables.active = 'Y'
      }    
      // now we're going to get only active stems if we are not admin, else 
      // we will get all the stems
      const getStems = await this.props.client.query({
        query: getStemsQuery,
        variables: variables 
      })
      let currentState = Object.assign({}, this.state)
      currentState.data = getStems.data.stems_Q
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
    console.log("stemList is unmounting")
  }

//handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  async handleCategoryChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.category = !currentState.selected.category
    await this.setState(currentState)
  }

	async handleReichardChange(value) {
		let currentState = Object.assign({}, this.state) 
    currentState.selected.reichard = !currentState.selected.reichard
    await this.setState(currentState)
  }

	async handleDoakChange(value) {
    let currentState = Object.assign({}, this.state) 
    currentState.selected.doak = !currentState.selected.doak
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
  
  async handleNoteChange(value) {
		let currentState = Object.assign({}, this.state) 
    currentState.selected.note = !currentState.selected.note
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
  // allow an admin or owner to delete stems.  Deletion sets the 'active' flag to 'N' on the stem, it does not really delete anything

	async onDelete(id) {
	    console.log("In deletion");
	    try {
        let variables = {}
        if (!this.state.admin) {
          variables.active = 'Y'
         }
        await this.props.deleteStemMutation({
					variables: {
						id: id
					},
      //after setting the flag, refetch the stems from the db
			refetchQueries: [{ query: getStemsQuery, variables: variables }]
			});
      //then send the user back to the stemlist display
				this.props.history.push('/stems');
			} catch (err) {
				console.log(err.graphQLErrors[0].message);
				this.props.history.push('/stems');
			}
	  };

  // translate dropdown values into text
	stemDropdown(original) {
    console.log("I'm in the dropdown function")
    console.log(original)
    if (original === 'v') {
      original = original.replace('v', 'verb')
    } else if (original === 'n') {
      original = original.replace('n', 'noun')
    } else if (original === 'aci') {
      original = original.replace('aci', 'other')
    }
    return(<span>{original}</span>)
  }
  render() {
    //give the render a way to access values for the checkboxes that show/hide columns by setting state

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
      show: this.state.selected.category,
      Cell: ({row, original}) => ( this.stemDropdown(original.category) )
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
			show: this.state.selected.reichard,
      Cell: row => ( <DecoratedTextSpan str={row.value} />),
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
			show: this.state.selected.doak,
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
			show: this.state.selected.salish,
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
			show: this.state.selected.nicodemus,
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
			show: this.state.selected.english,
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
			show: this.state.selected.note,
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
      width: 100,
      show: this.state.selected.edit,
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
        checked={this.state.selected.category}
        onChange={this.handleCategoryChange.bind(this)}
      />
      <label className="checkBoxLabel">Reichard</label>
      <input
        name="reichard"
        type="checkbox"
        checked={this.state.selected.reichard}
        onChange={this.handleReichardChange.bind(this)}
      />
      <label className="checkBoxLabel">Doak</label>
      <input
        name="doak"
        type="checkbox"
        checked={this.state.selected.doak}
        onChange={this.handleDoakChange.bind(this)}
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
      <label className="checkBoxLabel">Note</label>
      <input
        name="note"
        type="checkbox"
        checked={this.state.selected.note}
        onChange={this.handleNoteChange.bind(this)}
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
				columns = {columns}
        defaultPageSize = {10}
        pageSize={this.state.pageSize}
				className = "-striped -highlight left"
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
