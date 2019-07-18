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
		const data = queryString.parse(this.props.location.search);
		console.log("these are the data")
    console.log(data)
		this.setState({
			fields: {
				id: data.id,
				root: data.root,
				number: data.number === "null" ? '' : data.number,
				salish: data.salish,
				nicodemus: data.nicodemus,
				english: data.english,
				editnote: data.editnote,
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
					salish: values.salish,
					nicodemus: values.nicodemus,
					english: values.english,
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
      salish: Yup.string()
        .max(150, 'cannot be more than 150 characters'),
      nicodemus: Yup.string()
        .min(1, 'at least 1 character is required')
        .required('a root entry is required'),
      english: Yup.string()
        .min(1, 'at least 1 character is required')
        .required('an English translation is required'),
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
                <Button color="black" size='large' type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
              </Form>
            )}
          />
        </Segment>
        <Segment>
			<h3>Virtual Keyboard</h3>
			<SimpleKeyboard / >
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
