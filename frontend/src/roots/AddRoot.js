import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose } from 'react-apollo';
import { getRootsQuery, addRootMutation } from '../queries/queries';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

class AddRoot extends Component {

	constructor(props) {
    super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.state = {}
  }

	onFormSubmit = async (values, setSubmitting) => {
		console.log("In add form submission")
		console.log(values)
		console.log(setSubmitting);
		try {
		    await this.props.addRootMutation({
		      variables: {
		        root: values.root,
		        number: parseInt(values.number),
						sense: values.sense,
		        salish: values.salish,
		        nicodemus: values.nicodemus,
						symbol: values.symbol,
		        english: values.english,
						grammar: values.grammar,
						crossref: values.grammar,
						variant: values.variant,
						cognate: values.cognate,
		        editnote: values.editnote,
					},
					refetchQueries: [{ query:getRootsQuery }]
				});
			setSubmitting(false)
      this.props.history.push('/roots');
		} catch (result) {
      console.log(result.graphQLErrors[0].message);
      setSubmitting(false)
      this.setState({ error: result.graphQLErrors[0].message });
    }
	};

	render() {
		const rootSchema = Yup.object().shape({
			root: Yup.string()
				.max(150, 'cannot be more than 150 characters')
				.required('Root is required'),
			number: Yup.number()
				.integer('must be a number'),
			sense: Yup.string()
				.max(5, 'unlikely to have more than 99999 senses'),
			salish: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			nicodemus: Yup.string()
				.max(150, 'cannot be more than 150 characters')
				.required('An entry is required'),
			symbol: Yup.string()
				.max(3, 'most symbols are 1-2 characters'),
			english: Yup.string()
				.max(150, 'cannot be more than 150 characters')
				.required('An entry is required'),
			grammar: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			crossref: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			variant: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			cognate: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			editnote: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
		})

		return (
			<Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Add a Root
          </Header>
          <Message>
            Fill in the fields below to add a new root to the list.  Any new root must include an entry in the Nicodemus writing system, and an English translation.  Other fields are optional.
          </Message>
          {this.state.error && (
          <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
					<Segment stacked>
          <Formik
              initialValues={{ root: '', number: '', salish: '', nicodemus: '', english: '', editnote: ''}}
              validationSchema={rootSchema}
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
          >
            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
    					<Form>
    						<Input
                  fluid
                  label={{ color: 'blue', content: 'Root' }}
    							placeholder='The root is required...'
    							id='root'
                  type='text'
    							value={values.root}
    							onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.root && touched.root ? 'text-input error' : 'text-input' }
                />
                {errors.root && touched.root && (
                <div className="input-feedback">{errors.root}</div>
                )}
                <Input
                  fluid
                  label={{ basic: true, color: 'blue', content: 'Number' }}
                  placeholder='The root number is optional'
                  id='number'
                  type='text'
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.number && touched.number ? 'text-input error' : 'text-input' }
                />
                {errors.number && touched.number && (
                <div className="input-feedback">{errors.number}</div>
								)}
								<Input
								 fluid
								 label={{ basic: true, color: 'blue', content: 'Sense' }}
								 placeholder='sense is optional'
								 id='sense'
								 type='text'
								 value={values.sense}
								 onChange={handleChange}
								 onBlur={handleBlur}
								 className={ errors.sense && touched.sense ? 'text-input error' : 'text-input' }
							 	/>
							 	{errors.sense && touched.sense && (
							 	<div className="input-feedback">{errors.sense}</div>
							 	)}
								<Input
                	fluid
                  label={{ basic: true, color: 'blue', content: 'Salish' }}
                  placeholder='A transcription in the Salish orthography is optional'
                  id='salish'
                  type='text'
                  value={values.salish}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.salish && touched.salish ? 'text-input error' : 'text-input' }
                />
                {errors.salish && touched.salish && (
                <div className="input-feedback">{errors.salish}</div>
                )}
                <Input
                  fluid
                  label={{ color: 'blue', content: 'Nicodemus' }}
                  placeholder='An entry for the root using the Nicodemus orthography is required'
                  id='nicodemus'
                  type='text'
                  value={values.nicodemus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.nicodemus && touched.nicodemus ? 'text-input error' : 'text-input' }
                />
                {errors.nicodemus && touched.nicodemus && (
                <div className="input-feedback">{errors.nicodemus}</div>
                )}
								<Input
								 fluid
								 label={{ basic: true, color: 'blue', content: 'Symbol' }}
								 placeholder='A symbol is optional'
								 id='symbol'
								 type='text'
								 value={values.symbol}
								 onChange={handleChange}
								 onBlur={handleBlur}
								 className={ errors.symbol && touched.symbol ? 'text-input error' : 'text-input' }
							 	/>
							 	{errors.symbol && touched.symbol && (
							 	<div className="input-feedback">{errors.symbol}</div>
							 	)}
                <Input
                  fluid
                  label={{ color: 'blue', content: 'English' }}
                  placeholder='An English gloss for the root is required'
                  id='english'
                  type='text'
                  value={values.english}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.english && touched.english ? 'text-input error' : 'text-input' }
                />
                {errors.english && touched.english && (
                <div className="input-feedback">{errors.english}</div>
                )}
								<Input
								 fluid
								 label={{ basic: true, color: 'blue', content: 'Grammar' }}
								 placeholder='grammar is optional'
								 id='grammar'
								 type='text'
								 value={values.grammar}
								 onChange={handleChange}
								 onBlur={handleBlur}
								 className={ errors.grammar && touched.grammar ? 'text-input error' : 'text-input' }
							 	/>
							 	{errors.grammar && touched.grammar && (
							 	<div className="input-feedback">{errors.grammar}</div>
							 	)}
								<Input
								 fluid
								 label={{ basic: true, color: 'blue', content: 'Crossref' }}
								 placeholder='crossref is optional'
								 id='crossref'
								 type='text'
								 value={values.crossref}
								 onChange={handleChange}
								 onBlur={handleBlur}
								 className={ errors.crossref && touched.crossref ? 'text-input error' : 'text-input' }
							 	/>
							 	{errors.crossref && touched.crossref && (
							 	<div className="input-feedback">{errors.crossref}</div>
							 	)}
								<Input
								 fluid
								 label={{ basic: true, color: 'blue', content: 'Variant' }}
								 placeholder='variant is optional'
								 id='variant'
								 type='text'
								 value={values.variant}
								 onChange={handleChange}
								 onBlur={handleBlur}
								 className={ errors.variant && touched.variant ? 'text-input error' : 'text-input' }
							 	/>
							 	{errors.variant && touched.variant && (
							 	<div className="input-feedback">{errors.variant}</div>
							 	)}
								<Input
								 fluid
								 label={{ basic: true, color: 'blue', content: 'Cognate' }}
								 placeholder='cognate is optional'
								 id='cognate'
								 type='text'
								 value={values.cognate}
								 onChange={handleChange}
								 onBlur={handleBlur}
								 className={ errors.cognate && touched.cognate ? 'text-input error' : 'text-input' }
							 	/>
							 	{errors.cognate && touched.cognate && (
							 	<div className="input-feedback">{errors.cognate}</div>
							 	)}
                <Input
                  fluid
                  label={{ basic: true, color: 'blue', content: 'Edit Note' }}
                  placeholder='You can optionally include an editorial note about this entry.  Editorial notes do not display to users'
                  id='editnote'
                  type='text'
                  value={values.editnote}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.editnote && touched.editnote ? 'text-input error' : 'text-input' }
                />
                {errors.editnote && touched.editnote && (
                <div className="input-feedback">{errors.editnote}</div>
                )}
                <Segment className="confirmButton">
                  <Button color="black" size='large' type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Segment>
    					</Form>
            )}
          </Formik>
        </Segment>
        <Segment>
				<h3>Virtual Keyboard</h3>
				<SimpleKeyboard />
				</Segment>
        </Grid.Column>
			</Grid>
		);
	}
};

export default compose(
  graphql(addRootMutation, { name: "addRootMutation"}),
	graphql(getRootsQuery, { name: "getRootsQuery"})
  )(withRouter(AddRoot));
