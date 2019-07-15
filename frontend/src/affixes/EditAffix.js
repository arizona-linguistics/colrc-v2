import React, { Component } from 'react';
import queryString from 'query-string';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
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
			this.props.updateAffixMutation({
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
		} catch (err) {
			console.log(err);
			this.props.history.push('/affixes');
		}
	};

	render() {
    const { id, type, salish, nicodemus, english, link, page, editnote } = this.state.fields
    console.log("this.state.fields is")
    console.log(this.state.fields)
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
                  placeholder='The ID of the affix you are editing'
                  id='id'
                  type='text'
                  disabled
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.type && touched.type ? 'text-input error' : 'text-input' }
                />
                <Input 
                  fluid 
                  label={{ basic: true, color: 'blue', content: 'Type' }}
                  placeholder='Affix type is optional...'
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
                  placeholder='Salish transcription is optional'
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
                  placeholder='If a weblink is provided, a page number should be included too'
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
                  label={{ color: 'blue', content: 'Edit Note' }}
                  placeholder='Please provide an editorial note.  Editorial notes do not display to users'
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

// 			<div>
// 				<h3>Edit an Affix</h3>
// 				<p>Do neat things.</p>
// 				<div>
// 					<Form onSubmit={this.onFormSubmit}>
// 						<Form.Group widths='equal'>
// 							<Form.Input fluid label="Id"
// 								placeholder='Id'
// 								name='id'
// 								value={this.state.fields.id}
// 								onChange={this.onInputChange}
// 								ref={this.idInput}
// 								/>
// 								<span style={{ color: 'red' }}>{this.state.fieldErrors.id}</span>
// 							<Form.Input fluid label="Type"
// 								placeholder='Type'
// 								name='type'
// 								value={this.state.fields.type}
// 								onChange={this.onInputChange}
// 								/>
// 								<span style={{ color: 'red' }}>{this.state.fieldErrors.type}</span>
// 							<Form.Input fluid label="Salish"
// 								placeholder='Salish'
// 								name='salish'
// 								value={this.state.fields.salish}
// 								onChange={this.onInputChange}
// 							/>
// 							<span style={{ color: 'red' }}>{this.state.fieldErrors.salish}</span>
// 							<Form.Input fluid label="Nicodemus"
// 								placeholder='Nicodemus'
// 								name='nicodemus'
// 								value={this.state.fields.nicodemus}
// 								onChange={this.onInputChange}
// 							/>
// 							<span style={{ color: 'red' }}>{this.state.fieldErrors.nicodemus}</span>
// 							<Form.Input fluid label="English"
// 								placeholder='English'
// 								name='english'
// 								value={this.state.fields.english}
// 								onChange={this.onInputChange}
// 							/>
// 							<span style={{ color: 'red' }}>{this.state.fieldErrors.english}</span>
// 							<Form.Input fluid label="Link"
// 								placeholder='Link'
// 								name='link'
// 								value={this.state.fields.link}
// 								onChange={this.onInputChange}
// 							/>
// 							<span style={{ color: 'red' }}>{this.state.fieldErrors.link}</span>
// 							<Form.Input fluid label="Page"
// 								placeholder='Page'
// 								name='page'
// 								value={this.state.fields.page}
// 								onChange={this.onInputChange}
// 							/>
// 							<span style={{ color: 'red' }}>{this.state.fieldErrors.page}</span>
// 							<Form.Input fluid label="User ID"
// 								placeholder='Enter 1'
// 								name='userId'
// 								value={this.state.fields.userId}
// 								onChange={this.onInputChange}
// 							/>
// 							<span style={{ color: 'red' }}>{this.state.fieldErrors.userId}</span>
// 						</Form.Group>
// 	         	<Button basic color="blue" type='submit' icon size="mini" labelPosition="right">
// 	            <Icon name='save' />
// 	            	Save Changes
// 	          </Button>
// 					</Form>
// 				</div>
// 				<h3>Virtual Keyboard</h3>
// 				<SimpleKeyboard / >
// 			</div>
// 		);
// 	}
// };

export default compose(
	graphql(getAffixesQuery, { name: 'getAffixesQuery' }),
	graphql(updateAffixMutation, { name: 'updateAffixMutation', options: {refetchQueries: [ 'getAffixesQuery'], awaitRefetchQueries: true} })
)(withRouter(withApollo(EditAffix)));
