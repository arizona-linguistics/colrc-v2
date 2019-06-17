import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';

class ContactUs extends Component {
	constructor(props) {
    super(props);
      this.onInputChange = this.onInputChange.bind(this);
      this.state = {
        fields: {
          comment: "",
          first: "",
          last: "",
          email: "",
        },
        fieldErrors: {}
      };
    }

//	onFormSubmit = async (values) => {
	//	evt.preventDefault();
   // }
		
	onInputChange = (evt) => {
		console.log("Change event called on " + evt.target.value);
		const fields = Object.assign({}, this.state.fields);
		fields[evt.target.name] = evt.target.value;
		this.setState({ fields });
	};

	render() {

	const contactFormSchema = Yup.object().shape({
		first: Yup.string()
			.required('Required'),
		last: Yup.string()
			.required('Required'),
		email: Yup.string()
			.email('Please enter a valid email address')
			.required('a valid email address is required'),
    comment: Yup.string()
      .max(500, 'Your comment is too long, please let us know that we need to contact you to learn more')
      .required('Required')
		});

		return (
			<div>
				<h3>Contact Us</h3>
				<p>We want to hear from you!  Sadly, though, we can't yet because this page isn't fully developed.  Please feel free to contact Amy Fountain (avf@email.arizona.edu) directly, and I'll be happy to coordinate responses.</p>
        <p>Development team:  I did a little reading about form security and 'capctcha', and I think we should see if we can implment google recaptcha, maybe the invisible version (https://www.npmjs.com/package/react-google-recaptcha).  Here's a discussion about what's going on with form security...https://www.gravityforms.com/rip-captcha/.</p>
        <div>
        <h3>Test Form</h3>
    
				<Formik 
					initialValues={{ first: '', last: '', email: '', comment: ''}}
				  validationSchema={contactFormSchema}
					//onSubmit={(values, { setSubmitting }) => {this.onFormSubmit(values); }}
				>
     		{({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
					<Form>
            <Form.Group widths="equal">
              <Form.Input 
                label="First Name"
                id="first"
                placeholder="first name"
                type="text"
                value={values.first}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.first && touched.first ? 'text-input error' : 'text-input'
                }
              />
              {errors.first && touched.first && (
              <div className="input-feedback">{errors.first}</div>
              )}
              <Form.Input
                label="Last Name"
                id="last"
                placeholder="last name"
                type="text"
                value={values.last}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.last && touched.last ? 'text-input error' : 'text-input'
                }
              />
              {errors.last && touched.last && (
              <div className="input-feedback">{errors.last}</div>
              )}
              <Form.Input
                label="Email Address"
                id="email"
                placeholder="email address"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email ? 'text-input error' : 'text-input'
                }
              />
              {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
              )}
            </Form.Group>
            <Form.TextArea
              label="Comment"  
              id="comment"
              placeholder="Provide your question or comment here..."
              type="text"
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.comment && touched.comment ? 'text-input error' : 'text-input'
              }
            />
            {errors.comment && touched.comment && (
            <div className="input-feedback">{errors.comment}</div>
            )}
  	        <Button type="submit" disabled={isSubmitting}>
  	            Submit
  	        </Button>
					</Form>
						)}
					</Formik>
				</div>
			</div>
		);
	}
};

export default (withRouter(ContactUs));
