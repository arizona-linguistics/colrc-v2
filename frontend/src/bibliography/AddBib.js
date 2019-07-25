import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input, Label } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose } from 'react-apollo';
import { addBibliographyMutation, getBibliographiesQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';
import Bibliography from './Bibliography';

class AddBib extends Component {
	constructor(props) {
    super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
    // create a ref to store the textInput DOM element
		this.state = {}
  }

	onFormSubmit = async (values, setSubmitting) => {
		console.log("In add form submission")
    console.log(values)
    console.log(setSubmitting);
		try {
			await this.props.addBibliographyMutation({
				variables: {
					author: values.author,
					year: values.year,
					title: values.title,
					reference: values.reference,
					link: values.link,
					linktext: values.linktext
				},
			refetchQueries: [{ query: getBibliographiesQuery}]
			});	
			setSubmitting(false)
			this.props.history.push('/bibliography');
		} catch (result) {
			console.log(result.graphQLErrors[0].message);
			setSubmitting(false)
			this.setState({ error: result.graphQLErrors[0].message });
		}
	};

	render() {
		const bibliographySchema = Yup.object().shape({
			author: Yup.string()
				.max(150, 'cannot be more than 150 characters'),
			year: Yup.string()
				.max(150, 'cannot exceed 150 characters'),
			title: Yup.string()
				.min(1, 'at least 1 characters are required')
				.required('a title entry is required'),
			reference: Yup.string()
				.max(150, 'cannot exceed 150 characters'),
			link: Yup.string()
				.url('link must be a valid URL'),
			linktext: Yup.string()
				.max(150, 'cannot exceed 150 characters'),
		});

		return (
			<Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
          <Header as='h2'  textAlign='center'>
             Add a Bibliography Entry
          </Header>
          <Message>
            Fill in the fields below to add a new bibliography entry to the list.  Any new entry must include a title.  Other fields are optional. Links, when available, show the location of that publication.
          </Message>
          {this.state.error && (
          <Message className="error">Unsuccessful: {this.state.error}</Message>
          )}
          <Segment stacked>
          <Formik 
              initialValues={{ author: '', year: '', title: '', reference: '', link: '', linktext: ''}}
              validationSchema={bibliographySchema}
              onSubmit={(values, { setSubmitting }) => {
                this.onFormSubmit(values, setSubmitting);
              }}
          >
            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
    					<Form>
    						<Input 
                  fluid 
                  label={{ basic: true, color: 'blue', content: 'Author' }}
    							placeholder='Author Name'
    							id='author'
                  type='text'
    							value={values.author}
    							onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.type && touched.type ? 'text-input error' : 'text-input' }
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
                  placeholder='Required'
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
                  placeholder='Detail'
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
                  placeholder='Optional weblink'
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
                  placeholder='text for link'
                  id='linktext'
                  type='text'
                  value={values.linktext}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={ errors.linktext && touched.linktext ? 'text-input error' : 'text-input' }
                />
                {errors.page && touched.page && (
                <div className="input-feedback">{errors.page}</div>
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
				<SimpleKeyboard />
        </Segment>
        </Grid.Column>
			</Grid>
		);
	}
};

export default compose(
  graphql(addBibliographyMutation, { name: 'addBibliographyMutation' }),
  graphql(getBibliographiesQuery, { name: 'getBibliographiesQuery' })
)(withRouter(AddBib));
