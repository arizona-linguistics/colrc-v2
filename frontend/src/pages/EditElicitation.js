import React, { useState } from "react";
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { getElicitationSetByIdQuery, updateElicitationSetMutation } from './../queries/queries'
import { Button, Input, Label, Grid, Header, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { useQuery } from '@apollo/react-hooks'
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { confirmAlert } from 'react-confirm-alert';
import '../stylesheets/react-confirm-alert.css';

let updateElicitationSchema = Yup.object().shape({
  language: Yup.string()
    .required('a transcription language is required'),
  prompt: Yup.string()
    .required('an elicitation prompt is required'),
  editnote: Yup.string()
    .required('an edit note is required'),
  speaker: Yup.string()
    .required('a speaker is required'), 
  transcription: Yup.string()
    .required('an elicitation transcription is required')
  });

function EditElicitation() {
  const { client } = useAuth();
  const [ hasUpdated, setHasUpdated] = useState(false)
  const search = new URLSearchParams(useLocation().search)
  const id = search.get("id")
  const history = useHistory()


  let { loading: elicitationLoading, error: elicitationError, data: elicitationData } = useQuery(getElicitationSetByIdQuery, {client: client, variables: {id: id} }) 
   
  if (elicitationLoading) {
      return <div>loading...</div>
  }
  if (elicitationError) {
      return <div>Something went wrong</div>
  }

  async function onFormSubmit (values, setSubmitting) {
    try {
      const result = await client.mutate({
        mutation: updateElicitationSetMutation,
        variables: {
          id: values.id,
          editnote: values.editnote,
          language: values.language,
          prompt: values.prompt,
          speaker: values.speaker,
          transcription: values.transcription
        }
      })
      if (result.error) {
        handleErrors(result.error)
        setSubmitting(false)
      } else {
        broadCastSuccess(`elicitation set ${values.transcription} successfully edited!`)
        setSubmitting(false)
        setHasUpdated(true)
      }
    } catch (error) {
      handleErrors(error)
      setSubmitting(false)
    }
  }

  if (hasUpdated) {
    return <Redirect to="/elicitations" />;
  }

  const routeChange=()=> {
    let path = `/elicitations`;
    history.push(path);
  }


  return (
    <>
    <Grid centered>
        <Grid.Row>
            <Grid.Column textAlign="center" width={12}>
                <Header as="h2">Edit an Elicitation Set</Header>
                <Message>The elements whose labels are solid blue are required for all elicitation sets.  The elements whose labels are outlined may be blank.</Message>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    <Formik 
        initialValues={{ 
        id: elicitationData.elicitationsets_by_pk.id,
        language: elicitationData.elicitationsets_by_pk.language ? elicitationData.elicitationsets_by_pk.language : "" ,
        prompt: elicitationData.elicitationsets_by_pk.prompt ? elicitationData.elicitationsets_by_pk.prompt : "" ,
        speaker: elicitationData.elicitationsets_by_pk.speaker ? elicitationData.elicitationsets_by_pk.speaker : "" ,
        transcription: elicitationData.elicitationsets_by_pk.transcription ? elicitationData.elicitationsets_by_pk.transcription : "" ,
        editnote: elicitationData.elicitationsets_by_pk.editnote ? elicitationData.elicitationsets_by_pk.editnote : "" 
        }}
        validationSchema={updateElicitationSchema}
        onSubmit={(values, { setSubmitting }) => {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you want to edit the elicitation set?',
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
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Language</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="language"
                            placeholder="language"
                            type="text"
                            value={ values.language }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.language && touched.language ? 'text-input error' : 'text-input' }
                        />
                        {errors.language && touched.language && ( <div className="input-feedback">{errors.language}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Prompt</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="prompt"
                            placeholder="prompt"
                            type="text"
                            value={ values.prompt }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.prompt && touched.prompt ? 'text-input error' : 'text-input' }
                        />
                        {errors.prompt && touched.prompt && ( <div className="input-feedback">{errors.prompt}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Transcription</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="transcription"
                            placeholder="transcription"
                            type="text"
                            value={ values.transcription }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.transcription && touched.transcription ? 'text-input error' : 'text-input'}
                        />
                        {errors.transcription && touched.transcription && ( <div className="input-feedback">{errors.transcription}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label basic pointing="right" color="blue">Speaker</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="speaker"
                            placeholder="speaker"
                            type="text"
                            value={ values.speaker }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.speaker && touched.speaker ? 'text-input error' : 'text-input' }
                        />
                        {errors.speaker && touched.speaker && ( <div className="input-feedback">{errors.speaker}</div>
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

export default EditElicitation;