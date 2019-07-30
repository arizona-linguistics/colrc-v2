import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import { getUserFromToken, updateUserMutation } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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
          password: user.password || ''
        }
      }) 
      console.log(user)
      console.log(this.state)
    } catch(error) {
      console.log(error)
    }
  } 
 onFormSubmit = async (values, setSubmitting) => {
    console.log("In change password submission");
    console.log(values)
    console.log(setSubmitting)
    console.log(this.state.fields.password)
    try {
      console.log({
        first: values.first,
        last: values.last,
        username: values.username,
        email: values.email,
        password: values.password
      })
      await this.props.updateUserMutation({
        variables: {
          first: values.first,
          last: values.last,
          username: values.username,
          email: values.email,
          password: values.password
        },
      })
      setSubmitting(false)
      this.props.history.push('/')
    } catch (err) {
      console.log(err);
    }
  };
   
  render() {
    const { first, last, username, email, password } = this.state.fields
    const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Password must be more than 2 characters')
      .max(30, 'Password must be less than 30 characters')
      .required('Required'),  
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required!')  
    });

    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h3'  textAlign='center'>
              Change Your Password
          </Header>
          <Message>
            You are currently logged in as <div style={{ color: 'blue' }}>{this.state.fields.username}</div>  You can change your password here.
          </Message>
          <Segment>
            <Formik
              initialValues={{first: this.state.fields.first || '', last: this.state.fields.last || '', username: this.state.fields.username || '', email: this.state.fields.email || '', password: '', passwordConfirmation: ''}}
              validationSchema={changePasswordSchema}
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
              <Input
                fluid
                label={{color: 'blue', content: 'New Password'}}
                id="password"
                placeholder="New Password"
                type="password"
                value={ values.password }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.password && touched.password ? 'text-input error' : 'text-input' }
              />
                {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
                )}                
              <Input
                fluid
                label={{color: 'blue', content: 'Confirm Password'}}
                id="passwordConfirmation"
                placeholder="Confirm new password"
                type="password"
                value={ values.passwordConfirmation }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.passwordConfirmation && touched.passwordConfirmation ? 'text-input error' : 'text-input' }
              />
                {errors.passwordConfirmation && touched.passwordConfirmation &&(
                <div className="input-feedback">{errors.passwordConfirmation}</div>
                )}
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
  graphql(updateUserMutation, { name: "updateUserMutation"}),
  graphql(getUserFromToken, { name: "getUserFromToken"})
)(withRouter(ChangePassword));