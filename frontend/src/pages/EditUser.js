import React, { useState } from "react";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  Label,
  Message,
  Header,
  Input,
  Dropdown,
} from "semantic-ui-react";
import * as Yup from "yup";
import {
  getUserByIdQuery,
  getRolesQuery,
  updateUserRolesMutation,
  updateUserPwdMutation,
} from "./../queries/queries";
import { useQuery } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import { useAuth } from "../context/auth";
import { handleErrors, broadCastSuccess } from "../utils/messages";
import { confirmAlert } from "react-confirm-alert";
import "../stylesheets/react-confirm-alert.css";

// first we set up validation for our form fields, using Yup (https://www.npmjs.com/package/yup)
let editUserSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Password must be more than 2 characters")
    .max(30, "Password must be less than 30 characters")
    .required("Required"),
});

// next we set up the things that will happen when the form is submitted
function EditUser(props) {
  //get user record by ID passed from UserListTable.js
  const search = new URLSearchParams(useLocation().search);
  const id = search.get("id");

  //create a hook to set the outcome, set the state to false
  const [hasUpdated, setHasUpdated] = useState(false);
  //make sure we can use the browser history for routing after submit
  const history = useHistory();
  //get information about the user submitting the form to allow them to change the data
  const { client } = useAuth();
  //create a hook to query the database for all of the available roles, to set up our roles multiselect options
  let {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(getUserByIdQuery, { client: client, variables: { id: id } });
  let {
    loading: rolesLoading,
    error: rolesError,
    data: rolesData,
  } = useQuery(getRolesQuery, { client: client });
  if (userLoading || rolesLoading) {
    return <div>loading...</div>;
  }
  if (userError || rolesError) {
    return <div>Something went wrong </div>;
  }

  // if ( rolesData ) {
  //     return <div>{JSON.stringify(rolesData)}</div>
  // }

  // if ( userData ) {
  //     return <div>{JSON.stringify(userData)}</div>
  // }

  let roleIdLookUpTable = {};
  if (rolesData) {
    roleIdLookUpTable = roleLookUp(rolesData);
  }
  console.log("the RoleIdLookUpTable is ", roleIdLookUpTable);

  function roleLookUp(rolesData) {
    let res = {};
    rolesData.roles.forEach((item) => {
      res[item.role_code] = item.id;
    });
    return res;
  }

  function updateRolesReshape(userId, role_codes) {
    let arr = [];
    role_codes.forEach((item) => {
      let h = {};
      h = {
        userId: userId,
        roleId: roleIdLookUpTable[item],
      };
      arr.push(h);
    });
    return arr;
  }

  // tell the system what to do when the 'submit' button is selected
  async function onFormSubmit(values, setSubmitting) {
    try {
      const result = await client.mutate({
        mutation: updateUserRolesMutation,
        variables: {
          userId: values.id,
          newRoles: updateRolesReshape(values.id, values.roles),
        },
      });
      if (result.error) {
        handleErrors(result.error);
        setSubmitting(false);
      } else {
        broadCastSuccess(
          `User ${values.username}'s roles successfully updated!`
        );
        setSubmitting(false);
        setHasUpdated(true);
      }
    } catch (error) {
      handleErrors(error);
      setSubmitting(false);
    }
    try {
      const pwdResult = await client.mutate({
        mutation: updateUserPwdMutation,
        variables: {
          id: values.id,
          password: values.password,
        },
      });
      if (pwdResult.error) {
        handleErrors(pwdResult.error);
        setSubmitting(false);
      } else {
        broadCastSuccess(
          `User ${values.username}'s password successfully updated!`
        );
        setSubmitting(false);
        setHasUpdated(true);
      }
    } catch (error) {
      handleErrors(error);
      setSubmitting(false);
    }
  }

  const routeChange = () => {
    let path = `/users`;
    history.push(path);
  };

  if (hasUpdated) {
    return <Redirect to="/users" />;
  }

  function userRoleOptions(options) {
    let res = [];
    options.forEach((item) => {
      res.push(item.role.role_code.toString());
    });
    console.log(res);
    return res;
  }

  function roleOptions(options) {
    let res = [];
    options.forEach((item) => {
      let h = {};
      h = {
        key: item.id.toString(),
        value: item.role_code.toString(),
        text: item.role_value.toString(),
      };
      res.push(h);
    });
    return res;
  }

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column textAlign="center" width={12}>
            <Header as="h2">Manage User</Header>
            <Message>Use this form to manage user roles and passwords.</Message>
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
          roles: userData.users_by_pk.user_roles
            ? userRoleOptions(userData.users_by_pk.user_roles)
            : [],
          password: userData.users_by_pk.password,
        }}
        validationSchema={editUserSchema}
        onSubmit={(values, { setSubmitting }) => {
          confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure you want to modify this account?",
            buttons: [
              {
                label: "Yes",
                onClick: () => onFormSubmit(values, setSubmitting),
              },
              {
                label: "No",
                onClick: () => {
                  // eslint-disable-next-line no-self-assign
                  values = values;
                  setSubmitting(false);
                },
              },
            ],
          });
        }}
      >
        {({
          isSubmitting,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" basic color="blue">
                    First Name
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    id="first"
                    placeholder="First Name"
                    fluid
                    type="text"
                    value={values.first}
                    disabled
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" basic color="blue">
                    Last Name
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    id="last"
                    fluid
                    placeholder="Last Name"
                    type="text"
                    value={values.last}
                    disabled
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" basic color="blue">
                    Username
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    id="username"
                    fluid
                    placeholder="Username"
                    type="text"
                    value={values.username}
                    disabled
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" basic color="blue">
                    Email
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    id="email"
                    placeholder="email"
                    fluid
                    type="text"
                    value={values.email}
                    disabled
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" color="blue">
                    User Roles
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Dropdown
                    id="roles"
                    placeholder="this user does not yet have a role"
                    error={errors.length > 0}
                    fluid
                    multiple={true}
                    options={roleOptions(rolesData.roles)}
                    value={values.roles}
                    onChange={(e, data) => setFieldValue(data.id, data.value)}
                    onBlur={handleBlur}
                    className={
                      errors.roles && touched.roles
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.roles && touched.roles && (
                    <div className="input-feedback"> {errors.roles} </div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" color="blue">
                    Password
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    id="password"
                    placeholder="Set a password"
                    fluid
                    type="text"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
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
                  <Button onClick={routeChange} fluid>
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
