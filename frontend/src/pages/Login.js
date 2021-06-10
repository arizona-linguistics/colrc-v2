
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
//import axios from 'axios';
import logoImg from "../img/logo.jpg";
import { Logo, Error } from "../components/AuthForm";
import { Grid, Button, Input, Segment, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { getUserToken } from "../queries/queries";
import { handleErrors } from '../utils/messages';


function Login(props) {
  const abortController = new AbortController();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { authClient, setAuthTokens } = useAuth();

  const referer = (props.location && props.location.state && props.location.state.referer) ? props.location.state.referer : '/';

  async function postLogin(values, setSubmitting) {
    try {
      let tokenQuery = await authClient.query({
        query: getUserToken,
        variables: {
          email: values.email,
          password: values.password
        },
        errorPolicy: 'all'
      })
      if (!tokenQuery.data.loginUser_Q) {
        handleErrors(`Username or Password is incorrect`) 
        setIsError(true)
        setSubmitting(false)
      }
      else {
        const token = tokenQuery.data.loginUser_Q[0].password
        console.log('the token is ', token)
        //localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token)
        setSubmitting(false)
        setLoggedIn(true)
      }
    } 
    catch(e) {
      handleErrors(e)
    }

    // axios.post("http://backend:4000/api", {
    //   userName,
    //   password
    // }).then(result => {
    //   if (result.status === 200) {
    //     setAuthTokens(result.data);
    //     setLoggedIn(true);
    //   } else {
    //     setIsError(true);
    //   }
    // }).catch(e => {
    //   setIsError(true);
    // });
  }

  let loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  });

  if (isLoggedIn) {
    return <Redirect to={referer} />;
    //return <Redirect to="/" />;
  }

  return (
   <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo src={logoImg} />
        <Formik 
          initialValues={{ 
            email: '', 
            password: '', 
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            postLogin(values, setSubmitting);
          }}
          >
          {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Segment stacked>
                <Input
                  fluid
                  style={{ paddingBottom: '5px' }}
                  icon="mail"
                  iconPosition="left"
                  id="email"
                  placeholder="email"
                  type="email"
                  value={ values.email }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.email && touched.email ? 'text-input error' : 'text-input'}
                />
               {errors.email && touched.email && ( <div className="input-feedback">{errors.email}</div>
                )}
                <Input
                  fluid
                  style={{ paddingBottom: '5px' }}
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
               {errors.password && touched.password && ( <div className="input-feedback">{errors.password}</div>
                )}
                  <Button 
                    fluid
                    color="blue" 
                    size="large" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Segment>
            </Form>
            )}
          </Formik>
          <Message>
            <Link to="/signup">Don't have an account?</Link>
            { isError &&<Error>The username or password provided were incorrect!</Error> }
          </Message>
      </Grid.Column>
      </Grid>
  );
}

export default Login;
