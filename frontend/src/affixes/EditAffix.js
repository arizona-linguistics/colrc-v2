import React, { Component } from 'react';
import queryString from 'query-string';
import { Form, Button, Icon } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { graphql, compose, withApollo } from 'react-apollo';
import { updateAffixMutation, getAffixesQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';
//import ApolloClient from 'apollo-boost';

class EditAffix extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
    // create a ref to store the textInput DOM element
    this.idInput = React.createRef();
		this.state = {
			fields: {
			  id: "",
	      type: "",
	      salish: "",
	      nicodemus: "",
	      english: "",
	      link: "",
	      page: "",
	      userId: ""
			},
			fieldErrors: {},
			client: ""
		};
  }

	componentDidMount() {
	  const values = queryString.parse(this.props.location.search);
		this.setState({
			fields: {
				id: values.id,
				type: values.type,
				salish: values.salish,
				nicodemus: values.nicodemus,
				english: values.english,
				link: values.link,
				page: values.page,
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
			this.props.updateAffixMutation({
				variables: {
					id: this.state.fields.id,
					type: this.state.fields.type,
					salish: this.state.fields.salish,
					nicodemus: this.state.fields.nicodemus,
					english: this.state.fields.english,
					link: this.state.fields.link,
					page: this.state.fields.page,
					userId: parseInt(this.state.fields.userId, 10),
				},
				refetchQueries: () => [{ query: getAffixesQuery, variables: {}, awaitRefetchQueries: true }],
				awaitRefetchQueries: true
			})
			// .then(() => {
			// 	this.props.getAffixesQuery.affixes = this.props.client.query({
			// 		query: getAffixesQuery
			// 	});
			// })
			.then(() => {
				this.props.history.push('/affixes');
			});
			//this.props.history.push('/affixes');
			//history.push('/rootdictionary');
		} catch (err) {
			console.log(err);
			this.props.history.push('/affixes');
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
				<h3>Edit an Affix</h3>
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
								<span style={{ color: 'red' }}>{this.state.fieldErrors.id}</span>
							<Form.Input fluid label="Type"
								placeholder='Type'
								name='type'
								value={this.state.fields.type}
								onChange={this.onInputChange}
								/>
								<span style={{ color: 'red' }}>{this.state.fieldErrors.type}</span>
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
							<Form.Input fluid label="Link"
								placeholder='Link'
								name='link'
								value={this.state.fields.link}
								onChange={this.onInputChange}
							/>
							<span style={{ color: 'red' }}>{this.state.fieldErrors.link}</span>
							<Form.Input fluid label="Page"
								placeholder='Page'
								name='page'
								value={this.state.fields.page}
								onChange={this.onInputChange}
							/>
							<span style={{ color: 'red' }}>{this.state.fieldErrors.page}</span>
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
				<SimpleKeyboard / >
			</div>
		);
	}
};

export default compose(
	graphql(getAffixesQuery, { name: 'getAffixesQuery' }),
	graphql(updateAffixMutation, { name: 'updateAffixMutation', options: {refetchQueries: [ 'getAffixesQuery'], awaitRefetchQueries: true} })
)(withRouter(withApollo(EditAffix)));
