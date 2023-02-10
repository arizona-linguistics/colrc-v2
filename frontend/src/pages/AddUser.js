import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { Grid, Button, Label, Message, Header, Input, Dropdown } from 'semantic-ui-react';
import * as Yup from 'yup';
import { insertUserWithRoleMutation, getRolesQuery } from './../queries/queries'
import { useQuery } from '@apollo/react-hooks'
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { confirmAlert } from 'react-confirm-alert';
import '../stylesheets/react-confirm-alert.css';

// first we set up validation for our form fields, using Yup (https://www.npmjs.com/package/yup)
let addUserSchema = Yup.object().shape({
    first: Yup.string()
      .required('Required'),
    last: Yup.string()
      .required('Required'),
    username: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Required'),
    roles: Yup.string()
      .required('Assign one or more roles'),
    password: Yup.string().trim()
      .min(2, 'Password must be more than 2 characters')
      .max(30, 'Password must be less than 30 characters')
      .required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required!')
    }); 

// next we set up the things that will happen when the form is submitted    
function AddUser(props) {
    //create a hook to set the outcome, set the state to false
    const [hasAddedUser, sethasAddedUser] = useState(false);
    //make sure we can use the browser history for routing after submit
    const history = useHistory();
    //get information about the user submitting the form to allow them to change the data
    const { client } = useAuth();
    //create a hook to query the database for all of the available roles, to set up our roles multiselect options
    let { loading: rolesLoading, error: rolesError, data: rolesData} = useQuery(getRolesQuery, {client: client})
    if (rolesLoading) {
        return <div>loading...</div>
    }
    if (rolesError) {
        return <div>Something went wrong</div>
    }
    
   // tell the system what to do when the 'submit' button is selected 
    async function onFormSubmit (values, setSubmitting) {
        //console.log(values)
        try {
        const result = await client.mutate({
            mutation: insertUserWithRoleMutation,
            //these are the variables allowed to be passed into the insertUserWithRole mutation in queries.js
            variables: {
            first: values.first,
            last: values.last,
            username: values.username,
            email: values.email,
            password: values.password,
            user_roles: rolesReshape(values.roles)
            }
        })
        if (result.error) {
            handleErrors(result.error)
            setSubmitting(false)
        } else {
            broadCastSuccess(`User ${values.username} successfully added!`)
            setSubmitting(false)
            sethasAddedUser(true)
        }
        } catch (error) {
        handleErrors(error)
        setSubmitting(false)
        }
    }
    
    
    const routeChange=()=> {
        let path = `/userlist`;
        history.push(path);
    }
    
    if (hasAddedUser) {
        return <Redirect to="/userlist" />;
    }


    
    function roleOptions(options) {
        let res = []
        options.forEach((item) => {
            let h = {}
            h = { 
                key: item.id.toString(),
                value: item.role_code,
                text: item.role_value          
            }
            res.push(h)
        })
        return res
    }

    function rolesReshape(values){
        console.log('I am in the rolesReshape function ', values)
        let res = {}
        let arr = []
        values.forEach((item) => {
            let h = {}
            h = { 
                  "role": {
                      "data": {
                          "role_code": item
                      }, 
                      "on_conflict": {
                          "constraint": "roles_role_code_key",
                          "update_columns": ["role_code"]
                      } 
                  }
              }
            arr.push(h)
        })
        res = { "data": arr }
        return res
    }

    return (
        <>
        <Grid centered>
            <Grid.Row>
                <Grid.Column textAlign="center" width={12}>
                    <Header as="h2">Add a User to me Now</Header>
                    <Message>Use this form to add a new authorized account. The password you set should be changed by the user.</Message>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Formik 
            initialValues={{ 
            first: '',
            last: '',
            username: '',
            email: '',
            roles: '', 
            password: '', 
            passwordConfirmation: ''
        }}
        validationSchema={addUserSchema}
        onSubmit={(values, { setSubmitting }) => {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you want to create this account?',
                buttons: [
                {
                    label: 'Yes',
                    onClick: () => onFormSubmit(values, setSubmitting)
                },
                {
                    label: 'No',
                    // eslint-disable-next-line no-self-assign
                    onClick: () => {values = values
                                    setSubmitting(false)}
                }
                ]
            });
        }}>

        {({ isSubmitting, values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <Form>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">First Name</Label></Grid.Column>
                        <Grid.Column width={10}>
                            <div>Yes I'm live</div>
                            <Input
                                id="first"
                                placeholder="First Name"
                                fluid
                                type="text"
                                value={ values.first }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                className={ errors.first && touched.first ? 'text-input error' : 'text-input' }
                            />
                            {errors.first && touched.first && ( <div className="input-feedback">{errors.first}</div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Last Name</Label></Grid.Column>
                        <Grid.Column width={10}>
                            <Input
                                id="last"
                                fluid
                                placeholder="Last Name"
                                type="text"
                                value={ values.last }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                className={ errors.last && touched.last ? 'text-input error' : 'text-input' }
                            />
                            {errors.last && touched.last && ( <div className="input-feedback">{errors.last}</div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Username</Label></Grid.Column>
                        <Grid.Column width={10}>
                            <Input
                                id="username"
                                fluid
                                placeholder="Username"
                                type="text"
                                value={ values.username }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                className={ errors.username && touched.username ? 'text-input error' : 'text-input' }
                            />
                            {errors.user && touched.user && ( <div className="input-feedback">{errors.user}</div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Email</Label></Grid.Column>
                        <Grid.Column width={10}>                      
                            <Input
                                id="email"
                                placeholder="email"
                                fluid
                                type="text"
                                value={ values.email }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                className={ errors.email && touched.email ? 'text-input error' : 'text-input'}
                            />
                            {errors.email && touched.email && ( <div className="input-feedback">{errors.email}</div>
                            )}
                        </Grid.Column>  
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">User Roles</Label></Grid.Column>
                        <Grid.Column width={10}>
                            <Dropdown
                                id="roles"
                                placeholder='Select one or more roles'
                                fluid
                                multiple
                                options = { roleOptions(rolesData.roles) }
                                value= { values.roles || [] }
                                onChange = {(e, data) => setFieldValue(data.id, data.value)}
                                onBlur={ handleBlur }
                                className={ errors.roles && touched.roles ? 'text-input error' : 'text-input'}
                            />
                            {errors.roles && touched.roles && <div className="input-feedback"> {errors.roles} </div>}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                       <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Password</Label></Grid.Column>
                        <Grid.Column width={10}>                      
                            <Input
                                id="password"
                                placeholder="Set a password"
                                fluid
                                type="password"
                                value={ values.password }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                className={ errors.password && touched.password ? 'text-input error' : 'text-input' }
                            />
                            {errors.password && touched.password && ( <div className="input-feedback">{errors.password}</div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Password Confirmation</Label></Grid.Column>
                        <Grid.Column width={10}>   
                            <Input
                                id="passwordConfirmation"
                                placeholder="Confirm the password"
                                fluid
                                type="password"
                                value={ values.passwordConfirmation }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                                className={ errors.passwordConfirmation && touched.passwordConfirmation ? 'text-input error' : 'text-input' }
                            />
                            {errors.passwordConfirmation && touched.passwordConfirmation && ( <div className="input-feedback">{errors.passwordConfirmation}</div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Button 
                                fluid
                                color="blue"  
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button onClick={routeChange}
                                fluid
                            >
                                Cancel
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
            )}
        </Formik>
        </>
    );
}

export default AddUser;