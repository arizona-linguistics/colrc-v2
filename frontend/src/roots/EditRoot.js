import React, { Component } from 'react';
import queryString from 'query-string';
import { Form, Button, Icon } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose } from 'react-apollo';
import { updateRootMutation, getRootsQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class EditRoot extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
    // create a ref to store the textInput DOM element
    this.idInput = React.createRef();
		this.state = {
			fields: {
				id: "",
				root: "",
				number: "",
				salish: "",
				nicodemus: "",
				english: "",
				userId: "",
			},
			fieldErrors: {}
		};
  }

	componentDidMount() {
	  const values = queryString.parse(this.props.location.search);
		this.setState({
			fields: {
				id: values.id,
				root: values.root,
				number: values.number,
				salish: values.salish,
				nicodemus: values.nicodemus,
				english: values.english,
				prevId: values.prevId,
				userId: values.userId
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
			this.props.updateRootMutation({
				variables: {
					id: this.state.fields.id,
					root: this.state.fields.root,
					number: parseInt(this.state.fields.number, 10),
					salish: this.state.fields.salish,
					nicodemus: this.state.fields.nicodemus,
					english: this.state.fields.english,
					//prevId: parseInt(this.state.fields.prevId),
					userId: parseInt(this.state.fields.userId, 10),
				},
		      	refetchQueries: [{ query: getRootsQuery }]
			});
			this.props.history.push('/roots');
			//history.push('/rootdictionary');
		} catch (err) {
			console.log(err);
			this.props.history.push('/roots');
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
			<h3>Edit a Root</h3>
			<p>Change your root in wonderful ways.</p>
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
				<Form.Input fluid label="Root"
					placeholder='Root'
					name='root'
					value={this.state.fields.root}
					onChange={this.onInputChange}
				/>
				<span style={{ color: 'red' }}>{this.state.fieldErrors.root}</span>
				<Form.Input fluid label="Number"
					placeholder='Number'
					name='number'
					value={this.state.fields.number}
					onChange={this.onInputChange}
				/>
				<span style={{ color: 'red' }}>{this.state.fieldErrors.number}</span>
				<Form.Input fluid label="Salish"
					placeholder='Salish'
					name='salish'
					value={this.state.fields.salish}
					onChange={this.onInputChange}
				/>
				<span style={{ color: 'red' }}>{this.state.fieldErrors.salish}</span>
				<Form.Input fluid label="Nicodemus"
					placeholder='Nicodemus'
					name='nicodemus'
					value={this.state.fields.nicodemus}
					onChange={this.onInputChange}
				/>
				<span style={{ color: 'red' }}>{this.state.fieldErrors.nicodemus}</span>
				<Form.Input fluid label="English"
					placeholder='English'
					name='english'
					value={this.state.fields.english}
					onChange={this.onInputChange}
				/>
				<span style={{ color: 'red' }}>{this.state.fieldErrors.english}</span>
				<Form.Input fluid label="User ID"
					placeholder='Enter 1'
					name='userId'
					value={this.state.fields.userId}
					onChange={this.onInputChange}
				/>
				<span style={{ color: 'red' }}>{this.state.fieldErrors.userId}</span>
				</Form.Group>
	         	<Button basic color="blue" type='submit' icon size="mini" labelPosition="right">
	            	<Icon name='save' />
	            	Save Changes
	          	</Button>
			</Form>

			<h3>Virtual Keyboard</h3>
			<SimpleKeyboard / >
		</div>
		);
	}
};

export default compose(
	graphql(updateRootMutation, { name: 'updateRootMutation' })
)(withRouter(EditRoot));
