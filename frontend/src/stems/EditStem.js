import React, { Component } from 'react';
import queryString from 'query-string';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose, withApollo } from 'react-apollo';
import { updateStemMutation, getStemsQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class EditStem extends Component {

	constructor(props) {
    super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
    // create a ref to store the textInput DOM element
    this.idInput = React.createRef();
		this.state = {
			fields: {},
		};
  }

	componentDidMount() {
	  const data = queryString.parse(this.props.location.search);
		console.log("these are the data")
    console.log(data)	
		this.setState({
			fields: {
				id: data.id,
				category: data.category,
				reichard: data.reichard,
				doak: data.doak,
				salish: data.salish,
				nicodemus: data.nicodemus,
				english: data.english,
				note: data.note,
				editnote: data.editnote
			}
		});
		console.log("The current Id: " + data.id);
	}

	onFormSubmit = async (values, setSubmitting) => {
		console.log("In edit form submission")
    console.log(values)
    console.log(setSubmitting);
		try {
			await this.props.updateStemMutation({
				variables: {
					id: values.id,
					category: values.category,
					reichard: values.reichard,
					doak: values.doak,
					salish: values.salish,
					nicodemus: values.nicodemus,
					english: values.english,
					note: values.note,
					editnote: values.editnote
				},
				refetchQueries: [{ query: getStemsQuery }]
		    });	
      setSubmitting(false)
			this.props.history.push('/stems');
		} catch (result) {
			console.log(result.graphQLErrors[0].message);
      setSubmitting(false)
      this.setState({ error: result.graphQLErrors[0].message });
		};
	};

	render() {
		console.log("this.state.fields is")
    console.log(this.state.fields)
		const stemSchema = Yup.object().shape({
			category: Yup.string()
				.max(150, 'cannot exceed 150 characters'),
			reichard: Yup.string()
				.max(150, 'cannot exceed 150 characters'),
			doak: Yup.string()
				.max(150, 'cannot exceed 150 characters'),
			salish: Yup.string()
				.max(150, 'cannot exceed 150 characters'),
			nicodemus: Yup.string()
				.min(1, 'at least 1 character is required')
				.required('A stem entry is required'),
			english: Yup.string()
				.min(1, 'at least 1 character is required')
				.required('an English translation is required'),
			note: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			editnote: Yup.string()
				.max(150, 'cannot be more than 150 characters')
				.required('An edit note is required.'),
			});

		return (
			<Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Edit a Stem
          </Header>
          <Message>
            Fill in the fields below to edit the selected stem.  When you save your edits, the old stem entry will be set to 'inactive' status and will no longer display.  The edited stem will display to users.  Please add an 'edit note' to briefly characterize the reason for the edit.  Edit notes do not display to users.
          </Message>
          {this.state.error && (
          <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment stacked>
            <Formik
              initialValues={{id: this.state.fields.id || '', category: this.state.fields.category || '', reichard : this.state.fields.reichard || '', doak: this.state.fields.doak || '', salish: this.state.fields.salish || '', nicodemus: this.state.fields.nicodemus || '', english: this.state.fields.english || '', note: this.state.fields.note || '', editnote: this.state.fields.editnote || ''}}
              validationSchema={stemSchema}
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
                  label={{ basic: true, color: 'blue', content: 'Stem ID' }}
                  placeholder='The ID of the stem you are editing'
                  id='id'
                  type='text'
                  disabled
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
							<Input 
                  fluid 
                  label={{ basic: true, color: 'blue', content: 'Category' }}
    							placeholder='Including the stem category is optional.'
    							id='category'
                  type='text'
    							value={values.category}
    							onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.category && touched.category ? 'text-input error' : 'text-input' }
                />
                {errors.category && touched.category && (
                <div className="input-feedback">{errors.category}</div>
								)}
								<Input 
                  fluid 
                  label={{ basic: true, color: 'blue', content: 'Reichard' }}
                  placeholder='A transcription in the Reichard orthography is optional.'
                  id='reichard'
                  type='text'
                  value={values.reichard}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.reichard && touched.reichard ? 'text-input error' : 'text-input' }
                />
                {errors.reichard && touched.reichard && (
                <div className="input-feedback">{errors.reichard}</div>
                )}
                <Input 
                  fluid 
                  label={{ basic: true, color: 'blue', content: 'Doak' }}
                  placeholder='A transcription in the Doak orthography is optional.'
                  id='doak'
                  type='text'
                  value={values.doak}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.doak && touched.doak ? 'text-input error' : 'text-input' }
                />
                {errors.doak && touched.doak && (
                <div className="input-feedback">{errors.doak}</div>
								)}
								<Input 
                  fluid 
                  label={{ basic: true, color: 'blue', content: 'Salish' }}
                  placeholder='A transcription in the Salish orthography is optional.'
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
                  placeholder='An entry for the affix using the Nicodemus orthography is required.'
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
                  placeholder='An English gloss for the affix is required.'
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
                  label={{ basic: true, color: 'blue', content: 'Note' }}
                  placeholder='A note is optional.'
                  id='note'
                  type='text'
                  value={values.note}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.note && touched.note ? 'text-input error' : 'text-input' }
                />
                {errors.note && touched.note && (
                <div className="input-feedback">{errors.note}</div>
                )}
                <Input 
                  fluid 
                  label={{ color: 'blue', content: 'Edit Note' }}
                  placeholder='You must include an editorial note about this entry.  Editorial notes do not display to users.'
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
	graphql(getStemsQuery, { name: 'getStemsQuery' }),
	graphql(updateStemMutation, { name: 'updateStemMutation', options: {refetchQueries: [ 'getStemsQuery'], awaitRefetchQueries: true} })
)(withRouter(withApollo(EditStem)));
