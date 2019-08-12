import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import DecoratedTextSpan from '../utilities/DecoratedTextSpan';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import { withRouter } from 'react-router-dom';
import { graphql, compose, withApollo } from 'react-apollo';
import { getRootsQuery, getStemsQuery, getAffixesQuery } from '../queries/queries';

class Search extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.loadSearchInfo = this.loadSearchInfo.bind(this);
    this.affixDropdown = this.affixDropdown.bind(this);
    this.stemDropdown = this.stemDropdown.bind(this);
		this.state = {
			searchWasRun: false,
			fields: {
				searchtext: ""
			},
			fieldErrors: {},
			roots: {
				address: 'http://localhost:4000/roots',
				fields: ['nicodemus', 'salish', 'english'],
				data: [],
    			loading: false
    		},
			stems: {
				address: 'http://localhost:4000/stems',
				fields: ['reichard', 'nicodemus', 'salish', 'doak', 'english'],
				data: [],
    			loading: false
    		},
			affixes: {
				address: 'http://localhost:4000/affixes',
				fields: ['nicodemus', 'salish', 'english', 'note'],
				data: [],
    			loading: false
    		}
		};
	}

	loadSearchInfo = async (searchArea) => {
		try {
			const {address, fields} = this.state[`${searchArea}`];
			const searchField = fields[0];
			//const fetchAddress = `${address}?${searchField}_like=${this.state.fields.searchtext}`;
			console.log(searchField);
      let response = ''
      let json = ''
      const variables = {
        active: "Y", 
        search: `${this.state.fields.searchtext}`     
      }
      if (searchArea === 'roots'){
        response = await this.props.client.query({
          query: getRootsQuery,
          variables: variables
        })
        json = response.data.roots_Q
      } else if (searchArea === 'stems'){
          response = await this.props.client.query({
          query: getStemsQuery,
          variables: variables
        })
        json = response.data.stems_Q
      } else if (searchArea === 'affixes'){
        response = await this.props.client.query({
          query: getAffixesQuery,
          variables: variables
        })
        json = response.data.affixes_Q
      }
	    const loadingKey = `${searchArea}.loading`;
	    const dataKey = `${searchArea}.data`;
			const searchState = Object.assign({}, this.state);
			searchState[`${searchArea}`]['loading'] = false;
			searchState[`${searchArea}`]['data'] = json;
			console.log(searchState);
			this.setState({ searchState });
	    } catch (error) {
	    	console.log("This is my Error: " + error);
	    	const errorKey = `${searchArea}.error`;
	      this.setState({ [`${searchArea}.error`]: error });
	    }
	};

	onFormSubmit = async (evt) => {
		evt.preventDefault();
		this.state.searchWasRun = true;
		console.log("In search form submission");
		this.loadSearchInfo('roots');
		this.loadSearchInfo('stems');
		this.loadSearchInfo('affixes');
	};

	weblink(link, page) {
		return (
			link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a>
		);
	}

	onInputChange = (evt) => {
		console.log("Change event called on " + evt.target.value);
		const fields = Object.assign({}, this.state.fields);
		console.log(evt.target.name);
		fields[evt.target.name] = evt.target.value;
		this.setState({ fields });
	};

  affixDropdown(original) {
    console.log("I'm in the dropdown function")
    console.log(original)
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
		//set up the columns for the search results from roots
		const rootColumns = [{
  			accessor: 'id',
  		  show: false
		  },
	    {
		    Header: 'Root',
		    accessor: 'root',
		    filterMethod: (filter, rows) =>
	        matchSorter(rows, filter.value, { keys: ["root"], threshold: matchSorter.rankings.CONTAINS }),
	      filterAll: true,
	  	},
	  	{
		    Header: '#',
		    accessor: 'number',
		    filterMethod: (filter, rows) =>
	        matchSorter(rows, filter.value, { keys: ["#"], threshold: matchSorter.rankings.CONTAINS }),
	      filterAll: true,
        width: 50
	  	},
	  	{
		    Header: 'Salish',
		    accessor: 'salish',
		    filterMethod: (filter, rows) =>
	        matchSorter(rows, filter.value, { keys: ["salish"], threshold: matchSorter.rankings.CONTAINS }),
	      filterAll: true,
	  	},
		 	{
		    Header: 'Nicodemus',
		    accessor: 'nicodemus',
		    filterMethod: (filter, rows) =>
	        matchSorter(rows, filter.value, { keys: ["nicodemus"], threshold: matchSorter.rankings.CONTAINS }),
	      filterAll: true,
	      Cell: row => ( <DecoratedTextSpan str={row.value} />),
	  	},
	  	{
		    Header: 'English',
		    accessor: 'english',
		    filterMethod: (filter, rows) =>
	        	matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
	        filterAll: true,
		    style: { 'white-space': 'unset' },
	  	}
    ];

		//set up columns for stems results
		const stemsColumns = [{
      Header: 'Category',
      accessor: 'category',
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
    }, {
      Header: 'Nicodemus',
      accessor: 'nicodemus',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: ["nicodemus"],
          threshold: matchSorter.rankings.CONTAINS
        }),
      filterAll: true,
      Cell: row => ( <DecoratedTextSpan str={row.value} />),
    }, 
    {
      Header: 'English',
      accessor: 'english',
      style: { 'whiteSpace': 'unset'},
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: ["english"],
          threshold: matchSorter.rankings.CONTAINS
        }),
      filterAll: true,
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
		}];
		//set up the columns for the affixes results
	  const affixcolumns = [{
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
      Cell: ({row, original}) => ( this.affixDropdown(original.type) )
      },
      {
        Header: 'Salish',
        accessor: 'salish',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["salish"], threshold: matchSorter.rankings.CONTAINS }),
            filterAll: true,
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["nicodemus"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'English',
        accessor: 'english',
        style: { 'whiteSpace': 'unset' },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["english"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
      },
      {
        Header: 'Link',
        accessor: 'link',
        Cell: ({row, original}) => ( this.weblink(original.link, original.page) ),
      },
	  ];

		//build the roots results table
	     const rootsDataOrError = this.state.roots.error ?
	      	<div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
	      	( this.state.roots.data.length > 0 ?
		      	<ReactTable
		        	data={this.state.roots.data}
		        	loading={this.state.roots.loading}
		        	columns={rootColumns}
		        	filterable
					   pageSize = {this.state.roots.data.length > 5 ? 5 : this.state.roots.data.length}
		        	className="-striped -highlight"
		      	/>
			: <div style={{color: 'blue' }}>No roots match the search criteria</div> 
			);

		//build the stems results table
		const stemsDataOrError = this.state.stems.error ?
			<div style = {{	color: 'red' }}> Oops!Something went wrong!</div> : 
      		( this.state.stems.data.length > 0 ?
				<ReactTable
					data = {this.state.stems.data}
					loading = {this.state.stems.loading}
					columns = {stemsColumns}
					pageSize = {this.state.stems.data.length > 5 ? 5 : this.state.stems.data.length}
					className = "-striped -highlight left"
					filterable
					/>
			: <div style={{color: 'blue' }}>No stems match the search criteria</div> 
			);

		//build the affixes results table
	    const affixesDataOrError = this.state.affixes.error ?
	      	<div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      		( this.state.affixes.data.length > 0 ?
		      	<ReactTable
			        data={this.state.affixes.data}
			        loading={this.state.affixes.loading}
			        columns={affixcolumns}
					pageSize = {this.state.affixes.data.length > 5 ? 5 : this.state.affixes.data.length}
			        className="-striped -highlight left"
			        filterable
			      />			
		    : <div style={{color: 'blue' }}>No affixes match the search criteria</div> 
			);

		const searchWasRun = this.state.searchWasRun ?
			<div className="search results">
				<p>Results from Root Dictionary</p>
				{rootsDataOrError}
				<p></p>
				<p>Results from Stem Lists</p>
				{stemsDataOrError}
				<p></p>
				<p>Results from Affix Lists</p>
				{affixesDataOrError}
			</div> 
			: <div className="no search">
				<h3>Ready for a search!</h3>
			</div>;

	return(
		<div classname="ui content">
			<Form onSubmit={this.onFormSubmit} width={14}>
				<Form.Group>	
					<Button floated='left' icon labelPosition='left' color='blue' disabled={this.state.fields.searchtext.length < 1} >
	      				<Icon name='search' />
	     				 Search
					</Button>		
					<Form.Input 
					    name='searchtext'
					    autoFocus
						value={this.state.fields.searchtext}
					    onChange={this.onInputChange}
          				ref={(input) => { this.searchInput = input; }} 
					    >
	  				</Form.Input>
  				</Form.Group>
			</Form>
			<p></p>
			<SimpleKeyboard />
			<p></p>
			{searchWasRun}
		</div>
		) 
	};
}

export default compose(
  withApollo,
  graphql(getRootsQuery, { name: 'getRootsQuery' }),
  graphql(getStemsQuery, { name: 'getStemsQuery' }),
  graphql(getAffixesQuery, { name: 'getAffixesQuery' })
)(withRouter(Search));