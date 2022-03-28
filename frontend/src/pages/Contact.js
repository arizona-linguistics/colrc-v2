import React, { useState, useRef } from "react";
import emailjs from 'emailjs-com';
import { Grid, Segment, Button, Input, TextArea, Message } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import logoImg from "../img/logo.jpg";
import { Logo } from "../components/AuthForm";
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { useAuth } from "../context/auth";
import { isHuman } from "../queries/queries";
import ReCAPTCHA from "react-google-recaptcha";

function Contact() {
    const [isSent, setSent] = useState(false);
    const { authClient } = useAuth();
    const reRef = useRef();


    function sendEmail(values, setSubmitting) {

        emailjs.send('service_vo6cvb8', 'template_1vxc755', values, 'user_iJteqht7mTj2Ram41h2z3')
        .then((result) =>  {
            setSubmitting(false)
            setSent(true)
            broadCastSuccess(`Your email from ${values.user_name} was sent!`)
            
            console.log('SUCCESS!', result.text)

        }).catch((error) =>  {
            handleErrors(`Oh No!  Something went wrong!`) 
            setSubmitting(false)
            console.log('FAILED...', error.text);
        });
    }

    let contactSchema = Yup.object().shape({
        user_name: Yup.string()
          .required('Required'),
        user_email: Yup.string()
          .email('Please enter a valid email address')
          .required('Required'),
        message: Yup.string()
          .required('Required'),
      });

      if (isSent) {
        return <Redirect to="/" />;
      }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Logo src={logoImg} />
            <Message>
                Contact the COLRC Team with questions or concerns, or to reset your password.
            </Message>
            <Formik 
                initialValues={{ 
                user_email: '', 
                user_name: '',
                message: '', 
            }}
            validationSchema={contactSchema}
            onSubmit={async (values, { setSubmitting }) => {
                //call function to catchBots
                const token = await reRef.current.executeAsync();
                console.log(token)

                let valid = await authClient.query({
                    query: isHuman,
                    variables: {
                      token: token,
                    },
                    errorPolicy: 'all'
                  })
                if (valid) {
                    sendEmail(values, setSubmitting);
                } else {
                    handleErrors('bwahahahah Bot detected')
                }

              }} 
            >
            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
                <Form className="ui form"> 
                    <Segment>
                        <input type="hidden" name="contact_number" />
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            icon="user"
                            iconPosition="left"
                            name="user_name"
                            placeholder="Your name"
                            type="text"
                            value={ values.user_name }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.name && touched.name ? 'text-input error' : 'text-input'}
                        />
                        {errors.name && touched.name && ( <div className="input-feedback">{errors.name}</div>
                        )}
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            icon="mail"
                            iconPosition="left"
                            name="user_email"
                            id="user_email"
                            placeholder="Your email"
                            type="email"
                            value={ values.user_email }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.email && touched.email ? 'text-input error' : 'text-input'}
                        />
                        {errors.email && touched.email && ( <div className="input-feedback">{errors.email}</div>
                        )}
                        <TextArea
                            style={{ paddingBottom: '10px', paddingTop: '10px' }}
                            placeholder="Your message"
                            name="message"
                            id="message"
                            type="textarea"
                            value={ values.message }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.message && touched.message ? 'text-input error' : 'text-input'}
                        />
                        {errors.message && touched.message && ( <div className="input-feedback">{errors.message}</div>
                        )}
                        <ReCAPTCHA 
                            sitekey="6LctOA0aAAAAAGOiLvqyQzB2DeQcMXZyYriWL4LY"
                            size="invisible"
                            ref={reRef}
                        />
                    </Segment>
                    <Button 
                        color="blue" 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{ paddingTop: '5px' }}
                    >
                        Send
                    </Button>
                </Form>
                )}
            </Formik>
        </Grid.Column>
    </Grid>
    )
}

export default Contact