import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose } from 'react-apollo';
import { addAffixMutation, getAffixesQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class AddAffix extends Component {

	constructor(props) {
    super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
  }

	onFormSubmit = async (values, setSubmitting) => {
		console.log("In add form submission")
    console.log(values)
    console.log(setSubmitting);
		try {
		    this.props.addAffixMutation({
		      variables: {
		        type: values.type,
		        salish: values.salish,
		        nicodemus: values.nicodemus,
		        english: values.english,
		        link: values.link,
		        page: values.page,
            editnote: values.editnote
		      },
		      refetchQueries: [{ query: getAffixesQuery }]
		    });	
      setSubmitting(false)
			this.props.history.push('/affixes');
		} catch (err) {
			console.log(err);
			this.props.history.push('/affixes');
		}
	};

	onInputChange = (evt) => {
		console.log("Change event called on " + evt.target.value);
		const fields = Object.assign({}, this.state.fields);
		fields[evt.target.name] = evt.target.value;
		this.setState({ fields });
	};

	render() {
    const affixSchema = Yup.object().shape({
      type: Yup.string()
        .max(150, 'cannot be more than 150 characters'),
      salish: Yup.string()
        .max(150, 'cannot be more than 150 characters'),
      nicodemus: Yup.string()
        .min(2, 'at least 2 characters are required')
        .required('an affix entry is required'),
      english: Yup.string()
        .min(1, 'at least 2 characters are required')
        .required('an English translation is required'),
      link: Yup.string()
        .url('link must be a valid URL'),
      page: Yup.number()
        .integer('page must be a number'),
      editnote: Yup.string()
        .max(150, 'cannot be more than 150 characters'),
      });


		return (
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Add an Affix
          </Header>
          <Message>
            Fill in the fields below to add a new affix to the list.  Any new affix must include an entry in the Nicodemus writing system, and an English translation.  Other fields are optional, and the layout of this list is based on Reichard 1938.  Links and pages show the affix in that publication.
          </Message>
          <Segment stacked>
          <Formik 
              initialValues={{ type: '', salish: '', nicodemus: '', english: '', link: '', page: ''}}
              validationSchema={affixSchema}
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
          >
            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
    					<Form>
    						<Input 
                  fluid 
                  label={{ basic: 'true', color: 'blue', content: 'Type' }}
    							placeholder='Including the affix type is optional...'
    							id='type'
                  type='text'
    							value={values.type}
    							onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.type && touched.type ? 'text-input error' : 'text-input' }
                />
                {errors.type && touched.type && (
                <div className="input-feedback">{errors.type}</div>
                )}
                <Input 
                  fluid 
                  label={{ basic: 'true', color: 'blue', content: 'Salish' }}
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
                  placeholder='An entry for the affix using the Nicodemus orthography is required'
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
                  placeholder='An English gloss for the affix is required'
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
                  label={{ basic: 'true', color: 'blue', content: 'Link' }}
                  placeholder='A weblink is optional'
                  id='link'
                  type='text'
                  value={values.link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.link && touched.link ? 'text-input error' : 'text-input' }
                />
                {errors.link && touched.link && (
                <div className="input-feedback">{errors.link}</div>
                )}
                <Input 
                  fluid 
                  label={{ basic: 'true', color: 'blue', content: 'Page' }}
                  placeholder='If a weblink is provided, you can also provide a page number'
                  id='page'
                  type='text'
                  value={values.page}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.page && touched.page ? 'text-input error' : 'text-input' }
                />
                {errors.page && touched.page && (
                <div className="input-feedback">{errors.page}</div>
                )}
                <Input 
                  fluid 
                  label={{ basic: 'true', color: 'blue', content: 'Edit Note' }}
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
  graphql(addAffixMutation, { name: "addAffixMutation"})
  )(withRouter(AddAffix));
