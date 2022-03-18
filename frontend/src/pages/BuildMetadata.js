import React, { useState } from "react";
import { Grid, Header, Dropdown, Segment, Button, Table, Input, Label } from  "semantic-ui-react";
import { Formik, Form } from 'formik';
import { confirmAlert } from 'react-confirm-alert';
import { useAuth } from "../context/auth";
import { Redirect, useHistory } from 'react-router-dom';
import { insertRootMutation } from './../queries/queries';
import { handleErrors, broadCastSuccess } from '../utils/messages';


// Production URL: https://thecolrc.org/upload_file
// Development URL: http://localhost:80/upload_file
// In either case this should be redirected by nginx to http://localhost:8081/upload_handler


function BuildMetadata (props) {
    const { client } = useAuth();
    const [ hasUpdated, setHasUpdated] = useState(false)
    const history = useHistory()

    async function onFormSubmit (values, setSubmitting) {
        try {
          const result = await client.mutate({
            mutation: insertRootMutation,
            variables: {
                root: values.root,
                nicodemus: values.nicodemus,
                english: values.english,
                salish: values.salish,
                cognate: values.cognate,
                editnote: values.editnote,
                number: parseInt(values.number),
                sense: values.sense,
                crossref: values.crossref,
                grammar: values.grammar,
                variant: values.variant,
                symbol: values.symbol,
            }
          })
          if (result.error) {
            handleErrors(result.error)
            setSubmitting(false)
          } else {
            broadCastSuccess(`root ${values.root} successfully added!`)
            setSubmitting(false)
            setHasUpdated(true)
          }
        } catch (error) {
          handleErrors(error)
          setSubmitting(false)
        }
      }
    
      if (hasUpdated) {
        return <Redirect to="/upload" />;
      }
    
    
      const routeChange=()=> {
        let path = `/upload`;
        history.push(path);
      }
    


    return (
    <>
        <Grid textAlign='center'  verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 750 }} textAlign='center'>
                <Grid.Row>
                    <Segment>
                        <Table celled>
                            <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Resource</Table.HeaderCell>
                                <Table.HeaderCell>Filename</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            <Table.Row>
                                <Table.Cell>workbook</Table.Cell>
                                <Table.Cell>Snchitsu'umshtsn: The Coeur d'Alene Language</Table.Cell>
                                <Table.Cell>crd_greenbook_redux.pdf</Table.Cell>
                            </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                </Grid.Row>
                <Grid.Row>
                    <Segment>
                        <Header as ='h3'>
                            Build the Required Metadata
                        </Header>
                        <Formik 
                            initialValues={{ 
                            id: null,
                            originalTitle: '',
                            creator:'',
                            description: '',

                            source: '',
                            coverageLang: '',
                            coverageTime: '',
                            format: '',
                            identifier: '',
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                confirmAlert({
                                    title: 'Confirm to submit',
                                    message: 'Are you sure you want to add the root?',
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
                            
                            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
                            <Form>
                                <Grid centered>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Original Title</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                            <Input
                                                fluid
                                                style={{ paddingBottom: '5px' }}
                                                id="originalTitle"
                                                placeholder="Original Title"
                                                type="text"
                                                value={ values.originalTitle }
                                                onChange={ handleChange }
                                                onBlur={ handleBlur }
                                                className={ errors.originalTitle && touched.originalTitle ? 'text-input error' : 'text-input' }
                                            />
                                            {errors.originalTitle && touched.originalTitle && ( <div className="input-feedback">{errors.root}</div>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Creator</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                            <Input
                                                fluid
                                                style={{ paddingBottom: '5px' }}
                                                id="creator"
                                                placeholder="Creator"
                                                type="text"
                                                value={ values.creator }
                                                onChange={ handleChange }
                                                onBlur={ handleBlur }
                                                className={ errors.creator && touched.creator ? 'text-input error' : 'text-input' }
                                            />
                                            {errors.creator && touched.creator && ( <div className="input-feedback">{errors.creator}</div>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Description</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                            <Input
                                                fluid
                                                style={{ paddingBottom: '5px' }}
                                                id="salish"
                                                placeholder="Description"
                                                type="text"
                                                value={ values.description }
                                                onChange={ handleChange }
                                                onBlur={ handleBlur }
                                                className={ errors.description && touched.description ? 'text-input error' : 'text-input' }
                                            />
                                            {errors.description && touched.description && ( <div className="input-feedback">{errors.description}</div>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Source</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                            <Input
                                                fluid
                                                style={{ paddingBottom: '5px' }}
                                                id="salish"
                                                placeholder="Source"
                                                type="text"
                                                value={ values.source }
                                                onChange={ handleChange }
                                                onBlur={ handleBlur }
                                                className={ errors.source && touched.source ? 'text-input error' : 'text-input' }
                                            />
                                            {errors.source && touched.source && ( <div className="input-feedback">{errors.source}</div>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Coverage Language</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                        <Dropdown
                                            id="coverageLanguage"
                                            placeholder='Select a language'
                                            fluid
                                            multiple
                                            options={[{key: 'crd', text: "Coeur d'Alene", value: 'crd'}, {key: 'eng-US', text: 'US English', value: 'eng-US'}, {key: 'findLang', text: 'Find a Language', value: 'findLang'}]}
 
                                        />
                                            {errors.coverageLang && touched.coverageLang && ( <div className="input-feedback">{errors.coverageLang}</div>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Coverage Time</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                        <Dropdown
                                            id="coverageTime"
                                            placeholder='Select a date'
                                            fluid
                                            multiple
                                            options={[{key: '2022', text: '2022', value: '2022'}, {key: '2021', text: '2021', value: '2021'}, {key: '2020', text: '2020', value: '2020'}]}
 
                                        />
                                            {errors.coverageTime && touched.coverageTime && ( <div className="input-feedback">{errors.coverageTime}</div>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Format</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                            <Input
                                                fluid
                                                style={{ paddingBottom: '5px' }}
                                                id="format"
                                                placeholder="Format"
                                                type="text"
                                                value={ values.format }
                                                onChange={ handleChange }
                                                onBlur={ handleBlur }
                                                className={ errors.format && touched.format ? 'text-input error' : 'text-input' }
                                            />
                                            {errors.format && touched.format && ( <div className="input-feedback">{errors.format}</div>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Identifier</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                            <Input
                                                fluid
                                                style={{ paddingBottom: '5px' }}
                                                id="identifier"
                                                placeholder="identifier"
                                                type="text"
                                                value={ values.identifier }
                                                onChange={ handleChange }
                                                onBlur={ handleBlur }
                                                className={ errors.identifier && touched.identifier ? 'text-input error' : 'text-input' }
                                            />
                                            {errors.identifier && touched.identifier && ( <div className="input-feedback">{errors.identifier}</div>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={2} textAlign="right"><Label pointing="right" basic color="blue">Additional Field</Label></Grid.Column>
                                        <Grid.Column width={10}>
                                            <Input
                                                fluid
                                                style={{ paddingBottom: '5px' }}
                                                id="more"
                                                placeholder="select an additional field"
                                                type="text"
                                                value={ values.more }
                                                onChange={ handleChange }
                                                onBlur={ handleBlur }
                                                className={ errors.more && touched.more ? 'text-input error' : 'text-input' }
                                            />
                                            {errors.more && touched.more && ( <div className="input-feedback">{errors.more}</div>
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
                    </Segment>
                </Grid.Row>
            </Grid.Column>       
        </Grid>
    </>
    )
}

export default BuildMetadata