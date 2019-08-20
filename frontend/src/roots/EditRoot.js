import React, { Component } from 'react';
import queryString from 'query-string';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose, withApollo } from 'react-apollo';
import { updateRootMutation, getRootsQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class EditRoot extends Component {
	_isMounted = false

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
    // create a ref to store the textInput DOM element
    this.idInput = React.createRef();
		this.state = {
			fields: {},
		}
  }

	componentDidMount() {
		this._isMounted = true
		const data = queryString.parse(this.props.location.search);
		console.log("these are the data")
    console.log(data)
		this.setState({
			fields: {
				id: data.id,
				root: data.root,
				number: data.number === "null" ? '' : data.number,
				sense: data.sense === "null" ? '' : data.sense,
				salish: data.salish,
				nicodemus: data.nicodemus,
				symbol: data.symbol === "null" ? '' : data.symbol,
				english: data.english,
				grammar: data.grammar,
				crossref: data.crossref === "null" ? '' : data.crossref,
				variant: data.variant === "null" ? '' : data.variant,
				cognate: data.cognate === "null" ? '' : data.cognate,
				editnote: data.editnote
			}
		});
		console.log("The current Id: " + data.id)
	}

	onFormSubmit = async (values, setSubmitting) => {
		console.log("In edit form submission")
		console.log(values)
		console.log(setSubmitting);
		try {
			await this.props.updateRootMutation({
				variables: {
					id: values.id,
					root: values.root,
					number: parseInt(values.number),
					sense: values.sense,
					salish: values.salish,
					nicodemus: values.nicodemus,
					symbol: values.symbol,
					english: values.english,
					grammar: values.grammar,
					crossref: values.crossref,
					variant: values.variant,
					cognate: values.cognate,
					editnote: values.editnote
				},
				refetchQueries: () => [{ query: getRootsQuery, variables: {}, awaitRefetchQueries: true }],
				awaitRefetchQueries: true
			})
			.then(() => {
				setSubmitting(false)
				console.log('wha happend')
				this.props.history.push('/roots')
			});
		} catch (result) {
			console.log(result.graphQLErrors[0]);
			setSubmitting(false)
			this.setState({ error: result.graphQLErrors[0].message });
		}
	};

	render() {
    console.log("this.state.fields is")
    console.log(this.state.fields)
    const rootSchema = Yup.object().shape({
      root: Yup.string()
				.max(150, 'cannot be more than 150 characters')
				.required('a root entry is required'),
			number: Yup.number()
				.integer('must be a number'),
			sense: Yup.string()
				.max(5,'unlikely to have more than 99999 senses for a word'),
      salish: Yup.string()
        .max(150, 'cannot be more than 150 characters'),
      nicodemus: Yup.string()
        .min(1, 'at least 1 character is required')
        .required('a root entry is required'),
			symbol: Yup.string()
				.max(3, 'most symbols are 1-2 characters'),
			english: Yup.string()
        .min(1, 'at least 1 character is required')
        .required('an English translation is required'),
			grammar: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			crossref: Yup.string()
			.max(150, 'cannot be more than 150 characters'),
			variant: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			cognate: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
      editnote: Yup.string()
        .max(150, 'cannot be more than 150 characters')
        .required('an edit note is required'),
      });

	return (
		<Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Edit a Root
          </Header>
          <Message>
            Fill in the fields below to edit the selected root.  When you save your edits, the old root entry will be set to 'inactive' status and will no longer display.  The edited root will display to users.  Please add an 'edit note' to briefly characterize the reason for the edit.  Edit notes do not display to users.
          </Message>
          {this.state.error && (
          <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment stacked>
            <Formik
              initialValues={{id: this.state.fields.id || '', root: this.state.fields.root || '', number: this.state.fields.number || '',  salish: this.state.fields.salish || '', nicodemus: this.state.fields.nicodemus || '', english: this.state.fields.english || '', editnote: this.state.fields.editnote || ''}}
              validationSchema={rootSchema}
              enableReinitialize
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
              render={({
                values,
                errors,
                status,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
              <Form>
              <Input
                  fluid
                  label={{ basic: true, color: 'blue', content: 'Root ID' }}
                  placeholder='The ID of the affix you are editing'
                  id='id'
                  type='text'
                  disabled
                  value={values.id}
                  onChange={handleChange}
									onBlur={handleBlur}
                />
                <Input
                  fluid
                  label={{ color: 'blue', content: 'Root' }}
                  placeholder='Root is required,'
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
                  placeholder='Must be a number. This field is optional.'
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
                  placeholder='sense is optional.'
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
                  placeholder='Salish transcription is optional.'
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
                  placeholder='An entry for the root using the Nicodemus orthography is required.'
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
                  placeholder='Symbol is optional.'
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
                  placeholder='An English gloss for the root is required.'
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
									placeholder='Grammar notes are optional.'
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
									placeholder='Crossref is optional.'
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
								placeholder='Variant is optional.'
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
								placeholder='Symbol is optional.'
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
                  label={{ color: 'blue', content: 'Edit Note' }}
                  placeholder='Please provide an editorial note.  Editorial notes do not display to users.'
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
          />
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
	graphql(getRootsQuery, { name: 'GetRootsQuery '}),
	graphql(updateRootMutation, { name: 'updateRootMutation', options: {refetchQueries: [ 'getRootsQuery'], awaitRefetchQueries: true} } )
)(withRouter(withApollo(EditRoot)));
