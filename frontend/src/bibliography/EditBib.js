import React, { Component } from 'react';
import queryString from 'query-string';
import { Form, Button, Icon } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class EditBib extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
    // create a ref to store the textInput DOM element
    this.idInput = React.createRef();
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

	componentDidMount() {
	  const values = queryString.parse(this.props.location.search);
		this.setState({
			fields: {
				id: values.id,
				author: values.author,
				year: values.year,
				title: values.title,
				reference: values.reference,
				link: values.link,
				linktext: values.linktext
			}
		}, () => {
			//this.idInput.current.value = values.id;
			console.log("The current Id: " + values.id);
			//this.forceUpdate();
		});
	}

	onFormSubmit = async (evt) => {
		evt.preventDefault();
		console.log("In form submission");
		try {
			const { id, author, year, title, reference, link, linktext } = this.state.fields;
			const body = {
				id: id,
				author: author,
				year: year,
				title: title,
				reference: reference,
				link: link,
				linktext: linktext
			};
			const path = 'http://localhost:4000/bibliography/' + id;
			const headers = {
				'Content-Type': 'application/json;charset=UTF-8',
	      "Access-Control-Allow-Origin": "*"
			};
			const response = await axios.put(path, body, {headers});
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
				<h3>Edit a Bibliography Entry</h3>
				<p>Click submit to edit!</p>
				<div>
					<Form onSubmit={this.onFormSubmit}>
						<Form.Group widths='equal'>
						<Form.Input fluid label="Id"
							placeholder='Id'
							name='id'
							value={this.state.fields.id}
							onChange={this.onInputChange}
							ref={this.idInput}
						/>
						<span style={{ color: 'red' }}>{this.state.fieldErrors.id}</span>
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

export default withRouter(EditBib);
