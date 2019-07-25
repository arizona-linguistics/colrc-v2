import React, { Component } from 'react';
import { withApollo, graphql, compose } from 'react-apollo';
import { getUserFromToken } from '../queries/queries';
import { Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class GetUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        first: '',
        last: '',
        email: '',
        username: '',
        password: '',
        roles: []
      }
    };
  }
  async componentDidMount() {
      try {
        let userQuery = await this.props.client.query({
          query: getUserFromToken,
        })
        const user = userQuery.data.getUserFromToken_Q
        this.setState({
          fields: {
            first: user.first,
            last: user.last,
            email: user.email,
            username: user.username,
            roles: user.roles
          }
        }) 
        console.log(user)
        console.log(this.state)
      } catch(error) {
        console.log(error)
      }
    } 

render() {
  const { first, last, username, email, roles } = this.state.fields
	return (     
    <Message attached compact size='mini'>
      logged in as: {this.state.fields.username} with roles: {this.state.fields.roles}  
    </Message>
		);
	}
}
export default compose(
  withApollo,
  graphql(getUserFromToken, { name: "getUserFromToken"})
)(withRouter(GetUser));

