import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import { addUserMutation, getUserToken } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  
  constructor(props) {
    super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
    //set default appearance to register rather than login
		this.state = {
      login: false,
		};
  }

	onFormSubmit = async (values, setSubmitting) => {
    console.log("In add user submission");
    console.log(values)
    console.log(setSubmitting)
    const { login } = this.state
    try {
      if (login) {
        console.log("this.props.client")
        console.log(this.props.client)
        //for login, check that the email and password match user table and if they do, generate a JWT token
        const queryUserToken = await this.props.client.query({
          query: getUserToken,
          variables: {
            email: values.email,
            password: values.password
          }
        })
        if (!queryUserToken || queryUserToken == null) {
          //if there's not a matching user for the email/pwd, throw an error.  Error handling in this function is mysterious.
          throw new Error('Authentication Error')
        }
        //if query succeeds, set the JWT token and end the submission process
        const token = queryUserToken.data.loginUser_Q[0].password
        localStorage.setItem('TOKEN', token)
        setSubmitting(false)
        this.props.changeLoginState(true)
        this.props.history.push('/users')
      } else {
		    this.props.addUserMutation({
		      variables: {
		        first: values.first,
		        last: values.last,
		        username: values.username,
		        email: values.email,
		        password: values.password,
		      },
		      // refetchQueries: [{ query: addUserQuery }]
        })
        setSubmitting(false)
      }
      this.setState({
        login: true
      })
		} catch (result) {
      console.log(result)
      setSubmitting(false)
      if (result instanceof TypeError) {
        this.setState({ error: 'Invalid Username or Password'})
      }
      else if (result.graphQLErrors) {
        console.log(result.graphQLErrors[0].message);
        this.setState({ error: result.graphQLErrors[0].message });        
      } else {
        console.log(result.message)
        this.setState({ error: result.message })
      }
    }
	};
  
  render() {
    const { login } = this.state
    const addUserSchema = Yup.object().shape({
      first: Yup.string()
        .required('Required'),
      last: Yup.string()
        .required('Required'),
      username: Yup.string()
        .required('Required'),
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Required'),
      password: Yup.string()
        .min(2, 'Password must be more than 2 characters')
        .max(30, 'Password must be less than 30 characters')
        .required('Required'),  
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required!')  
      });

    const loginSchema = Yup.object().shape({
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Required'),
      password: Yup.string()
        .min(2, 'Password must be more than two characters')
        .max(30, 'Password must be less than 30 characters!')
        .required('Required'),
      });
    
    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2'  textAlign='center'>
              {login ? 'Log in to your account' : 'Create an account'}
          </Header>
          {this.state.error && (
           <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment stacked>
            <Formik 
              initialValues={{ first: '', last: '', username: '', email: '', password: '', passwordConfirmation: ''}}
              validationSchema={ !login ? addUserSchema : loginSchema }
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
            >
              {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              {!login && (
                <Input
                  fluid
                  icon="write"
                  iconPosition="left"
                  id="first"
                  placeholder="First Name"
                  type="text"
                  value={ values.first }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.first && touched.first ? 'text-input error' : 'text-input' }
                />
                )}
                {errors.first && touched.first && !login && (
                  <div className="input-feedback">{errors.first}</div>
                )}
              {!login && (	
                <Input
                  fluid
                  icon="write"
                  iconPosition="left"
                  id="last"
                  placeholder="Last Name"
                  type="text"
                  value={ values.last }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.last && touched.last ? 'text-input error' : 'text-input' }
                />
              )}
                {errors.last && touched.last && !login && (
                <div className="input-feedback">{errors.last}</div>
                )}
              {!login && (
                <Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  id="username"
                  placeholder="Username"
                  type="text"
                  value={ values.username }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.username && touched.username ? 'text-input error' : 'text-input' }
                />
              )}
                {errors.username && touched.username && !login && (
                <div className="input-feedback">{errors.username}</div>
                )}       			            						
              <Input
                fluid
                icon="mail"
                iconPosition="left"
                id="email"
                placeholder="email"
                type="text"
                value={ values.email }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.email && touched.email ? 'text-input error' : 'text-input'}
              />
                {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
                )}
              <Input
                fluid
                icon='lock'
                iconPosition='left'
                id="password"
                placeholder="Password"
                type="password"
                value={ values.password }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.password && touched.password ? 'text-input error' : 'text-input' }
              />
                {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
                )}
            {!login && (                
              <Input
                fluid
                icon='lock'
                iconPosition='left'
                id="passwordConfirmation"
                placeholder="Confirm your password"
                type="password"
                value={ values.passwordConfirmation }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.passwordConfirmation && touched.passwordConfirmation ? 'text-input error' : 'text-input' }
              />
              )}
                {errors.passwordConfirmation && touched.passwordConfirmation && !login &&(
                <div className="input-feedback">{errors.passwordConfirmation}</div>
                )}
              <Button color="primary" size="large" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Segment>
          <Message>
            <Button color="black" onClick={() => this.setState({ login: !login })}>
                {login ? 'need to create an account?' : 'already have one?'}
            </Button>
          </Message>
      </Grid.Column>
    </Grid>
   );
  }
}

export default compose(
  withApollo,
  graphql(addUserMutation, { name: "addUserMutation"}), 
  graphql(getUserToken, { name: "getUserToken"})
)(withRouter(Register));