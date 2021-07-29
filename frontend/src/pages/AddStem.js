import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { insertStemMutation, getStemCategoriesQuery } from './../queries/queries'
import { Button, Input, Dropdown, Label, Grid, Header, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { useQuery } from '@apollo/react-hooks'
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { confirmAlert } from 'react-confirm-alert';
import '../stylesheets/react-confirm-alert.css';

let addStemSchema = Yup.object().shape({
  nicodemus: Yup.string()
    .required('a Nicodemus spelling is required'),
  english: Yup.string()
    .required('an English gloss is required'),
  editnote: Yup.string()
    .required('an edit note is required'),
  category: Yup.string()
    .required('you must select a category'),
  });


function AddStem() {
  const { client } = useAuth();
  const [ hasUpdated, setHasUpdated] = useState(false)
  const history = useHistory()

  let { loading: categoryLoading, error: categoryError, data: categoryData } = useQuery(getStemCategoriesQuery, {client: client }) 
  if (categoryLoading) {
      return <div>loading...</div>
  }
  if (categoryError) {
      return <div>Something went wrong</div>
  }

  async function onFormSubmit (values, setSubmitting) {
    try {
      console.log('my values.category is ', parseInt(values.category))
      const result = await client.mutate({
        mutation: insertStemMutation,
        variables: {
          category: parseInt(values.category),
          nicodemus: values.nicodemus,
          salish: values.salish,
          reichard: values.reichard,
          doak: values.doak,
          english: values.english,
          editnote: values.editnote,
        }
      })
      if (result.error) {
        console.log(result.error)
        handleErrors(result.error)
        setSubmitting(false)
      } else {
        broadCastSuccess(`stem ${values.nicodemus} successfully added!`)
        setSubmitting(false)
        setHasUpdated(true)
      }
    } catch (error) {
      handleErrors(error)
      setSubmitting(false)
    }
  }

  if (hasUpdated) {
    return <Redirect to="/stems" />;
  }

  function dropDownOptions(options) {
      let res = []
      options.forEach((item) => {
          let h = {}
          h = { 
              key: item.id.toString(),
              value: item.id.toString(),
              text: item.value          
          }
          res.push(h)
      })
      return res
  }

  const routeChange=()=> {
    let path = `/stems`;
    history.push(path);
  }

  return (
    <>
    <Grid centered>
        <Grid.Row>
            <Grid.Column textAlign="center" width={12}>
                <Header as="h2">Add an Stem</Header>
                <Message>The elements whose labels are solid blue are required for all stems.  The elements whose labels are outlined may be blank.</Message>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    <Formik 
        initialValues={{ 
        id: null,
        category: '',
        reichard: '',
        nicodemus: '',
        salish: '' ,
        english: '', 
        doak: '' ,
        editnote: '' 
        }}
        validationSchema={addStemSchema}
        onSubmit={(values, { setSubmitting }) => {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you want to add the stem?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => onFormSubmit(values, setSubmitting)
                  },
                  {
                    label: 'No',
                    onClick: () => setSubmitting(false)
                  }
                ]
              });
        }}>
        
        {({ isSubmitting, values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <Form>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Category</Label></Grid.Column>
                    <Grid.Column width={10}>
                    <Dropdown
                        id="category"
                        placeholder='Select a Category'
                        fluid
                        selection
                        options = { dropDownOptions(categoryData.stem_categories) }
                        onChange = {(e, data) => setFieldValue(data.id, data.value)}
                        value= { values.category }
                    />
                    {errors.category && touched.category && <div className="input-feedback"> {errors.category} </div>}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Nicodemus</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="nicodemus"
                            placeholder="Nicodemus"
                            type="text"
                            value={ values.nicodemus }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.nicodemus && touched.nicodemus ? 'text-input error' : 'text-input' }
                        />
                        {errors.nicodemus && touched.nicodemus && ( <div className="input-feedback">{errors.nicodemus}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" basic color="blue">Salish</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="salish"
                            placeholder="Salish"
                            type="text"
                            value={ values.salish }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.salish && touched.salish ? 'text-input error' : 'text-input' }
                        />
                        {errors.salish && touched.salish && ( <div className="input-feedback">{errors.salish}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">English</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="english"
                            placeholder="english"
                            type="text"
                            value={ values.english }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.english && touched.english ? 'text-input error' : 'text-input'}
                        />
                        {errors.english && touched.english && ( <div className="input-feedback">{errors.english}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label basic pointing="right" color="blue">Reichard</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="reichard"
                            placeholder="reichard"
                            type="text"
                            value={ values.reichard }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.reichard && touched.reichard ? 'text-input error' : 'text-input'}
                        />
                        {errors.reichard && touched.reichard && ( <div className="input-feedback">{errors.reichard}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label basic pointing="right" color="blue">Doak</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="doak"
                            placeholder="Doak"
                            type="text"
                            value={ values.doak }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.doak && touched.doak ? 'text-input error' : 'text-input'}
                        />
                        {errors.doak && touched.doak && ( <div className="input-feedback">{errors.doak}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Note</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="editnote"
                            placeholder="An edit note is required"
                            type="text"
                            value={ values.editnote }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.editnote && touched.editnote ? 'text-input error' : 'text-input' }
                        />
                        {errors.editnote && touched.editnote && ( <div className="input-feedback">{errors.editnote}</div>
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

export default AddStem;