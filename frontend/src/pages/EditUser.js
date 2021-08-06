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

    // if ( rolesData ) {
    //     return <div>{JSON.stringify(rolesData)}</div>
    // }

   // {"roles":[{"id":1,"role_value":"Manager","role_code":"manager","__typename":"roles"},{"id":2,"role_value":"Update","role_code":"update","__typename":"roles"},{"id":3,"role_value":"View","role_code":"view","__typename":"roles"}]}

   // tell the system what to do when the 'submit' button is selected 
   // build a string based on the values;
   // convert the string to a gql schema;
   // execute the mutation, with variables like this:

//    {
// 	    "userId" : 22,
//      "changes": {
//      "first": "Brendan"
//    },
//   "insertRoles": [
//     {
//       "roleId": 1,
//       "userId": 22
//     },
//     {
//       "roleId": 3,
//       "userId": 22
//     }
//   ],
//   "deleteRoles": { "_and": [{"userId": {"_eq": 22}}, {"_or": [{"roleId": {"_eq": 1}}, {"roleId": {"_eq": 3}}]}]}
//  }


    async function onFormSubmit (values, originalRoles, setSubmitting) {
        console.log(values)
        console.log(originalRoles)

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
        let path = `/users`;
        history.push(path);
    }
    
    if (hasUpdated) {
        return <Redirect to="/users" />;
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

    // function rolesReshape(values){
    //     console.log('I am in the rolesReshape function ', values)
    //     let res = {}
    //     let arr = []
    //     values.forEach((item) => {
    //         let h = {}
    //         h = { 
    //               "role": {
    //                   "data": {
    //                       "role_code": item
    //                   }, 
    //                   "on_conflict": {
    //                       "constraint": "roles_role_code_key",
    //                       "update_columns": ["role_code"]
    //                   } 
    //               }
    //           }
    //         arr.push(h)
    //     })
    //     res = { "data": arr }
    //     return res
    // }

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
