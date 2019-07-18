import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { graphql, compose } from 'react-apollo';
import { addStemMutation, getStemsQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class AddStem extends Component {

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
		    await this.props.addStemMutation({
		      variables: {
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
		}
	};

	render() {
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
			.max(150, 'cannot be more than 150 characters'),
		});

		return (
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Add a Stem
          </Header>
          <Message>
            Fill in the fields below to add a new stem to the list.  Any new stem must include an entry in the Nicodemus writing system, and an English translation.  Other fields are optional, and the layout of this list is based on Reichard 1938.  Links and pages show the affix in that publication.
          </Message>

          {this.state.error && (
            <div className="input-feedback">{this.state.error}</div>
          )}

          <Segment stacked>
          <Formik 
							initialValues={{ category: '', reichard: '',
							doak: '', salish: '', nicodemus: '', english: '', note: '', editnote: ''}}
              validationSchema={stemSchema}
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
          >
            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
    					<Form>
    						<Input 
                  fluid 
                  label={{ basic: true, color: 'category', content: 'Category' }}
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
                  label={{ basic: true, color: 'blue', content: 'Edit Note' }}
                  placeholder='You can optionally include an editorial note about this entry.  Editorial notes do not display to users.'
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
          </Formik>
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
  graphql(addStemMutation, { name: "addStemMutation"}),)
(withRouter(AddStem));
