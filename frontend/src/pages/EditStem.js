import React, { useState } from "react";
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { getStemByIdQuery, updateStemMutation, getStemCategoriesQuery } from '../queries/queries'
import { Button, Input, Dropdown, Label, Grid, Header, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { useQuery } from '@apollo/react-hooks'
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { confirmAlert } from 'react-confirm-alert';
import '../stylesheets/react-confirm-alert.css';

let updateStemsSchema = Yup.object().shape({
    nicodemus: Yup.string()
      .required('a Nicodemus spelling is required'),
    english: Yup.string()
      .required('an English gloss is required'),
    editnote: Yup.string()
      .required('an edit note is required'),
    category: Yup.string()
      .required('you must select a category'),
    });

function EditStem() {
    const { client } = useAuth();
    const [ hasUpdated, setHasUpdated] = useState(false)
    const search = new URLSearchParams(useLocation().search)
    // //console.log(search.get("id"))
    const id = search.get("id")
    const history = useHistory()
    
    // Save for stem category if needed
    let { loading: stemLoading, error: stemError, data: stemData } = useQuery(getStemByIdQuery, {client: client, variables: {id: id} }) 
    let { loading: categoryLoading, error: categoryError, data: categoryData } = useQuery(getStemCategoriesQuery, {client: client }) 
        
    if (categoryLoading || stemLoading) {
        return <div>loading...</div>
    }
    if (categoryError || stemError) {
        return <div>Something went wrong</div>
    }
    
    async function onFormSubmit (values, setSubmitting) {
        try {
          console.log('my values.category is ', values.category)
          const result = await client.mutate({
            mutation: updateStemMutation,
            variables: {
              id: values.id,
              category: parseInt(values.category),
              nicodemus: values.nicodemus,
              salish: values.salish,
              english: values.english,
              doak: values.doak,
              editnote: values.editnote,
              reichard: values.reichard,
            }
          })
          if (result.error) {
            handleErrors(result.error)
            setSubmitting(false)
          } else {
            broadCastSuccess(`stem ${values.nicodemus} successfully edited!`)
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
        options.map((item) => {
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
                <Header as="h2">Edit a Stem</Header>
                <Message>The elements whose labels are solid blue are required for all stems.  The elements whose labels are outlined may be blank.</Message>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    <Formik 
        initialValues={{ 
        id: stemData.stems_by_pk.id,
        category: stemData.stems_by_pk.stem_category.id.toString(),
        categoryText: stemData.stems_by_pk.stem_category.value,
        nicodemus: stemData.stems_by_pk.nicodemus,
        salish: stemData.stems_by_pk.salish ? stemData.stems_by_pk.salish : "" ,
        english: stemData.stems_by_pk.english, 
        doak: stemData.stems_by_pk.doak ? stemData.stems_by_pk.doak : "" ,
        reichard: stemData.stems_by_pk.reichard ? stemData.stems_by_pk.page : "" ,
        editnote: stemData.stems_by_pk.editnote ? stemData.stems_by_pk.editnote : "" 
        }}
        validationSchema={updateStemsSchema}
        onSubmit={(values, { setSubmitting }) => {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you want to edit the stem?',
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
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Stem Category</Label></Grid.Column>
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
                    {errors.type && touched.type && <div className="input-feedback"> {errors.type} </div>}
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
                    <Grid.Column width={2} textAlign="right"><Label basic pointing="right" color="blue">Doak</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="doak"
                            placeholder="Doak transcription"
                            type="text"
                            value={ values.doak }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.link && touched.link ? 'text-input error' : 'text-input' }
                        />
                        {errors.link && touched.link && ( <div className="input-feedback">{errors.link}</div>
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
                            placeholder="Reichard"
                            type="text"
                            value={ values.reichard }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.page && touched.page ? 'text-input error' : 'text-input' }
                        />
                        {errors.page && touched.page && ( <div className="input-feedback">{errors.page}</div>
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

export default EditStem;