import React, {	Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Link, withRouter } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react';
import { graphql, compose, withApollo } from 'react-apollo';
import { getAffixesQuery, deleteAffixMutation } from '../queries/queries';

class AffixList extends Component {
	 constructor() {
	    super();
    	this.onDelete = this.onDelete.bind(this);
	    this.weblink = this.weblink.bind(this);
	    this.state = {
    		data: [],
    		loading: true,
		    salishSelected: false,
		    nicodemusSelected: true,
		    englishSelected: true,
		    linkSelected: false,
	    	usernameSelected: true,
	    };
	  }

	weblink(link, page) {
		return (
			link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a>
		);
	}

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

	handleUserChange(value) {
	    this.setState({ usernameSelected: !this.state.usernameSelected });
	  };

	async componentDidMount() {
	  }

  async onDelete(id) {
    console.log("In deletion");
    try {
      this.props.deleteAffixMutation({
        variables: {
          id: id
        },
		refetchQueries: [{ query: getAffixesQuery }]
      });
      this.props.history.push('/affixes');
    } catch (err) {
      console.log(err);
      this.props.history.push('/affixes');
    }
  };

	render() {

    const { salishSelected, nicodemusSelected, englishSelected, linkSelected, usernameSelected } = this.state;
   	const getColumnWidth = (rows, accessor, headerText) => {
  	  const maxWidth = 600
  	  const magicSpacing = 15
  	  const cellLength = Math.max(
  	    ...rows.map(row => (`${row[accessor]}` || '').length),
  	    headerText.length,
  	  )
  	  return Math.min(maxWidth, cellLength * magicSpacing)
  	};

	  const columns = [{
	    Header: 'Type',
	    accessor: 'type',
	    width: getColumnWidth(this.state.data, 'type', 'Type'),
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
	              <option value="Directional">Directional</option>
	              <option value="Locative">Locative</option>
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
        show: true,
        width: 50,
      },
      {
        Header: 'PrevID',
        accessor: 'prevId',
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["prevId"], threshold: matchSorter.rankings.CONTAINS }),
          filterAll: true,
        show: true,
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
        Header: 'Edit Note',
        accessor: 'editnote',
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["editnote"], threshold: matchSorter.rankings.CONTAINS }),
        filterAll: true,
        width: 75,
      },
      {
        Header: 'Edit/Delete',
        filterable: false,
        sortable: false,
        width: 100,
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

	const CheckboxAffix = () => (
		<div className="checkBoxMenu">
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
          <label className="checkBoxLabel">User Name</label>
          <input
            name="user.username"
            type="checkbox"
            checked={this.state.usernameSelected}
            onChange={this.handleUserChange.bind(this)}
          />
		</div>
	  );


    const dataOrError = this.state.error ?
      <div style={{ color: 'red' }}>Oops! Something went wrong!</div> :
      <ReactTable
			  data={this.props.getAffixesQuery.affixes_Q}
			  loading={this.props.getAffixesQuery.loading}
        columns={columns}
        defaultPageSize={10}
        className="-striped -highlight left"
        filterable
      />;

	  return (
      <div className='ui content'>
	  	<div className="text-right">
			<Link to={{
				pathname: '/addaffix/'
			}} >
				<Button icon labelPosition='left' size='small'>
					<Icon name='plus' />
					Add an affix
				</Button>
			</Link>
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
