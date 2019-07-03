import React, { Component } from 'react';
import { Input, Form, Button, Icon } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { graphql, compose } from 'react-apollo';
import { getUserQuery, getUsersQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class Users extends Component {
  render() {
    const addUserSchema = Yup.object().shape({
      category: Yup.string()
        .min(2, 'Too short!')
        .max(5, 'Too long!')
        .required('Required'),
      username: Yup.string()
        .min(1, 'too short')
        .required('Required'),
      email: Yup.string()
        .min(1, 'Write something!')
        .max(100, 'No novels!')
        .required('Required')
      });
    
    return (     
      <div className='ui content'>
        <UsersText />
        <h3>Add a User</h3>
				<p>Fill in the fields below to add a new user.</p>
      </div>
        <Formik 
        initialValues={{ first: '', last: '', username: '', email: '', password: '', english: '', id:'1'}}
          validationSchema={addUserSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.onFormSubmit(values);
            }}
      >

         {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
          <Form>
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
                  {errors.first && touched.first && (
                  <div className="input-feedback">{errors.category}</div>
                  )}
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
                  {errors.last && touched.last && (
                  <div className="input-feedback">{errors.last}</div>
                  )}
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
                  {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                  )}				            
                  <Input
                    id="salish"
                    placeholder="Salish"
                    type="text"
                    value={values.salish}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.salish && touched.salish ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.salish && touched.salish && (
                  <div className="input-feedback">{errors.salish}</div>
                  )}							
                  <Input
                    id="nicodemus"
                    placeholder="Nicodemus"
                    type="text"
                    value={values.nicodemus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.nicodemus && touched.nicodemus ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.nicodemus && touched.nicodemus && (
                  <div className="input-feedback">{errors.reichard}</div>
                  )}
                  <Input
                    id="english"
                    placeholder="English"
                    type="text"
                    value={values.english}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.english && touched.english ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.english && touched.english && (
                  <div className="input-feedback">{errors.english}</div>
                  )}
                  <Input
                    id="note"
                    placeholder="Note"
                    type="text"
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.note && touched.note ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.note && touched.note && (
                  <div className="input-feedback">{errors.note}</div>
                   )}
                  <Input
                  id="userId"
                  placeholder="Enter 1"
                  type="text"
                  value={values.userId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.userId && touched.userId ? 'text-input error' : 'text-input'
                  }
                />
                {errors.userId && touched.userId && (
                <div className="input-feedback">{errors.userId}</div>

                  )}
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
          </Form>
          )}
        </Formik>

    );
  }
}
export default compose(
  graphqul(addUserMutation, { name: "addUserMutation"}),)
(withRouter(AddUser));