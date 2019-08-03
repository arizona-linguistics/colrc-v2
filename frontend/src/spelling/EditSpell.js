import React, { Component } from 'react';
import queryString from 'query-string';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose, withApollo } from 'react-apollo';
import { updateSpellingMutation, getSpellingsQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class EditSpell extends Component {

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
				reichard: data.reichard,
				salish: data.salish,
				nicodemus: data.nicodemus,
				english: data.english,
				note: data.note
			}
		});
		console.log("The current Id: " + data.id);
	}

	onFormSubmit = async (values, setSubmitting) => {
		console.log("In edit form submission")
    console.log(values)
    console.log(setSubmitting);
		try {
			await this.props.updateSpellingMutation({
				variables: {
					id: values.id,
					reichard: values.reichard,
					salish: values.salish,
					nicodemus: values.nicodemus,
					english: values.english,
					note: values.note
				},
				refetchQueries: [{ query: getSpellingsQuery }]
		    });	
      setSubmitting(false)
			this.props.history.push('/spelling');
		} catch (result) {
			console.log(result.graphQLErrors[0].message);
      setSubmitting(false)
      this.setState({ error: result.graphQLErrors[0].message });
		};
	};

	render() {
		console.log("this.state.fields is ")
    console.log(this.state.fields)
		const SpellingSchema = Yup.object().shape({
			reichard: Yup.string()
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
			});

		return (
			<Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Edit a Spelling
          </Header>
          <Message>
            Fill in the fields below to edit the selected spelling.  When you save your edits, the old spelling entry will be set to 'inactive' status and will no longer display.  The edited stem will display to users.
          </Message>
          {this.state.error && (
          <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment stacked>
            <Formik
              initialValues={{id: this.state.fields.id || '', reichard : this.state.fields.reichard || '', salish: this.state.fields.salish || '', nicodemus: this.state.fields.nicodemus || '', english: this.state.fields.english || '', note: this.state.fields.note || '' }}
              validationSchema={SpellingSchema}
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
                  label={{ basic: true, color: 'blue', content: 'Spelling ID' }}
                  placeholder='The ID of the spelling you are editing'
                  id='id'
                  type='text'
                  disabled
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
                  placeholder='An entry using the Nicodemus orthography is required.'
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
                  label={{ basic: true, color: 'blue', content: 'English' }}
                  placeholder='An English gloss for the is not required.'
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
	graphql(getSpellingsQuery, { name: 'getSpellingsQuery' }),
	graphql(updateSpellingMutation, { name: 'updateSpellingMutation', options: {refetchQueries: [ 'getSpellingsQuery'], awaitRefetchQueries: true} })
)(withRouter(withApollo(EditSpell)));
