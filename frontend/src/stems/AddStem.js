import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import SimpleKeyboard from "../utilities/SimpleKeyboard";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { graphql, compose } from 'react-apollo';
import { addStemMutation, getStemsQuery } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class AddStem extends Component {

	constructor(props) {
    super(props);
		this.onSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
    // create a ref to store the textInput DOM element
		this.state = {
			fields: {
	      category: "",
	      reichard: "",
	      doak: "",
	      salish: "",
	      nicodemus: "",
	      english: "",
				note: "",
				prevId: "",
				userId: "",
			},
			fieldErrors: {}
		};
  }

	onFormSubmit = async (values) => {
		//evt.preventDefault();
		console.log("In add form submission");
		try {
		    this.props.addStemMutation({
		      variables: {
		        category: values.category,
		        reichard: values.reichard,
		        doak: values.doak,
		        salish: values.salish,
		        nicodemus: values.nicodemus,
		        english: values.english,
						note: values.note,
						userId: parseInt(values.userId, 10),
		      },
		      refetchQueries: [{ query: getStemsQuery }]
		    });
			this.props.history.push('/stems');
		} catch (err) {
			console.log(err);
			this.props.history.push('/stems');
		}
	};

	onInputChange = (evt) => {
		console.log("Change event called on " + evt.target.value);
		const fields = Object.assign({}, this.state.fields);
		fields[evt.target.name] = evt.target.value;
		this.setState({ fields });
	};

	render() {

	const addStemSchema = Yup.object().shape({
		category: Yup.string()
			.min(2, 'Too short!')
			.max(5, 'Too long!')
			.required('Required'),
		reichard: Yup.string()
			.min(1, 'too short')
			.required('Required'),
		nicodemus: Yup.string()
			.min(1, 'Write something!')
			.max(100, 'No novels!')
			.required('Required')
		});

		return (
			<div>
				<h3>Add a Stem</h3>
				<p>Fill in the fields below to add a new stem.</p>
			<div>

				<Formik
					initialValues={{ category: '', reichard: '', doak: '', salish: '', nicodemus: '', english: '', note: ''}}
				    validationSchema={addStemSchema}
					onSubmit={(values, { setSubmitting }) => {
						this.onFormSubmit(values);
			      	}}
				>

     			{({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
						<Form>
				            <Input
				              id="category"
				              placeholder="Category"
				              type="text"
				              value={values.category}
				              onChange={handleChange}
				              onBlur={handleBlur}
				              className={
				                errors.category && touched.category ? 'text-input error' : 'text-input'
				              }
				            />
				            {errors.category && touched.category && (
				            <div className="input-feedback">{errors.category}</div>
				            )}
				            <Input
				              id="reichard"
				              placeholder="Reichard"
				              type="text"
				              value={values.reichard}
				              onChange={handleChange}
				              onBlur={handleBlur}
				              className={
				                errors.reichard && touched.reichard ? 'text-input error' : 'text-input'
				              }
				            />
				            {errors.reichard && touched.reichard && (
				            <div className="input-feedback">{errors.reichard}</div>
				            )}
				            <Input
				              id="doak"
				              placeholder="Doak"
				              type="text"
				              value={values.doak}
				              onChange={handleChange}
				              onBlur={handleBlur}
				              className={
				                errors.doak && touched.doak ? 'text-input error' : 'text-input'
				              }
				            />
				            {errors.doak && touched.doak && (
				            <div className="input-feedback">{errors.doak}</div>
				            )}
				            <Input
				              id="salish"
				              placeholder="Salish"
				              type="text"
				              value={values.salish}
				              onChange={handleChange}
				              onBlur={handleBlur}
				              className={
				                errors.salish && touched.salish ? 'text-input error' : 'text-input'
				              }
				            />
				            {errors.salish && touched.salish && (
				            <div className="input-feedback">{errors.salish}</div>
				            )}
				            <Input
				              id="nicodemus"
				              placeholder="Nicodemus"
				              type="text"
				              value={values.nicodemus}
				              onChange={handleChange}
				              onBlur={handleBlur}
				              className={
				                errors.nicodemus && touched.nicodemus ? 'text-input error' : 'text-input'
				              }
				            />
				            {errors.nicodemus && touched.nicodemus && (
				            <div className="input-feedback">{errors.reichard}</div>
				            )}
				            <Input
				              id="english"
				              placeholder="English"
				              type="text"
				              value={values.english}
				              onChange={handleChange}
				              onBlur={handleBlur}
				              className={
				                errors.english && touched.english ? 'text-input error' : 'text-input'
				              }
				            />
				            {errors.english && touched.english && (
				            <div className="input-feedback">{errors.english}</div>
				            )}
				            <Input
				              id="note"
				              placeholder="Note"
				              type="text"
				              value={values.note}
				              onChange={handleChange}
				              onBlur={handleBlur}
				              className={
				                errors.note && touched.note ? 'text-input error' : 'text-input'
					  					}
				            />
				            {errors.note && touched.note && (
				            <div className="input-feedback">{errors.note}</div>
									 	)}
										<Input
										id="userId"
										placeholder="Enter 1"
										type="text"
										value={values.userId}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.userId && touched.userId ? 'text-input error' : 'text-input'
										}
									/>
									{errors.userId && touched.userId && (
									<div className="input-feedback">{errors.userId}</div>

				            )}
					        <button type="submit" disabled={isSubmitting}>
					            Submit
					        </button>
						</Form>
						)}
					</Formik>
				</div>
				<h3>Virtual Keyboard</h3>
				<SimpleKeyboard />
			</div>
		);
	}
};

export default compose(
  graphql(addStemMutation, { name: "addStemMutation"}),)
(withRouter(AddStem));
