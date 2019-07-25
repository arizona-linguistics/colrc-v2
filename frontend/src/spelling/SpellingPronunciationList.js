import React, { Component } from 'react';
import DecoratedTextSpan from '../utilities/DecoratedTextSpan';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SimpleKeyboard from '../utilities/SimpleKeyboard';
import { withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from 'react-apollo';
import { getSpellingsQuery } from '../queries/queries';

class SpellingPronunciationList extends Component {
  constructor(props) {
    //get all the props so we can refer to them
    super(props);
    //set the initial state
    this.state = { 
    //set up an empty array and a loading state for react-table
    	data: [], 
    	loading: true, 
      //set up initial state for the checkboxes that allow show/hide columns.
	    nicodemusSelected: true,
	    salishSelected: false,
		  reichardSelected: false,
	    englishSelected: true,
	    noteSelected: false
    };
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

  render() {
    //give the render a way to access values for the checkboxes that show/hide columns by setting state
    const { nicodemusSelected, reichardSelected, salishSelected, englishSelected, noteSelected } = this.state;
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
  		}]
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
		</div>
	  );
    //then build the table, or show an error
    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.props.getSpellingsQuery.spellings_Q}
        loading={this.props.getSpellingsQuery.loading}
        columns={columns}
        filterable
        defaultPageSize={20}
        className="-striped -highlight"
      />;

  return (     
	  	<div className='ui content'> 
	  		<SimpleKeyboard />
	  		<p></p>
	  		<CheckboxSpelling />
			{dataOrError}
		</div>
	);
  }
}

export default compose(
  graphql(getSpellingsQuery, { name: 'getSpellingsQuery' }),
)(withRouter(withApollo(SpellingPronunciationList)));

