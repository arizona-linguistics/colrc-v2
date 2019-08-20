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
  constructor(props) {
    //get all the props so we can refer to them
    super(props);
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
      page: this.props.rootState.page,
      selected: {
        number: this.props.rootState.selected.number,
        sense: this.props.rootState.selected.sense,
        root: this.props.rootState.selected.root,
  		  salish: this.props.rootState.selected.salish,
  		  nicodemus: this.props.rootState.selected.nicodemus,
        symbol: this.props.rootState.selected.symbol,
  		  english: this.props.rootState.selected.english,
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
          console.log("and here's the role ")
          console.log(this.state.fields.roles)
        }
      // now we're going to get only active roots if we are not admin, else
      // we will get all the roots
      let rootvars = {}
      if (!this.state.fields.roles.includes("admin")){
        rootvars.active = 'Y'
      }
      const getRoots = await this.props.client.query({
        query: getRootsQuery,
        variables: rootvars
      })
      this.setState({
        data: getRoots.data.roots_Q,
        loading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  //handleChange functions are used to manage the show/hide columns checkboxes.  Each column needs one.
  async handleRootChange(value) {
    const current = this.state.selected
    current.root = !current.root
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleNumberChange(value) {
    const current = this.state.selected
    current.number = !current.number
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleSenseChange(value) {
    const current = this.state.selected
    current.sense = !current.sense
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleSalishChange(value) {
    const current = this.state.selected
    current.salish = !current.salish
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleNicodemusChange(value) {
    const current = this.state.selected
    current.nicodemus = !current.nicodemus
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleSymbolChange(value) {
    const current = this.state.selected
    current.symbol = !current.symbol
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleEnglishChange(value) {
    const current = this.state.selected
    current.english = !current.english
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleGrammarChange(value) {
    const current = this.state.selected
    current.grammar = !current.grammar
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleCrossrefChange(value) {
    const current = this.state.selected
    current.crossref = !current.crossref
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleVariantChange(value) {
    const current = this.state.selected
    current.variant = !current.variant
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleCognateChange(value) {
    const current = this.state.selected
    current.cognate = !current.cognate
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleActiveChange(value) {
    const current = this.state.selected
    current.active = !current.active
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handlePrevIdChange(value) {
    const current = this.state.selected
    current.prevId = !current.prevId
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleEditNoteChange(value) {
    const current = this.state.selected
    current.editnote = !current.editnote
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleUserChange(value) {
    const current = this.state.selected
    current.username = !current.username
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handleEditChange(value) {
    const current = this.state.selected
    current.edit = !current.edit
    await this.setState({
      page: this.state.page,
      selected: current
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  };

  async handlePageChange(page) {
    console.log(page)
    await this.setState({
      page: page,
      selected: this.state.selected
    });
    await this.props.changeRootState({
      selected: this.state.selected,
      page: this.state.page
    })
  }

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
      show: this.state.selected.root,
  	},
	  {
	    Header: '#',
	    accessor: 'number',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["#"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: 50,
	    show: this.state.selected.number,
      Cell: ({row, original}) => (original.number === 0 ? '' : original.number)
	  },
    {
	    Header: 'Sense',
	    accessor: 'sense',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["sense"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: getColumnWidth(this.state.data, 'sense', 'Sense'),
	    show: this.state.selected.number,
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
	    Header: 'Symbol',
	    accessor: 'symbol',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["symbol"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: getColumnWidth(this.state.data, 'symbol', 'Symbol'),
	    show: this.state.selected.symbol,
	  },
	  {
	    Header: 'English',
	    accessor: 'english',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
      //this should allow text in this column to break on whitespace and wrap, rather than overflowing
	    style: { 'whiteSpace': 'unset' },
		  show: this.state.selected.english,
	  },
    {
	    Header: 'Grammar',
	    accessor: 'grammar',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["grammar"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: 50,
      style: { 'whiteSpace': 'unset' },
	    show: this.state.selected.grammar,
	  },
    {
	    Header: 'Crossref',
	    accessor: 'crossref',
	    filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ["crossref"], threshold: matchSorter.rankings.CONTAINS }),
      filterAll: true,
	    width: 50,
      style: { 'whiteSpace': 'unset' },
	    show: this.state.selected.crossref,
	  },
    {
	    Header: 'Variant',
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
    ];

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
		  <label className="checkBoxLabel">#</label>
		  <input
		  	name="number"
        type="checkbox"
        checked={this.state.selected.number}
        onChange={this.handleNumberChange.bind(this)}
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
      <label className="checkBoxLabel">Symbol</label>
      <input
        name="symbol"
        type="checkbox"
        checked={this.state.selected.symbol}
        onChange={this.handleSymbolChange.bind(this)}
      />
      <label className="checkBoxLabel">English</label>
      <input
        name="english"
        type="checkbox"
        checked={this.state.selected.english}
        onChange={this.handleEnglishChange.bind(this)}
      />
      <label className="checkBoxLabel">Grammar</label>
      <input
        name="grammar"
        type="checkbox"
        checked={this.state.selected.grammar}
        onChange={this.handleGrammarChange.bind(this)}
      />
      <label className="checkBoxLabel">Crossref</label>
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
{/* Here begin the admin-only checkboxes         */}
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

    //now build the table.  If successful, the table will populate, if error the error message will appear.
    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.state.data}
        loading={this.state.loading}
        columns={columns}
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
        page={this.state.page}
        onPageChange={page => this.handlePageChange(page)}
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
