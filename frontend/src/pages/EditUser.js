import React, { useState } from "react";
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { Grid, Button, Label, Message, Header, Input, Dropdown } from 'semantic-ui-react';
import * as Yup from 'yup';
import { updateUserMutation, getUserByIdQuery, getRolesQuery } from './../queries/queries'
import { useQuery } from '@apollo/react-hooks'
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { confirmAlert } from 'react-confirm-alert';
import '../stylesheets/react-confirm-alert.css';

// first we set up validation for our form fields, using Yup (https://www.npmjs.com/package/yup)
let editUserSchema = Yup.object().shape({
    first: Yup.string()
      .required('Required'),
    last: Yup.string()
      .required('Required'),
    username: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Required'),
    }); 

// next we set up the things that will happen when the form is submitted    
function EditUser(props) {
    //get user record by ID passed from UserListTable.js
    const search = new URLSearchParams(useLocation().search)
    const id = search.get("id")

    //create a hook to set the outcome, set the state to false
    const [hasUpdated, setHasUpdated] = useState(false);
    //make sure we can use the browser history for routing after submit
    const history = useHistory();
    //get information about the user submitting the form to allow them to change the data
    const { client } = useAuth();
    //create a hook to query the database for all of the available roles, to set up our roles multiselect options
    let { loading: userLoading, error: userError, data: userData} = useQuery(getUserByIdQuery, {client: client, variables: {id: id} })
    let { loading: rolesLoading, error: rolesError, data: rolesData} = useQuery(getRolesQuery, {client: client})
    if (userLoading || rolesLoading) {
        return <div>loading...</div>
    }

    if (userError || rolesError ) {
        return <div>Something went wrong </div>
    }

    async function onFormSubmit (values, originalRoles, setSubmitting) {
        // console.log(values)
        // console.log(originalRoles)
        try {
            let roleLookup = {}
            rolesData.roles.forEach(item => {
                roleLookup[item.role_code] = item.id
            })
            let insertRoles = []
            let deleteRoles = {}
            let orCond = []
            let andCond = []
            values.roles.forEach(item => {
                if (!originalRoles.includes(item)) {
                    let h = {
                        userId: values.id,
                        roleId: roleLookup[item]
                    }
                    insertRoles.push(h)
                }
            })
            originalRoles.forEach(item => {
                if (!values.roles.includes(item)) {
                    let h = {
                        "roleId": { "_eq": roleLookup[item]} 
                    }
                    orCond.push(h)
                }
            })
            let h = {
                "userId": {"_eq": values.id}
            }
            andCond.push(h)
            if (orCond.length > 0) {
                andCond.push({ "_or": orCond })
            }
            // this else condition is to account for edits in which there are no role removals.  We need the andCond to resolve to 'false' in those cases
            // and we know that there will never be a roleId of -1 in the db.  If we pass an empty hash for this, Hasura interprets that as 'true' and removes
            // all roles for the relevant userId.  It'd be great to find a more elegant solution to this problem, but for now this is what we agreed on.
            else {
                andCond.push({"_or": { "roleId": { "_eq": -1} }})
            }
            deleteRoles = { "_and": andCond }

            console.log('insertRoles = ', JSON.stringify(insertRoles)) 
            console.log('deleteRoles = ', JSON.stringify(deleteRoles))             
            const result = await client.mutate({
                mutation: updateUserMutation,
                variables: {
                    userId: values.id,
                    changes: {            
                        first: values.first,
                        last: values.last,
                        username: values.username,
                        email: values.email,
                        password: values.password
                    },
                    insertRoles: insertRoles,
                    deleteRoles: deleteRoles
                }
            })
            if (result.error) {
                handleErrors(result.error)
                setSubmitting(false)
            } else {
                broadCastSuccess(`User ${values.username} successfully updated!`)
                setSubmitting(false)
                setHasUpdated(true)
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
    
    if (hasUpdated) {
        return <Redirect to="/userlist" />;
    }
    
    function userRoleOptions(options) {
        let res = []
        options.forEach((item) => {
            res.push(item.role.role_code.toString())
        })
        return res
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

    let originalRoles = userData.users_by_pk.user_roles ? userRoleOptions(userData.users_by_pk.user_roles) : []

    return (
        <>
        <Grid centered>
            <Grid.Row>
                <Grid.Column textAlign="center" width={12}>
                    <Header as="h2">Modify a User Record</Header>
                    <Message>Use this form to edit a user record.</Message>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Formik 
            initialValues={{ 
            id: userData.users_by_pk.id,
            first: userData.users_by_pk.first,
            last: userData.users_by_pk.last,
            username: userData.users_by_pk.username,
            email: userData.users_by_pk.email,
            roles: originalRoles,
            password: userData.users_by_pk.password, 
        }}
        validationSchema={editUserSchema}
        onSubmit={(values, { setSubmitting }) => {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you want to modify this account?',
                buttons: [
                {
                    label: 'Yes',
                    onClick: () => onFormSubmit(values, originalRoles, setSubmitting)
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
                                placeholder="this user does not yet have a role"
                                error= { errors.length > 0 }
                                fluid
                                multiple
                                clearable
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
                                type="text"
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

export default EditUser;
