import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

const Field = require('./ContactUs-field.js');


const content = document.createElement('div');
document.body.appendChild(content);

class ContactUs extends Component {
	static displayName = 'Contact Us';

	state = {
		fields: {
			name: '',
			email: '',
			message: ''
		},
		fieldErrors: {},
		people: []  //<-- initial state
	};

	onFormSubmit = evt => {
		const people = [...this.state.people];
		const person = this.state.fields;

		evt.preventDefault();


		if (this.validate()) return; 

		this.setState({
			 people: people.concat(person), 
			 fields:  {
				name: '',
				email: '',
				message: ''
			}
		});
	};

	onInputChange = ({name, value, error}) => {
		const fields = Object.assign({}, this.state.fields);
		const fieldErrors = Object.assign({}, this.state.fieldErrors);
		
		fields[name] = value;
		fieldErrors[name] = error;

		this.setState({fields, fieldErrors});
	};

	validate = () => {
		const person = this.state.fields;
    	const fieldErrors = this.state.fieldErrors;
    	const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

		if (!person.name) return true;
		if (!person.email)return true;
		if (!person.message) return true;
		if (errMessages.length) return true;
		
		return false;
	};

	render() {
		return (
			<div>
				<h3>Contact Us</h3>
				<p>
				If you would like to help or have questions, comments or suggestions,
				contact us using the "Contact Us" link on the left menu, or by emailing us directly
				at: <b>crd [dot] archive [at] gmail [dot] com</b>.
				</p>

				<div>
					<form onSubmit={this.onFormSubmit}>
						<h5>Name: </h5>
						<Field
            				placeholder="Name"
            				name="name"
            				value={this.state.fields.name}
            				onChange={this.onInputChange}
            				validate={val => (val ? false : 'Name Required')}
      					/>
						<br />

						<h5>Email:</h5>
						<Field
           					placeholder="Email"
            				name="email"
            				value={this.state.fields.email}
            				onChange={this.onInputChange}
            				validate={val => (isEmail(val) ? false : 'Invalid Email')}
          				/>
						<br />
						
						<h5>Message:</h5>
						<Field
            				placeholder="Message"
            				name="message"
            				value={this.state.fields.email}
            				onChange={this.onInputChange}
            				validate={val => (isEmail(val) ? false : 'Invalid Email')}
          				/>
		  				
						<br />

						<input type="submit" disabled={this.validate()} />
        			</form>
					<br />

					<div>
						<h5>Your Submitted Information:</h5>
						<ul>
							{ this.state.people.map(({ name, email, message}, i) => (
								<li key={i}>
									{name} ({ email }) { message }
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
};

export default ContactUs;
