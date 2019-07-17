import React, {Component} from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import DecoratedTextSpan from '../utilities/DecoratedTextSpan';
import { Link, withRouter } from "react-router-dom";
import { graphql, compose } from 'react-apollo';
import { getUserQuery } from '../queries/queries';
import { Button, Icon } from 'semantic-ui-react';

class UserProfile extends Component {
  constructor() {
		super();
		this.state = {
			data: [],
			loading: true,
		};
  }
  
	render() {
    const columns = [{
      Header: 'Type',
			accessor: 'category',
    }]
  }
}

export default compose(
  graphql(getUserQuery, { name: 'getUserQuery' }),
)(withRouter(UserProfile))