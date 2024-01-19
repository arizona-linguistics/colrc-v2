import React, { useState } from "react";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import {
  getAffixByIdQuery,
  updateAffixMutation,
  getAffixTypesQuery,
} from "./../queries/queries";
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

let updateAffixSchema = Yup.object().shape({
  nicodemus: Yup.string().required("a Nicodemus spelling is required"),
  english: Yup.string().required("an English gloss is required"),
  editnote: Yup.string().required("an edit note is required"),
  type: Yup.string().required("you must select a type"),
});

function EditAffix() {
  const { client } = useAuth();
  const [hasUpdated, setHasUpdated] = useState(false);
  const search = new URLSearchParams(useLocation().search);
  //console.log(search.get("id"))
  const id = search.get("id");
  const history = useHistory();

  let {
    loading: affixLoading,
    error: affixError,
    data: affixData,
  } = useQuery(getAffixByIdQuery, { client: client, variables: { id: id } });
  let {
    loading: typeLoading,
    error: typeError,
    data: typeData,
  } = useQuery(getAffixTypesQuery, { client: client });

  if (affixLoading || typeLoading) {
    return <div>loading...</div>;
  }
  if (affixError || typeError) {
    return <div>Something went wrong</div>;
  }

  async function onFormSubmit(values, setSubmitting) {
    try {
      console.log("my values.type is ", values.type);
      const result = await client.mutate({
        mutation: updateAffixMutation,
        variables: {
          id: values.id,
          type: parseInt(values.type),
          nicodemus: values.nicodemus,
          salish: values.salish,
          english: values.english,
          editnote: values.editnote,
          link: values.link,
          page: values.page,
        },
      });
      if (result.error) {
        handleErrors(result.error);
        setSubmitting(false);
      } else {
        broadCastSuccess(`affix ${values.nicodemus} successfully edited!`);
        setSubmitting(false);
        setHasUpdated(true);
      }
    } catch (error) {
      handleErrors(error);
      setSubmitting(false);
    }
  }

  if (hasUpdated) {
    return <Redirect to="/affixes" />;
  }

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

  const routeChange = () => {
    let path = `/affixes`;
    history.push(path);
  };

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column textAlign="center" width={12}>
            <Header as="h2">Edit an Affix</Header>
            <Message>
              The elements whose labels are solid blue are required for all
              affixes. The elements whose labels are outlined may be blank.
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Formik
        initialValues={{
          id: affixData.affixes_by_pk.id,
          type: affixData.affixes_by_pk.affix_type.id.toString(),
          typeText: affixData.affixes_by_pk.affix_type.value,
          nicodemus: affixData.affixes_by_pk.nicodemus,
          salish: affixData.affixes_by_pk.salish
            ? affixData.affixes_by_pk.salish
            : "",
          english: affixData.affixes_by_pk.english,
          link: affixData.affixes_by_pk.link
            ? affixData.affixes_by_pk.link
            : "",
          page: affixData.affixes_by_pk.page
            ? affixData.affixes_by_pk.page
            : "",
          editnote: affixData.affixes_by_pk.editnote
            ? affixData.affixes_by_pk.editnote
            : "",
        }}
        validationSchema={updateAffixSchema}
        onSubmit={(values, { setSubmitting }) => {
          confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure you want to edit the affix?",
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

export default EditAffix;
