import React, { Component } from 'react';
import { Button, Grid, Header, Message, Segment, Input } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withApollo, graphql, compose } from 'react-apollo';
import { updateUserMutation, getUserFromToken } from '../queries/queries';
import { withRouter } from 'react-router-dom';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      fields: {
        first: '',
        last: '',
        email: '',
        username: '',
        password: '',
        roles: []
      }
    };
  }

  async componentDidMount() {
    try {
      let userQuery = await this.props.client.query({
        query: getUserFromToken,
      })
      const user = userQuery.data.getUserFromToken_Q
      this.setState({
        fields: {
          first: user.first,
          last: user.last,
          email: user.email,
          username: user.username,
          password: user.password
        }
      }) 
      console.log(user)
      console.log(this.state)
    } catch(error) {
      console.log(error)
    }
  } 

  onFormSubmit = async (values, setSubmitting) => {
    console.log("In updateUser submission");
    console.log(values)
    console.log(setSubmitting)
    console.log(this.state.fields.password)
    try {
      console.log({
        first: values.first,
        last: values.last,
        username: values.username,
        email: values.email,
        password: this.state.fields.password
      })
      await this.props.updateUserMutation({
        variables: {
          first: values.first,
          last: values.last,
          username: values.username,
          email: values.email,
          password: this.state.fields.password
        },
      })
      setSubmitting(false)
    } catch (err) {
      console.log(err);
    }
  };
  
  render() {
    const { first, last, username, email, password } = this.state.fields
    console.log("this.state.fields is")
    console.log(this.state.fields)
    const updateUserSchema = Yup.object().shape({
      first: Yup.string()
        .required('Required'),
      last: Yup.string()
        .required('Required'),
      username: Yup.string()
        .required('Required'),
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Required')
      })
  
    return (     
      <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h3'  textAlign='center'>
              Update Your Profile
          </Header>
          <Message>
          Use this form to change your account information.  
          </Message>
          <Segment stacked >
            <Formik
              initialValues={{first: this.state.fields.first || '', last: this.state.fields.last || '', username: this.state.fields.username || '', email: this.state.fields.email || ''}}
              validationSchema={updateUserSchema}
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
                  label={{ basic: true, color: 'blue', content: 'First Name' }}
                  id="first"
                  placeholder="First Name"
                  type="text"
                  value={ values.first }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.first && touched.first ? 'text-input error' : 'text-input' }
                />
                {errors.first && touched.first &&(
                  <div className="input-feedback">{errors.first}</div>
                )}
                <Input
                  fluid
                  label={{ basic: true, color: 'blue', content: 'Last Name' }}
                  id="last"
                  placeholder="Last Name"
                  type="text"
                  value={ values.last }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.last && touched.last ? 'text-input error' : 'text-input' }
                />
                {errors.last && touched.last &&(
                <div className="input-feedback">{errors.last}</div>
                )}
                <Input
                  fluid
                  label={{ basic: true, color: 'blue', content: 'Username' }}
                  id="username"
                  placeholder="Username"
                  type="text"
                  value={ values.username }
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  className={ errors.username && touched.username ? 'text-input error' : 'text-input' }
                />
                {errors.username && touched.username &&(
                <div className="input-feedback">{errors.username}</div>
                )}                                    
              <Input
                fluid
                label={{ basic: true, color: 'blue', content: 'Email' }}
                id="email"
                placeholder="email"
                type="text"
                value={ values.email }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.email && touched.email ? 'text-input error' : 'text-input'}
              />
                {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
                )}
                <Button color="blue" size='large' type="submit" disabled={isSubmitting}>
                    Submit Changes
                </Button>
            </Form>
          )}
        />
      </Segment>
      </Grid.Column>
    </Grid>
   );
  }
}

export default compose(
  withApollo,
  graphql(updateUserMutation, { name: "updateUserMutation"}), 
  graphql(getUserFromToken, { name: "getUserFromToken"})
)(withRouter(UserProfile));

