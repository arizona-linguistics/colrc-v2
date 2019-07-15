import React, { Component } from 'react';
import { Button, Grid, Header, Image, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import { addUserMutation, getUserToken } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class Register extends Component {

  constructor(props) {
    super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
    // create a ref to store the textInput DOM element
		this.state = {
      login: false,
			fields: {
        first: "",
        last: "",
        username: "",
        email: "",
        password: "",
	    },
		};
  }

	onFormSubmit = async (values, setSubmitting) => {
		//evt.preventDefault();
    console.log("In add user submission");
    console.log(values)
    console.log(setSubmitting)
    const { login } = this.state
    try {
      if (login) {
        console.log("this.props.client")
        console.log(this.props.client)
        const queryUserToken = await this.props.client.query({
          query: getUserToken,
          variables: {
            email: values.email,
            password: values.password
          }
        })
        const token = queryUserToken.data.loginUser_Q[0].password
        localStorage.setItem('TOKEN', token)
        setSubmitting(false)
        this.props.changeLoginState(true)
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
			this.props.history.push('/register');
		} catch (err) {
			console.log(err);
			this.props.history.push('/register');
		}
	};

	onInputChange = (evt) => {
		console.log("Change event called on " + evt.target.value);
		const fields = Object.assign({}, this.state.fields);
		fields[evt.target.name] = evt.target.value;
		this.setState({ fields });
	};

  render() {
    const { login } = this.state
    const addUserSchema = Yup.object().shape({
      first: Yup.string()
      .required('Required'),
      last: Yup.string()
      .required('Required'),
      username: Yup.string()
        .min(1, 'too short')
        .max(100, 'Username must not exceed 100 characters')
        .required('Required'),
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Required'),
      password: Yup.string()
        .min(2, 'Too short!')
        .max(30, 'Too long!')
        .required('Required'),
      });

    const loginSchema = Yup.object().shape({
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Required'),
      password: Yup.string()
        .min(2, 'Too short!')
        .max(30, 'Too long!')
        .required('Required'),
      });

    return (
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2'  textAlign='center'>
              {login ? 'Log in to your account' : 'Create an account'}
          </Header>
          <Segment stacked>
            <Formik
              initialValues={{ first: '', last: '', username: '', email: '', password: ''}}
              validationSchema={ !login ? addUserSchema : loginSchema }
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
            >
            {/* These are Formik actions */}
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
                type="text"
                value={ values.password }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.password && touched.password ? 'text-input error' : 'text-input' }
              />
                {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
                )}
                <Button color="blue" size='large' type="submit" disabled={isSubmitting}>
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
