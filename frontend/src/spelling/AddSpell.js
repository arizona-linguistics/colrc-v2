import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { graphql, compose, withApollo } from 'react-apollo';
import { addSpellingMutation, getSpellingsQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class AddSpelling extends Component {

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
		    await this.props.addSpellingMutation({
		      variables: {
		        reichard: values.reichard,
		        salish: values.salish,
		        nicodemus: values.nicodemus,
		        english: values.english,
						note: values.note,
		      },
		      refetchQueries: [{ query: getSpellingsQuery }]
				});
			setSubmitting(false)
			this.props.history.push('/spelling');
		} catch (result) {
			console.log(result.graphQLErrors[0].message);
			setSubmitting(false)
			this.setState({ error: result.graphQLErrors[0].message });
		}
	};

	render() {
	const stemSchema = Yup.object().shape({
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
             Add a Spelling
          </Header>
          <Message>
            Fill in the fields below to add a new spelling to the list.   Any new spelling must include an entry in the Nicodemus writing system.   Other fields are optional.
          </Message>
          {this.state.error && (
          <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment stacked>
          <Formik 
							initialValues={{ reichard: '',
							salish: '', nicodemus: '', english: '', note: '' }}
              validationSchema={stemSchema}
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
          >
            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
    					<Form>
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
                  placeholder='An entry for the spelling using the Nicodemus orthography is required.'
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
                  placeholder='English orthography is not required.'
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
                  label={{ basic: true, color: 'blue', content: 'Spelling Note' }}
                  placeholder='A spelling note is optional. It will display to all users.'
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
  graphql(addSpellingMutation, { name: "addSpellingMutation"}),)
(withRouter(withApollo(AddSpelling)));
