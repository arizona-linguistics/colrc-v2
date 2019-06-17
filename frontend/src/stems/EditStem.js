import React, { Component } from 'react';
import queryString from 'query-string';
import { Form, Button, Icon } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose } from 'react-apollo';
import { updateStemMutation, getStemsQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class EditStem extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
    // create a ref to store the textInput DOM element
    this.idInput = React.createRef();
		this.state = {
			fields: {
				id: "",
	      		category: "",
	      		reichard: "",
	      		doak: "",
	      		salish: "",
	      		nicodemus: "",
	      		english: "",
						note: "",
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
				category: values.category,
				reichard: values.reichard,
				doak: values.doak,
				salish: values.salish,
				nicodemus: values.nicodemus,
				english: values.english,
				note: values.note,
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
			this.props.updateStemMutation({
				variables: {
					id: this.state.fields.id,
					category: this.state.fields.category,
					reichard: this.state.fields.reichard,
					doak: this.state.fields.doak,
					salish: this.state.fields.salish,
					nicodemus: this.state.fields.nicodemus,
					english: this.state.fields.english,
					note: this.state.fields.note,
					userId: parseInt(this.state.fields.userId, 10),
				},
		      	refetchQueries: [{ query: getStemsQuery }]
			});
			this.props.history.push('/stems');
			//history.push('/rootdictionary');
		} catch (err) {
			console.log(err);
			this.props.history.push('/stems');
		};
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
				<h3>Edit a Stem</h3>
				<p>Do neat things.</p>
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
						<Form.Input fluid label="Category"
						placeholder='Category'
						name='category'
						value={this.state.fields.category}
						onChange={this.onInputChange}
					/>
					<span style={{ color: 'red' }}>{this.state.fieldErrors.category}</span>
						<Form.Input fluid label="Reichard"
						placeholder='Reichard'
						name='reichard'
						value={this.state.fields.reichard}
						onChange={this.onInputChange}
					/>
					<span style={{ color: 'red' }}>{this.state.fieldErrors.reichard}</span>
					<Form.Input fluid label="Doak"
						placeholder='Doak'
						name='doak'
						value={this.state.fields.doak}
						onChange={this.onInputChange}
					/>
					<span style={{ color: 'red' }}>{this.state.fieldErrors.doak}</span>
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
					<Form.Input fluid label="Note"
						placeholder='Note'
						name='note'
						value={this.state.fields.note}
						onChange={this.onInputChange}
					/>
					<span style={{ color: 'red' }}>{this.state.fieldErrors.note}</span>


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
				</div>
				<h3>Virtual Keyboard</h3>
				<SimpleKeyboard />
			</div>
		);
	}
};

export default compose(
	graphql(updateStemMutation, { name: 'updateStemMutation' })
)(withRouter(EditStem));
