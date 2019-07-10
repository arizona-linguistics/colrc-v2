import React, { Component } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import { addUserMutation, getUserToken } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  
  constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
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

	onFormSubmit = async (values) => {
		//evt.preventDefault();
    console.log("In add user submission");
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
      }
			// this.props.history.push('/stems');
		} catch (err) {
			console.log(err);
			// this.props.history.push('/stems');
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
      <div className='ui content'>
        <h3>Create an Account</h3>
				<p>
          Fill in the fields below to create a new account.
        </p>
        <Formik 
          initialValues={{ first: '', last: '', username: '', email: '', password: ''}}
          validationSchema={ !login ? addUserSchema : loginSchema }
          onSubmit={(values, { setSubmitting }) => {
          this.onFormSubmit(values);
          }}
        >
        {/* These are Formik actions */}
        {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            {!login && (
              <Input
                id="first"
                placeholder="First"
                type="text"
                value={values.first}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.first && touched.first ? 'text-input error' : 'text-input'
                }
              />
              )}
              {errors.first && touched.first && !login && (
              <div className="input-feedback">{errors.first}</div>
              )}
            {!login && (	
              <Input
                id="last"
                placeholder="Last"
                type="text"
                value={values.last}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.last && touched.last ? 'text-input error' : 'text-input'
                }
              />
            )}
              {errors.last && touched.last && !login && (
              <div className="input-feedback">{errors.last}</div>
              )}
            {!login && (
              <Input
                id="username"
                placeholder="Username"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.username && touched.username ? 'text-input error' : 'text-input'
                }
              />
            )}
              {errors.username && touched.username && !login && (
              <div className="input-feedback">{errors.username}</div>
              )}
           			            						
            <Input
              id="email"
              placeholder="email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? 'text-input error' : 'text-input'
              }
            />
            {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
            )}
            <Input
              id="password"
              placeholder="Password"
              type="text"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? 'text-input error' : 'text-input'
              }
            />
            {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
            )}	

          <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
        </Form>
        )}
      </Formik>
      <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
      </div>

    </div>
   );
  }
}

export default compose(
  withApollo,
  graphql(addUserMutation, { name: "addUserMutation"}), 
  graphql(getUserToken, { name: "getUserToken"})
)(withRouter(Register));