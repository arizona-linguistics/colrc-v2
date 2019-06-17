import React, { Component } from 'react';
import DecoratedTextSpan from '../utilities/DecoratedTextSpan';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SimpleKeyboard from '../utilities/SimpleKeyboard';

class SpellingPronunciationList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    	data: [], 
    	loading: true, 
	    nicodemusSelected: true,
	    salishSelected: false,
		reichardSelected: false,
	    englishSelected: true,
	    noteSelected: false
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:4000/spelling`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ loading: false, data: json });
    } catch (error) {
      console.log("This is my Error: " + error);
      this.setState({ error: error });
    }
  }
	
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
  	const { nicodemusSelected, reichardSelected, salishSelected, englishSelected, noteSelected } = this.state;

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
	    	style: { 'white-space': 'unset' },
	    	show: noteSelected,
		}]
	}];

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
	  		<SimpleKeyboard />
	  		<p></p>
	  		<CheckboxSpelling />
			{dataOrError}
		</div>
	);
  }
}

export default SpellingPronunciationList;
