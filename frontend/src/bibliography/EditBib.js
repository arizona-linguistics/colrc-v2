import React, { Component } from 'react';
import queryString from 'query-string';
import { Button, Grid, Header, Message, Segment, Input, Label } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose, withApollo } from 'react-apollo';
import { updateBibliographyMutation, getBibliographiesQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class EditBib extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
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
				author: data.author,
				year: data.year,
				title: data.title,
				reference: data.reference,
				link: data.link,
				linktext: data.linktext,
			}
		});
		console.log("The id is: " + data.id)
	}

	onFormSubmit = async (values, setSubmitting) => {
		console.log(values)
    console.log(setSubmitting);
		try {
			await this.props.updateBibliographyMutation({
				variables: {
					id: values.id,
					author: values.author,
					year: values.year,
					title: values.title,
					reference: values.reference,
					link: values.link,
					linktext: values.linktext
				},
				refetchQueries: () => [{ query: getBibliographiesQuery, variables: {}, awaitRefetchQueries: true }],
				awaitRefetchQueries: true
			})
			.then(() => {
				setSubmitting(false)
        this.props.history.push('/bibliography');
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
    const bibliographySchema = Yup.object().shape({
			author: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			year: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			title: Yup.string()
				.min(1, 'at least 1 character is required')
				.required('a bibliography entry is required'),
			reference: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			link: Yup.string()
				.url('link must be a valid URL'),
			linktext: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
		});
		return (
			<Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Edit a Bibliography Entry
          </Header>
				<Message>
					Fill in the fields below to edit the selected bibliography entry.  When you save your edits, the old entry will be set to 'inactive' status and will no longer display.  The edited bibliography entry will display to users.
				</Message>
				{this.state.error && (
          <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment stacked>
						<Formik 
								initialValues={{ id: this.state.fields.id || '', author: this.state.fields.author || '', year: this.state.fields.year || '', title: this.state.fields.title || '', reference: this.state.fields.reference || '', link: this.state.fields.link || '', linktext: this.state.fields.linktext || ''}}
								validationSchema={bibliographySchema}
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
									label={{ basic: true, color: 'blue', content: 'Bibliography ID' }}
									placeholder='Current bibliography ID'
									id='id'
									type='text'
									disabled
									value={values.id}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<Input 
									fluid 
									label={{ basic: true, color: 'blue', content: 'Author' }}
									placeholder='Author name'
									id='author'
									type='text'
									value={values.author}
									onChange={handleChange}
									onBlur={handleBlur}
									className={ errors.author && touched.author ? 'text-input error' : 'text-input' }
								/>
								{errors.author && touched.author && (
								<div className="input-feedback">{errors.author}</div>
								)}
								<Input 
									fluid 
									label={{ basic: true, color: 'blue', content: 'Year' }}
									placeholder='Year of publication'
									id='year'
									type='text'
									value={values.year}
									onChange={handleChange}
									onBlur={handleBlur}
									className={ errors.year && touched.year ? 'text-input error' : 'text-input' }
								/>
								{errors.year && touched.year && (
								<div className="input-feedback">{errors.year}</div>
								)}
								<Input 
									fluid 
									label={{ color: 'blue', content: 'Title' }}
									placeholder='Title is required'
									id='title'
									type='text'
									value={values.title}
									onChange={handleChange}
									onBlur={handleBlur}
									className={ errors.title && touched.title ? 'text-input error' : 'text-input' }
								/>
								{errors.title && touched.title && (
								<div className="input-feedback">{errors.title}</div>
								)}
								<Input 
									fluid 
									label={{ basic: true, color: 'blue', content: 'Reference' }}
									placeholder='Description'
									id='reference'
									type='text'
									value={values.reference}
									onChange={handleChange}
									onBlur={handleBlur}
									className={ errors.reference && touched.reference ? 'text-input error' : 'text-input' }
								/>
								{errors.reference && touched.reference && (
								<div className="input-feedback">{errors.reference}</div>
								)}
								<Input 
									fluid 
									label={{ basic: true, color: 'blue', content: 'Link' }}
									placeholder='Web link'
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
									label={{ basic: true, color: 'blue', content: 'Linktext' }}
									placeholder='Text for link'
									id='linktext'
									type='text'
									value={values.linktext}
									onChange={handleChange}
									onBlur={handleBlur}
									className={ errors.linktext && touched.linktext ? 'text-input error' : 'text-input' }
								/>
								{errors.linktext && touched.linktext && (
								<div className="input-feedback">{errors.linktext}</div>
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
	graphql(getBibliographiesQuery, { name: 'getBibliographiesQuery' }),
	graphql(updateBibliographyMutation, { name: 'updateBibliographyMutation', options: {refetchQueries: [ 'getBibliographiesQuery'], awaitRefetchQueries: true} })
)(withRouter(withApollo(EditBib)));