import React, { Component } from 'react';
import matchSorter from 'match-sorter';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export const rootColumns = [{
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
    }]
