import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Grid, Button, Label, Message, Header, Input } from "semantic-ui-react";
import * as Yup from "yup";
import { getUserByIdQuery, updateUserMutation } from "./../queries/queries";
import { useQuery } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import { useAuth } from "../context/auth";
import { handleErrors, broadCastSuccess } from "../utils/messages";
import { confirmAlert } from "react-confirm-alert";
import "../stylesheets/react-confirm-alert.css";

// first we set up validation for our form fields, using Yup (https://www.npmjs.com/package/yup)
let editUserSchema = Yup.object().shape({
  first: Yup.string().required("Required"),
  last: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Required"),
});

// next we set up the things that will happen when the form is submitted
function UserProfile(props) {
  //create a hook to set the outcome, set the state to false
  const [hasUpdated, setHasUpdated] = useState(false);
  //make sure we can use the browser history for routing after submit
  const history = useHistory();
  //get information about the user submitting the form to allow them to change the data
  const { client, user } = useAuth();

  //create a hook to query the database for all of the available roles, to set up our roles multiselect options
  let {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(getUserByIdQuery, {
    client: client,
    variables: { id: user.id },
  });
  if (userLoading) {
    return <div>loading...</div>;
  }
  if (userError) {
    console.log(userError);
    return <div>Something went wrong </div>;
  }

  // tell the system what to do when the 'submit' button is selected
  async function onFormSubmit(values, setSubmitting) {
    try {
      const result = await client.mutate({
        mutation: updateUserMutation,
        variables: {
          id: values.id,
          first: values.first,
          last: values.last,
          email: values.email,
          username: values.username,
        },
      });
      if (result.error) {
        handleErrors(result.error);
        setSubmitting(false);
      } else {
        broadCastSuccess(`User ${values.username} successfully updated!`);
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

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column textAlign="center" width={12}>
            <Header as="h2">User Profile</Header>
            <Message>Use this form to update your user profile.</Message>
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
                  <Label pointing="right" color="blue">
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.first && touched.first
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.first && touched.first && (
                    <div className="input-feedback">{errors.first}</div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" color="blue">
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.last && touched.last
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.last && touched.last && (
                    <div className="input-feedback">{errors.last}</div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" color="blue">
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.username && touched.username
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.user && touched.user && (
                    <div className="input-feedback">{errors.user}</div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" color="blue">
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
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

export default UserProfile;
