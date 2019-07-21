import React, { Component } from 'react';
import queryString from 'query-string';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Dropdown } from 'formik-semantic-ui';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import { getUserFromToken, updateUserAdminMutation } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class UpdateRoles extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      fields: {
        id: '',
        first: '',
        last: '',
        email: '',
        username: '',
        roles: ''
      }
    };
  }

  async componentDidMount() {
    const data = queryString.parse(this.props.location.search);
      this.setState({
        fields: {
          id: data.id,
          first: data.first,
          last: data.last,
          email: data.email,
          username: data.username,
          roles: data.roles
        }
      }) 
      console.log(data)
      console.log(this.state)
      }
      catch(error) {
      console.log(error)
    }

 onFormSubmit = async (values, setSubmitting) => {
    console.log("In updateRoles submission");
    console.log(values)
    console.log(setSubmitting)
    try {
      console.log({
        first: values.first,
        last: values.last,
        username: values.username,
        email: values.email,
        roles: values.roles
      })
      console.log(values.roles)
      await this.props.updateUserAdminMutation({
        variables: {
          id: values.id,
          roles: values.roles
        },
      })
      setSubmitting(false)
      this.props.history.push('/admin')
    } catch (result) {
      console.log(result)
      console.log(result.graphQLErrors[0].message);
      setSubmitting(false)
      this.setState({ error: result.graphQLErrors[0].message });
    }
  };
   
  render() {
    const { id, first, last, username, email, roles } = this.state.fields
    const updateRolesSchema = Yup.object().shape({
    roles: Yup.string()
      .min(2, 'Roles must be more than 2 characters')
      .max(30, 'Roles must be less than 30 characters')
      .required('Required'),  
    });
    const roleOptions = [
      {key: 'owner', text: 'owner', value: 'owner'},
      {key: 'admin', text: 'admin', value: 'admin'},
      {key: 'view', text: 'view', value: 'view'} 
    ]
    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h3'  textAlign='center'>
              Update User Roles
          </Header>
          <Message>
            <Header as='h4' textAlign='center'>
              Select a new role for this user.
            </Header>
            <div>'admin' = can update all information on this site, including user roles.</div>  
            <div>'owner' = can update all information on this site, except user roles.</div>  
            <div>'view' = cannot update information on this site.</div>
          </Message>
          {this.state.error && (
           <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment>
            <Formik
              initialValues={{id: this.state.fields.id || '', first: this.state.fields.first || '', last: this.state.fields.last || '', username: this.state.fields.username || '', email: this.state.fields.email || '', roles: this.state.fields.roles || ''}}
              validationSchema={updateRolesSchema}
              enableReinitialize
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
              render={({
                values,
                errors,
                status,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                handleReset,
              }) => (
            <Form>
              <Input
                fluid
                label={{ basic: true, color: 'blue', content: 'ID' }}
                id="id"
                placeholder="User ID"
                type="text"
                value={ values.id }
                disabled
              />
              <Input
                fluid
                label={{ basic: true, color: 'blue', content: 'First Name' }}
                id="first"
                placeholder="First Name"
                type="text"
                value={ values.first }
                disabled
              />
              <Input
                fluid
                label={{ basic: true, color: 'blue', content: 'Last Name' }}
                id="last"
                placeholder="Last Name"
                type="text"
                value={ values.last }
                disabled
              />
              <Input
                fluid
                label={{ basic: true, color: 'blue', content: 'Username' }}
                id="username"
                placeholder="Username"
                type="text"
                value={ values.username }
                disabled
              />                                 
              <Input
                fluid
                label={{ basic: true, color: 'blue', content: 'Email' }}
                id="email"
                placeholder="email"
                type="text"
                value={ values.email }
                disabled
              />
              <Header as="h4">
                Select Role
              </Header>
              <Dropdown fluid
                selection
                id="roles"
                name="roles" 
                placeholder="Assign a Role" 
                options={ roleOptions }
                onChange={ handleChange }
                onBlur={ handleBlur }
                value={ values.role }
              >
              </Dropdown>   
              <Button color="black" type="submit" disabled={isSubmitting}>
                Save
              </Button>
                or
              <Button basic onClick={handleReset}>
                Cancel
              </Button>
            </Form>
          )}
        />
          </Segment>
        </Grid.Column>
      </Grid>
   );
  }
}

export default compose(
  withApollo,
  graphql(updateUserAdminMutation, { name: "updateUserAdminMutation"}),
  graphql(getUserFromToken, { name: "getUserFromToken"})
)(withRouter(UpdateRoles));