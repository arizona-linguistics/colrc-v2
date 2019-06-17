import React, { Component } from 'react';
import axios from 'axios';
import { Form,  Button, Icon } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { withRouter } from 'react-router-dom';

class AddBib extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
    // create a ref to store the textInput DOM element
		this.state = {
			fields: {
				author: "",
				year: "",
				title: "",
				reference: "",
				link: "",
				linktext: "",
			},
			fieldErrors: {}
		};
  }

	onFormSubmit = async (evt) => {
		evt.preventDefault();
		console.log("In add form submission");
		try {
			const { id, author, year, title, reference, link, linktext } = this.state.fields;
			const body = {
				author: author,
				year: year,
				title: title,
				reference: reference,
				link: link,
				linktext: linktext
			};
			const path = 'http://localhost:4000/bibliography';
			const headers = {
				'Content-Type': 'application/json;charset=UTF-8',
	      "Access-Control-Allow-Origin": "*"
			};
			const response = await axios.post(path, body, {headers});
			console.log(response);
			this.props.history.push('/bibliography');
			//history.push('/rootdictionary');
		} catch (err) {
			console.log(err);
			this.props.history.push('/bibliography');
		}
	};

	onInputChange = (evt) => {
		console.log("Change event called on " + evt.target.value);
		const fields = Object.assign({}, this.state.fields);
		fields[evt.target.name] = evt.target.value;
		this.setState({ fields });
	};

	render() {
		return (
			<div>
				<h3>Add a Bibliography Entry</h3>
				<p>
					Fill in the fields below to add a new entry.
				</p>

				<div>
					<Form onSubmit={this.onFormSubmit}>
						<Form.Group widths='equal'>
						<Form.Input fluid label="Author"
							placeholder='Author'
							name='author'
							value={this.state.fields.author}
							onChange={this.onInputChange}
						/>
						<span style={{ color: 'red' }}>{this.state.fieldErrors.author}</span>
						<Form.Input fluid label="Year"
							placeholder='Year'
							name='year'
							value={this.state.fields.year}
							onChange={this.onInputChange}
						/>
						<span style={{ color: 'red' }}>{this.state.fieldErrors.year}</span>
						<Form.Input fluid label="Title"
							placeholder='Title'
							name='title'
							value={this.state.fields.title}
							onChange={this.onInputChange}
						/>
						<span style={{ color: 'red' }}>{this.state.fieldErrors.title}</span>
						<Form.Input fluid label="Reference"
							placeholder='Reference'
							name='reference'
							value={this.state.fields.reference}
							onChange={this.onInputChange}
						/>
						<span style={{ color: 'red' }}>{this.state.fieldErrors.reference}</span>
						<Form.Input fluid label="Link"
							placeholder='Link'
							name='link'
							value={this.state.fields.link}
							onChange={this.onInputChange}
						/>
						<span style={{ color: 'red' }}>{this.state.fieldErrors.link}</span>
						<Form.Input fluid label="LinkText"
							placeholder='LinkText'
							name='linktext'
							value={this.state.fields.linktext}
							onChange={this.onInputChange}
						/>
						<span style={{ color: 'red' }}>{this.state.fieldErrors.linktext}</span>
						</Form.Group>
			         	<Button basic color="blue" type='submit' icon size="mini" labelPosition="right">
			            	<Icon name='save' />
			            	Save Changes
			          	</Button>
					</Form>
				</div>
				<h3>Virtual Keyboard</h3>
				<SimpleKeyboard / >
			</div>
		);
	}
};

export default withRouter(AddBib);
