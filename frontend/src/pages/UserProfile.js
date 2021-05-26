import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import logoImg from "../img/logo.jpg";
import { Logo } from '../components/AuthForm'
import { Grid, Button, Input, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { getUserToken, updateUserMutation } from '../queries/queries';

let userProfileSchema = Yup.object().shape({
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


function UserProfile(props) {
  const { client, user, setAuthTokens } = useAuth();
  //const [hasUpdated, setHasUpdated] = useState(false)
  const [hasUpdated, setHasUpdated] = useState(false)

  async function postLogin(values) {
    try {
      let tokenQuery = await client.query({
        query: getUserToken,
        variables: {
          email: values.email,
          password: values.password
        },
        errorPolicy: 'all'
      })
      if (!tokenQuery.data.loginUser_Q) {
        handleErrors(`Username or Password is incorrect`) 
      }
      else {
        const token = tokenQuery.data.loginUser_Q[0].password
        localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token)
      }
    } 
    catch(e) {
      handleErrors(e)
    }
  }

  async function onFormSubmit (values, setSubmitting) {
    try {
      const result = await client.mutate({
        mutation: updateUserMutation,
        variables: {
          first: values.first,
          last: values.last,
          username: values.username,
          email: values.email,
          password: values.password
        }
      })
      if (result.error) {
        handleErrors(result.error)
        setSubmitting(false)
      } else {
        broadCastSuccess(`User ${values.username} successfully updated!`)
        // We need to re-login using the new values to reset the token 
        // and reset the user
        postLogin(values)
        setSubmitting(false)
        setHasUpdated(true)
      }
    } catch (error) {
      handleErrors(error)
      setSubmitting(false)
    }
  }

  if (hasUpdated) {
    return <Redirect to="/" />;
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo src={logoImg} />
        <Formik 
          initialValues={{ 
            first: user.first,
            last: user.last,
            username: user.username,
            email: user.email, 
            password: user.password, 
            passwordConfirmation: ''
          }}
          validationSchema={userProfileSchema}
          onSubmit={(values, { setSubmitting }) => {
            onFormSubmit(values, setSubmitting);
          }}
          >
          {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Segment>
               <Input
                  style={{ paddingBottom: '5px' }}
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
               {errors.first && touched.first && ( <div className="input-feedback">{errors.first}</div>
                )}
                <Input
                  fluid
                  style={{ paddingBottom: '5px' }}
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
               {errors.last && touched.last && ( <div className="input-feedback">{errors.last}</div>
                )}
                <Input
                  fluid
                  style={{ paddingBottom: '5px' }}
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
               {errors.user && touched.user && ( <div className="input-feedback">{errors.user}</div>
                )}
                <Input
                  fluid
                  style={{ paddingBottom: '5px' }}
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
                <Input
                  fluid
                  style={{ paddingBottom: '5px' }}
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
               {errors.passwordConfirmation && touched.passwordConfirmation && ( <div className="input-feedback">{errors.passwordConfirmation}</div>
                )}
                  <Button 
                    fluid
                    color="blue" 
                    size="large" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Segment>
            </Form>
            )}
          </Formik>
      </Grid.Column>
      </Grid>
  );
}

export default UserProfile;