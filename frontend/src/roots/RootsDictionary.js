import React, { Component } from 'react';
import { Input, Form, Button, Icon } from 'semantic-ui-react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';
import { getRootsQuery, deleteRootMutation } from '../queries/queries';
import SimpleKeyboard from "../utilities/SimpleKeyboard";

class RootsDictionary extends Component {
  _isMounted = false

  constructor(props) {
    //get all the props so we can refer to them
    super(props);
    //bind the functions we've defined
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    //set the initial state
    this.state = {
      //set up an empty array and a loading state for react-table
      searchWasRun: false,
      fields: {
        searchtext: this.props.location.state && this.props.location.state.searchtext ? this.props.location.state.searchtext : '',
      },
      fieldErrors: {},
      roots: {
        fields: ['nicodemus', 'salish', 'english'],
      },
    	data: [],
      loading: true,
       //assume the user is not logged in as admin, prepare to get user info from token
      admin: true,
      //admin: this.props.admin,
      //get initial state for the checkboxes that allow show/hide columns from Colrc.js.  Always default to show Nicodemus and English.  Always initially hide scary-looking orthographies like salish.
      page: this.props.rootState.page,
      pageSize: this.props.rootState.pageSize,
      selected: {
        sense: this.props.rootState.selected.sense,
        root: this.props.rootState.selected.root,
  		  salish: this.props.rootState.selected.salish,
  		  nicodemus: this.props.rootState.selected.nicodemus,
  		  english: this.props.rootState.selected.english,
        symbol: this.props.rootState.selected.symbol,
  		  grammar: this.props.rootState.selected.grammar,
        crossref: this.props.rootState.selected.crossref,
        variant: this.props.rootState.selected.variant,
        cognate: this.props.rootState.selected.cognate,
        active: this.props.rootState.selected.active,
        prevId: this.props.rootState.selected.prevId,
        username: this.props.rootState.selected.username,
        edit: this.props.rootState.selected.edit,
        editnote: this.props.rootState.selected.editnote
      }
    };
  }

  //get user from token, find out users' roles
  async componentDidMount() {
    this._isMounted = true
    console.log(this.props)
    try {
      let variables = {}
      if (!this.state.admin){
        variables.active = 'Y'
      }
      if (this.state.fields.searchtext.length > 0){
        variables.search = this.state.fields.searchtext
      }
      // now we're going to get only active roots if we are not admin, else
      // we will get all the roots
      const getRoots = await this.props.client.query({
        query: getRootsQuery,
        variables: variables
      })
      let currentState = Object.assign({}, this.state)
      currentState.data = getRoots.data.roots_Q
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
    console.log("RootsDictionary is unmounting")
  }

  //handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  async handleRootChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.root = !currentState.selected.root
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleSenseChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.sense = !currentState.selected.sense
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleSalishChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.salish = !currentState.selected.salish
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleNicodemusChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.nicodemus = !currentState.selected.nicodemus
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleEnglishChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.english = !currentState.selected.english
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleSymbolChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.symbol = !currentState.selected.symbol
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleGrammarChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.grammar = !currentState.selected.grammar
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleCrossrefChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.crossref = !currentState.selected.crossref
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleVariantChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.variant = !currentState.selected.variant
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleCognateChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.cognate = !currentState.selected.cognate
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
   async handleActiveChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.active = !currentState.selected.active
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handlePrevIdChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.prevId = !currentState.selected.prevId
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleEditNoteChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.editnote = !currentState.selected.editnote
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleUserChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.username = !currentState.selected.username
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
   async handleEditChange(value) {
    let currentState = Object.assign({}, this.state)
    currentState.selected.edit = !currentState.selected.edit
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handlePageChange(page) {
    console.log(page)
    let currentState = Object.assign({}, this.state)
    currentState.page = page
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handlePageSizeChange(pageSize,page) {
    console.log(pageSize + ' ' + page)
    let currentState = Object.assign({}, this.state)
    currentState.pageSize = pageSize
    currentState.page = page
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  async handleSortChange(newSorted,column,shiftKey) {
    let currentState = Object.assign({}, this.state)
    currentState.sorted = newSorted
    await this.setState(currentState)
    await this.props.changeRootState(currentState)
  }
  // allow an admin or owner to delete roots.  Deletion sets the 'active' flag to 'N' on the stems, it does not delete anything
  async onDelete(id) {
    console.log("In deletion");
    try {
      // let variables = {}
      // if (!this.state.admin) {
      //   variables.active = 'Y'
      // }
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

  loadSearchInfo = async (searchArea) => {
    try {
      const {fields} = this.state[`${searchArea}`];
      const searchField = fields[0];
      console.log(searchField);
      let response = ''
      let json = ''
      const variables = {
        active: "Y",
        search: `${this.state.fields.searchtext}`
      }
      response = await this.props.client.query({
        query: getRootsQuery,
        variables: variables
      })
      json = response.data.roots_Q
      const searchState = Object.assign({}, this.state);
      searchState['loading'] = false;
      searchState['data'] = json;
      console.log(searchState);
      this.setState(searchState);
      } catch (error) {
        console.log("This is my Error: " + error);
        this.setState({ error: error });
      }
  };

  onFormSubmit = async (evt) => {
    evt.preventDefault();
    this.state.searchWasRun = true;
    console.log("In search form submission");
    this.loadSearchInfo('roots');
  };

  onInputChange = (evt) => {
    const fields = Object.assign({}, this.state.fields);
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  };

  render() {
   //set up the table columns.  Header is the column header text, accessor is the name of the column in the db.
	 const columns = [{
      Header: 'Root',
      accessor: 'root',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["root", "number"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      width: 75,
      Cell: ({row, original}) => (<span>√{original.root}<span style={{ fontSize: '70%', verticalAlign: 'super' }}>{original.number === 0 ? '' : original.number}</span></span>),
      show: this.state.selected.root,
  	},
    {
	    Header: 'Sense',
	    accessor: 'sense',
	    width: 50,
	    show: this.state.selected.sense,
      Cell: ({row, original}) => (<span style={{ fontSize: '70%' }}>{original.sense}</span>),
	  },
	  {
	    Header: 'Salish',
	    accessor: 'salish',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["salish"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      width: 100,
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
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    style: { 'whiteSpace': 'unset' },
		  show: this.state.selected.english,
	  },
    {
      Header: 'Symbol',
      accessor: 'symbol',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["symbol"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      width: 50,
      show: this.state.selected.symbol,
    },
    {
	    Header: 'Grammar',
	    accessor: 'grammar',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["grammar"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: 75,
      style: { 'whiteSpace': 'unset' },
	    show: this.state.selected.grammar,
	  },
    {
	    Header: 'Xref',
	    accessor: 'crossref',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["crossref"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: 75,
      style: { 'whiteSpace': 'unset' },
	    show: this.state.selected.crossref,
	  },
    {
	    Header: 'Var.',
	    accessor: 'variant',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["variant"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: 50,
      style: { 'whiteSpace': 'unset' },
	    show: this.state.selected.variant,
	  },
    {
	    Header: 'Cognate',
	    accessor: 'cognate',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["cognate"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: 50,
      style: { 'whiteSpace': 'unset' },
	    show: this.state.selected.cognate,
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
      width: 100,
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
      width: 100,
      show: this.state.selected.edit,
      //get original row id, allow user to call onDelete, or edit.  Linkto passes original root values into editroot form via the location string
      Cell: ({row, original}) => (
        <div>
          <Button icon floated='right' onClick={() => this.onDelete(original.id)}>
              <Icon name='trash' />
          </Button>
          <Link to={{
            pathname: '/editroot/',
            search: '?id=' + original.id +
            '&number=' + original.number +
            '&sense=' + original.sense +
            '&root=' + original.root +
            '&salish=' + original.salish +
            '&nicodemus=' + original.nicodemus +
            '&symbol=' + original.symbol +
            '&english=' + original.english +
            '&grammar=' + original.grammar +
            '&crossref=' + original.crossref +
            '&variant=' + original.variant +
            '&cognate=' + original.cognate +
            '&editnote=' + original.editnote
          }} >

          <Button icon floated='right'>
            <Icon name='edit' />
          </Button>
          </Link>
        </div>
      )
    }
  ]

  //setup the checkbox bar that allows users to show/hide columns
  const CheckboxRoot = () => (
		<div className="checkBoxMenu">
      <label className="checkBoxLabel">Root</label>
      <input
        name="root"
        type="checkbox"
        checked={this.state.selected.root}
        onChange={this.handleRootChange.bind(this)}
      />
      <label className="checkBoxLabel">Sense</label>
      <input
        name="sense"
        type="checkbox"
        checked={this.state.selected.sense}
        onChange={this.handleSenseChange.bind(this)}
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
      <label className="checkBoxLabel">Symbol</label>
      <input
        name="symbol"
        type="checkbox"
        checked={this.state.selected.symbol}
        onChange={this.handleSymbolChange.bind(this)}
      />
      <label className="checkBoxLabel">Grammar</label>
      <input
        name="grammar"
        type="checkbox"
        checked={this.state.selected.grammar}
        onChange={this.handleGrammarChange.bind(this)}
      />
      <label className="checkBoxLabel">Xref</label>
      <input
        name="crossref"
        type="checkbox"
        checked={this.state.selected.crossref}
        onChange={this.handleCrossrefChange.bind(this)}
      />
      <label className="checkBoxLabel">Variant</label>
      <input
        name="variant"
        type="checkbox"
        checked={this.state.selected.variant}
        onChange={this.handleVariantChange.bind(this)}
      />
      <label className="checkBoxLabel">Cognate</label>
      <input
        name="cognate"
        type="checkbox"
        checked={this.state.selected.cognate}
        onChange={this.handleCognateChange.bind(this)}
      />
{/* Here begin the admin-only checkboxes    */}
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
          onChange={this.handleEditNoteChange.bind(this)}
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

  const localSearch = (
    <Form onSubmit={this.onFormSubmit}>
      <Form.Group>
        <Button icon labelPosition='left' color='blue' disabled={this.state.fields.searchtext.length < 1} >
            <Icon name='search' />
             Search
        </Button>
        <Input
          placeholder='Search'
          name='searchtext'
          autoFocus
          value={this.state.fields.searchtext}
          onChange={this.onInputChange}
          ref={(input) => { this.searchInput = input; }}
        >
        </Input>
        <Button basic color='blue' size='small'>
          Clear
        </Button>
      </Form.Group>
    </Form>
  )
    //now build the table.  If successful, the table will populate, if error the error message will appear.
    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.state.data}
        loading={this.state.loading}
        columns={columns}
        //pageSize={this.state.pageSize}
        className="-striped -highlight left"
        filterable
        //filtered={this.state.filtered}
        //sorted={this.state.sorted}
        //page={this.state.page}
        //resized={this.state.resized}
        //onPageChange={page => this.handlePageChange(page)}
        //onPageSizeChange={(pageSize,page) => this.handlePageSizeChange(pageSize,page)}
        //onSortedChange={(newSorted,column,shiftKey) => this.handleSortChange(newSorted,column,shiftKey)}
        //onResizedChange={(newResized, event) => this.handleResizedChange(newResized, event)}
        //onFilteredChange={(filtered, column) => this.handleFilteredChange(filtered,column)}
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
        {localSearch}
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
