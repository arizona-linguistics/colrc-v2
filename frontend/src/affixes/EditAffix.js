import React, { Component } from 'react';
import queryString from 'query-string';
import { Button, Grid, Header, Message, Segment, Input, Label } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose, withApollo } from 'react-apollo';
import { updateAffixMutation, getAffixesQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class EditAffix extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
    // create a ref to store the textInput DOM element
    this.idInput = React.createRef();
    this.state = { 
      fields: { }
    }
  }

	componentDidMount() {
	  const data = queryString.parse(this.props.location.search);
    console.log("these are the data")
    console.log(data)
		this.setState({
			fields: {
				id: data.id,
				type: data.type,
				salish: data.salish,
				nicodemus: data.nicodemus,
				english: data.english,
				link: data.link,
				page: data.page,
        editnote: data.editnote,
			}
		});
    console.log("The id is")
    console.log(data.id)
	}

	 onFormSubmit = async (values, setSubmitting) => {
    console.log("In edit form submission")
    console.log(values)
    console.log(setSubmitting);
		try {
			await this.props.updateAffixMutation({
				variables: {
					id: values.id,
					type: values.type,
					salish: values.salish,
					nicodemus: values.nicodemus,
					english: values.english,
					link: values.link,
					page: values.page,
          editnote: values.editnote
				},
				refetchQueries: () => [{ query: getAffixesQuery, variables: {}, awaitRefetchQueries: true }],
				awaitRefetchQueries: true
			})
			.then(() => {
				setSubmitting(false)
        this.props.history.push('/affixes');
			});
		} catch (result) {
      console.log(result.graphQLErrors[0].message);
      setSubmitting(false)
      this.setState({ error: result.graphQLErrors[0].message });
		}
	};

	render() {
    console.log("this.state.fields is")
    console.log(this.state.fields)
    const affixSchema = Yup.object().shape({
      type: Yup.string()
        .max(150, 'cannot be more than 150 characters'),
      salish: Yup.string()
        .max(150, 'cannot be more than 150 characters'),
      nicodemus: Yup.string()
        .min(1, 'at least 1 character is required')
        .required('an affix entry is required'),
      english: Yup.string()
        .min(1, 'at least 1 character is required')
        .required('an English translation is required'),
      link: Yup.string()
        .url('link must be a valid URL'),
      page: Yup.number()
        .integer('page must be a number'),
      editnote: Yup.string()
        .max(150, 'cannot be more than 150 characters')
        .required('an edit note is required'),
      });

		return (
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Edit an Affix
          </Header>
          <Message>
            Fill in the fields below to edit the selected affix.  When you save your edits, the old affix entry will be set to 'inactive' status and will no longer display.  The edited affix will display to users.  Please add an 'edit note' to briefly characterize the reason for the edit.  Edit notes do not display to users.
          </Message>
          {this.state.error && (
          <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment stacked>
            <Formik
              initialValues={{id: this.state.fields.id || '', type: this.state.fields.type || '', salish: this.state.fields.salish || '', nicodemus: this.state.fields.nicodemus || '', english: this.state.fields.english || '', link: this.state.fields.link || '', page: this.state.fields.page || '', editnote: this.state.fields.editnote || ''}}
              validationSchema={affixSchema}
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
                  label={{ basic: true, color: 'blue', content: 'Affix ID' }}
                  placeholder='Current affix ID'
                  id='id'
                  type='text'
                  disabled
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Label pointing>The ID of the affix you are editing.</Label>
                <Input 
                  fluid 
                  label={{ basic: true, color: 'blue', content: 'Type' }}
                  placeholder='Optional affix type'
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
                  label={{ basic: true, color: 'blue', content: 'Salish' }}
                  placeholder='Optional transcription'
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
                  placeholder='Required'
                  id='nicodemus'
                  type='text'
                  value={values.nicodemus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.nicodemus && touched.nicodemus ? 'text-input error' : 'text-input' }
                />
                <Label pointing>An entry for the affix using the Nicodemus orthography is required.</Label>
                {errors.nicodemus && touched.nicodemus && (
                <div className="input-feedback">{errors.nicodemus}</div>
                )}
                <Input 
                  fluid 
                  label={{ color: 'blue', content: 'English' }}
                  placeholder='English gloss'
                  id='english'
                  type='text'
                  value={values.english}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.english && touched.english ? 'text-input error' : 'text-input' }
                />
                <Label pointing>English gloss for the affix is required.</Label>
                {errors.english && touched.english && (
                <div className="input-feedback">{errors.english}</div>
                )}
                <Input 
                  fluid 
                  label={{ basic: true, color: 'blue', content: 'Link' }}
                  placeholder='Weblink is optional'
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
                  label={{ basic: true, color: 'blue', content: 'Page' }}
                  placeholder='For weblink'
                  id='page'
                  type='text'
                  value={values.page}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.page && touched.page ? 'text-input error' : 'text-input' }
                />
                <Label pointing>If a weblink is provided, a page number should be included too.</Label>
                {errors.page && touched.page && (
                <div className="input-feedback">{errors.page}</div>
                )}
                <Input 
                  fluid 
                  label={{ color: 'blue', content: 'Edit Note' }}
                  placeholder='Required edit'
                  id='editnote'
                  type='text'
                  value={values.editnote}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.editnote && touched.editnote ? 'text-input error' : 'text-input' }
                />
                <Label pointing>Please provide an editorial note. Editorial notes do not display to users.</Label>
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
        <SimpleKeyboard />
        </Segment>
        </Grid.Column>
      </Grid>
    );
  }
};

export default compose(
	graphql(getAffixesQuery, { name: 'getAffixesQuery' }),
	graphql(updateAffixMutation, { name: 'updateAffixMutation', options: {refetchQueries: [ 'getAffixesQuery'], awaitRefetchQueries: true} })
)(withRouter(withApollo(EditAffix)));
