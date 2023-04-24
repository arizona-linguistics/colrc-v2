import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { insertAffixMutation, getAffixTypesQuery } from "./../queries/queries";
import {
  Button,
  Input,
  Dropdown,
  Label,
  Grid,
  Header,
  Message,
} from "semantic-ui-react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useAuth } from "../context/auth";
import { useQuery } from "@apollo/react-hooks";
import { handleErrors, broadCastSuccess } from "../utils/messages";
import { confirmAlert } from "react-confirm-alert";
import "../stylesheets/react-confirm-alert.css";

/**
 * Yup schema object for validating a form that adds an affix.
 *
 * @type {import('yup').ObjectSchema}
 * @property {import('yup').StringSchema} nicodemus - The field validation rules for the Nicodemus spelling.
 * @property {import('yup').StringSchema} english - The field validation rules for the English gloss.
 * @property {import('yup').StringSchema} editnote - The field validation rules for the edit note.
 * @property {import('yup').StringSchema} type - The field validation rules for the affix type .
 */
let addAffixSchema = Yup.object().shape({
  nicodemus: Yup.string().required("a Nicodemus spelling is required"),
  english: Yup.string().required("an English gloss is required"),
  editnote: Yup.string().required("an edit note is required"),
  type: Yup.string().required("you must select a type"),
});

function AddAffix() {
  const { client } = useAuth();
  const [hasUpdated, setHasUpdated] = useState(false);
  const history = useHistory();
  /**
   * Takes values from the 'client' object of 'getAffixTypesQuery', and
   * and destructures them into new values for the 'client' object of useAuth
   */
  let {
    loading: typeLoading,
    error: typeError,
    data: typeData,
  } = useQuery(getAffixTypesQuery, { client: client });

  /**
   * if the SQL query is in progress, the page will display the corresponding
   * message
   */
  if (typeLoading) {
    return <div>loading...</div>;
  }
  /**
   * if there is an error in the SQL query, the page will display the corresponding
   * message
   */
  if (typeError) {
    return <div>Something went wrong</div>;
  }
  /**
   *This function is called when a form is submitted. It takes the values from
   *the form and uses them to execute a GraphQL mutation to insert a new affix
   *into a database.
   *
   *@param {Object} values - The values from the form.
   *@param {Function} setSubmitting - A function to set the submitting status of the form.
   */
  async function onFormSubmit(values, setSubmitting) {
    try {
      /**
       * The output of a SQL mutation according to 'insertAffixMutation'
       * @type {Object}
       */
      const result = await client.mutate({
        mutation: insertAffixMutation,
        variables: {
          // id: values.id,
          type: parseInt(values.type),
          nicodemus: values.nicodemus,
          salish: values.salish,
          english: values.english,
          editnote: values.editnote,
          link: values.link,
          page: values.page,
        },
      });
      /**
       * If mutation fails, an error handling will occur.
       */
      if (result.error) {
        console.log(result.error);
        handleErrors(result.error);
        setSubmitting(false);
      } else {
        /**
         * if mutation is successful, a success message will be displayed
         */
        broadCastSuccess(`affix ${values.nicodemus} successfully added!`);
        setSubmitting(false);
        setHasUpdated(true);
      }
    } catch (error) {
      handleErrors(error);
      setSubmitting(false);
    }
  }
  /***
   * Once the database has been updated, the user will be redirected to the
   * /affixes" page
   */
  if (hasUpdated) {
    return <Redirect to="/affixes" />;
  }

  /*** Transforms an array of options into an array of objects with `key`,
   * `value`, and `text` properties by using the 'map' method
   * @function
   * @param {Array<Object>} options - The array of options to transform.
   * @returns {Array<Object>} An array of objects with `key`, `value`, and `text` properties.
   */
  function dropDownOptions(options) {
    let res = [];
    // eslint-disable-next-line array-callback-return
    options.map((item) => {
      let h = {};
      h = {
        key: item.id.toString(),
        value: item.id.toString(),
        text: item.value,
      };
      res.push(h);
    });
    return res;
  }
  /*** Changes the current route to `/affixes` and adds it to the browser history
   * @function
   */
  const routeChange = () => {
    let path = `/affixes`;
    history.push(path);
  };
  /***
   * Returns a JSX element which gives the user the option to add an affix
   */
  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column textAlign="center" width={12}>
            <Header as="h2">Add an Affix</Header>
            <Message>
              The elements whose labels are solid blue are required for all
              affixes. The elements whose labels are outlined may be blank.
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Formik
        initialValues={{
          id: null,
          type: "",
          typeText: "",
          nicodemus: "",
          salish: "",
          english: "",
          link: "",
          page: "",
          editnote: "",
        }}
        validationSchema={addAffixSchema}
        /**
         * Once an affix has been submitted, the variables `values` and
         * `setSubmitting` are passed through, and the user is asked to confirm
         */
        onSubmit={(values, { setSubmitting }) => {
          confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure you want to add the affix?",
            buttons: [
              {
                label: "Yes",
                onClick: () => onFormSubmit(values, setSubmitting),
              },
              {
                label: "No",
                onClick: () => setSubmitting(false),
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
                    Affix Type
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Dropdown
                    id="type"
                    placeholder="Select a Type"
                    fluid
                    selection
                    options={dropDownOptions(typeData.affix_types)}
                    onChange={(e, data) => setFieldValue(data.id, data.value)}
                    value={values.type}
                  />
                  {errors.type && touched.type && (
                    <div className="input-feedback"> {errors.type} </div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" color="blue">
                    Nicodemus
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    fluid
                    style={{ paddingBottom: "5px" }}
                    id="nicodemus"
                    placeholder="Nicodemus"
                    type="text"
                    value={values.nicodemus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.nicodemus && touched.nicodemus
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.nicodemus && touched.nicodemus && (
                    <div className="input-feedback">{errors.nicodemus}</div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" basic color="blue">
                    Salish
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    fluid
                    style={{ paddingBottom: "5px" }}
                    id="salish"
                    placeholder="Salish"
                    type="text"
                    value={values.salish}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.salish && touched.salish
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.salish && touched.salish && (
                    <div className="input-feedback">{errors.salish}</div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" color="blue">
                    English
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    fluid
                    style={{ paddingBottom: "5px" }}
                    id="english"
                    placeholder="english"
                    type="text"
                    value={values.english}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.english && touched.english
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.english && touched.english && (
                    <div className="input-feedback">{errors.english}</div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label basic pointing="right" color="blue">
                    Link
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    fluid
                    style={{ paddingBottom: "5px" }}
                    id="link"
                    placeholder="URL"
                    type="text"
                    value={values.link}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.link && touched.link
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.link && touched.link && (
                    <div className="input-feedback">{errors.link}</div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label basic pointing="right" color="blue">
                    Link Text
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    fluid
                    style={{ paddingBottom: "5px" }}
                    id="page"
                    placeholder="Link text"
                    type="text"
                    value={values.page}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.page && touched.page
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.page && touched.page && (
                    <div className="input-feedback">{errors.page}</div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} textAlign="right">
                  <Label pointing="right" color="blue">
                    Note
                  </Label>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Input
                    fluid
                    style={{ paddingBottom: "5px" }}
                    id="editnote"
                    placeholder="An edit note is required"
                    type="text"
                    value={values.editnote}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.editnote && touched.editnote
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.editnote && touched.editnote && (
                    <div className="input-feedback">{errors.editnote}</div>
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

export default AddAffix;
