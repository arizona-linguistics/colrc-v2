import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import { withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from 'react-apollo';
import { getVowelsQuery, getConsonantsQuery } from '../queries/queries';

class SpellingPronunciationCharts extends Component {
  constructor(props) {
    //get all the props so we can refer to them
    super(props);
    this.heightToNumber = this.heightToNumber.bind(this);
    this.spellingDropdown = this.spellingDropdown.bind(this); 
    //set the initial state
    this.state = {
      //for each react-table, set data to an empty array and set loading to true.
    	data: [],
    	loading: true,
    	vowelData: [],
    	vowelLoading: true,
      //for any show/hide columns checkboxes, set the initial values
    	voiceSelected: false,
	    mannerSelected: false,
	    secondarySelected: false,
    };
  }
  //every show/hide columns checkbox needs a handleChange function
	handleVoiceChange(value) {
	    this.setState({ voiceSelected: !this.state.voiceSelected });
	  };
  handleMannerChange(value) {
	    this.setState({ mannerSelected: !this.state.mannerSelected });
	  };
	handleSecondaryChange(value) {
	    this.setState({ secondarySelected: !this.state.secondarySelected });
	  };

  heightToNumber(value) {
    if (value === 'high') { 
      return 1
    } else if (value === 'mid') {
      return 2
    } else {
      return 3
    } 
  }
  spellingDropdown(original) {
    if (original === 'N') {
      original = original.replace('N', 'Nicodemus')
    } else if (original === 'R') {
      original = original.replace('R', 'Reichard')
    } else if (original === 'S') {
      original = original.replace('S', 'Salish')
    } 
    return(<span>{original}</span>)
  }
  render() {
    //setup the state values that the show/hide columns checkboxes need
  	const { voiceSelected, mannerSelected, secondarySelected } = this.state;
    //setup the columns for the consonant table; which has a subcolumn structure and is complicated
	  const columns=[{
  		Header: "Consonants",
  		columns: [{
  			Header: () => <div><span title="N = Nicodemus, S = Salish, R = Reichard">ortho-<br/>graphy</span></div>,
  				accessor: 'orthography',
  				id: 'orthography',
  				width: 80,
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
              value={filter ? filter.value : "N"}
            >
              <option value="N">Nicodemus</option>
              <option value="S">Salish</option>
              <option value="R">Reichard</option>
              <option value="all">All</option>
            </select>,
          Cell: ({row, original}) => ( this.spellingDropdown(original.orthography) )
  			},{
  				Header: () => <div><span title="VL = Voiceless, V = Voiced, RN = Resonant">voice</span></div>,
  			    accessor: 'voice',
  			    maxWidth: 80,
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
	              <option value="VL">voiceless</option>
	              <option value="V">voiced</option>
	              <option value="RN">resonant</option>
	              <option value="all">all</option>
	            </select>,
  		  		show: voiceSelected,
  			},{
  				Header: 'manner',
  				accessor: 'manner',
  				maxWidth: 70,
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
              <option value="stop">stops</option>
              <option value="affricate">affricates</option>
              <option value="fricative">fricatives</option>
              <option value="nasal">nasals</option>
              <option value="approximant">approximants</option>
              <option value="all">all</option>
            </select>,
            show: mannerSelected,
  			},{
  				Header: () => <div>second-<br/>ary</div>,
  				accessor: 'secondary',
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
              <option value="none">none</option>
              <option value="glottal">glottal</option>
              <option value="labial">labial</option>
              <option value="all">all</option>
            </select>,
  				maxWidth: 70,
  		  	show: secondarySelected,
  			},{
        	Header: 'labial',
        	accessor: 'labial',
        	minWidth: 30,
        	filterable: false,
        },{
        	Header: 'alveolar',
       		accessor: 'alveolar',
        	minWidth: 30,
        	filterable: false,
        },{
        	Header: () => <div>alveo-<br/>palatal</div>,
        	accessor: 'alveopalatal',
        	minWidth: 30,
        	filterable: false,
        },{
        	Header: 'lateral',
        	accessor: 'lateral',
        	minWidth: 30,
        	filterable: false,
        },{
        	Header: 'palatal',
        	accessor: 'palatal',
        	minWidth: 30,
        	filterable: false,
        },{
        	Header: 'velar',
      		accessor: 'velar',
      		minWidth: 30,
        	filterable: false,
        },{
        	Header: 'uvular',
        	accessor: 'uvular',
        	minWidth: 30,
        	filterable: false,
        },{
        	Header: () => <div>pharyn-<br/>geal</div>,
        	accessor: 'pharyngeal',
        	minWidth: 30,
        	filterable: false,
        },{
        	Header: 'glottal',
        	accessor: 'glottal',
        	minWidth: 30,
	        filterable: false,
        }]
  	}];

  //setup the columns for the vowels table which also are organized as a subcolumn
	const vowelColumns=[{
		Header: "Vowels",
		columns: [
     {
			Header: () => <div><span title="N = Nicodemus, S = Salish, R = Reichard">ortho-<br/>graphy</span></div>,
			accessor: 'orthography',
			id: 'orthography',
			width: 80,
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
          value={filter ? filter.value : "N"}
        >
          <option value="N">Nicodemus</option>
          <option value="S">Salish</option>
          <option value="R">Reichard</option>
          <option value="all">All</option>
        </select>,
        Cell: ({row, original}) => ( this.spellingDropdown(original.orthography) )
		},
    {
			Header: 'height',
			accessor: 'height',
			width: 80,
      sortMethod: (a, b) => {
        const aValue = this.heightToNumber(a)
        const bValue = this.heightToNumber(b)
        if (aValue === bValue) {
          return 0
        } else if (aValue > bValue) {
          return 1
        } else {
          return -1
        }
      },
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
          <option value="high">High</option>
          <option value="mid">Mid</option>
          <option value="low">Low</option>
          <option value="all">All</option>
        </select>,
		},
    {
			Header: 'front',
			accessor: 'front',
			filterable: false,
		},{
			Header: 'central',
			accessor: 'central',
			filterable: false,
		},{
			Header: 'back',
			accessor: 'back',
			filterable: false,
		}]
	}];

//provide explanatory text for the consonant chart, in accordion form
const ConsonantChartInfo = () => (
	<div>
	<Accordion>
		<AccordionItem>
			<AccordionItemTitle>
				<p className="u-position-relative">
	            Understanding the Consonant Chart
	            <div className="accordion__arrow" role="presentation" />
	            </p>
			</AccordionItemTitle>
			<AccordionItemBody>
				<p>In the consonant chart, sounds are organized based on the location in the mouth where the tongue tip, blade, body or root come into closest contact with the relevant anatomical structure, with those structures listed from the front of the vocal tract (the lips) to the back (the glottis).  Readers may find various interactive IPA charts to be useful aids in understanding the charts presented here.</p>
			</AccordionItemBody>
		</AccordionItem>
	</Accordion>
	</div>
	);

//provide explanatory text for the consonant chart, in accordion form
	const VowelChartInfo = () => (
	<div>
	<Accordion>
		<AccordionItem>
			<AccordionItemTitle>
				<p className="u-position-relative">
	            Understanding the Vowel Chart
	            <div className="accordion__arrow" role="presentation" />
	            </p>
			</AccordionItemTitle>
			<AccordionItemBody>
				<p>In the vowel chart, sounds are organized based on the location in the mouth where apex of the tongue is located during pronunciation of the vowel, with the highest most front vowel (written 'i' in Salish orthography, and pronounced as in the English word 'bead') pronounced with the tongue in approximately the same position as it is for the resonant 'y'.  Back vowels such as 'u' are pronounced with rounded lips.</p>
			</AccordionItemBody>
		</AccordionItem>
	</Accordion>
	</div>
		);

  //now define the checkboxes to control show/hide column toggles
	const CheckboxConsonants = () => (
		<div className="checkBoxMenu">
		  <label className="checkBoxLabel">Voice</label>
		  <input
		  	name="voice"
        type="checkbox"
        checked={this.state.voiceSelected}
        onChange={this.handleVoiceChange.bind(this)}
      />
		  <label className="checkBoxLabel">Manner</label>
		  <input
		  	name="manner"
        type="checkbox"
        checked={this.state.mannerSelected}
        onChange={this.handleMannerChange.bind(this)}
      />
      <label className="checkBoxLabel">Secondary</label>
      <input
        name="secondary"
        type="checkbox"
        checked={this.state.secondarySelected}
        onChange={this.handleSecondaryChange.bind(this)}
      />
		</div>
	  );

  //now build the consonant table, or show an error
    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.props.getConsonantsQuery.consonants_Q}
        loading={this.props.getConsonantsQuery.loading}
        columns={columns}
        minRows={1}
        filterable
		    defaultFiltered={[
  				{
  					id: 'orthography',
  					value: 'N'
  				}
  			]}
          className="-striped -highlight"
        />;

    const dataOrError2 = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
        data={this.props.getVowelsQuery.vowels_Q}
        loading={this.props.getVowelsQuery.loading}
        columns={vowelColumns}
        minRows={1}
        filterable
        defaultSorted={[{
          id   : 'height',
          desc : false,
        }]}
    		defaultFiltered={[
    				{
    					id: 'orthography',
    					value: 'N'
    				}
    			]}
            className="-striped -highlight"
          />;
  return (
	  	<div className='ui content'>
			<ConsonantChartInfo />
			<p></p>
			<CheckboxConsonants />
			{dataOrError}
			<p></p>
			<VowelChartInfo />
			<p></p>
			{dataOrError2}
		</div>
	);
  }
}

export default compose(
  graphql(getConsonantsQuery, { name: 'getConsonantsQuery' }),
  graphql(getVowelsQuery, { name: 'getVowelsQuery' })
)(withRouter(withApollo(SpellingPronunciationCharts)));