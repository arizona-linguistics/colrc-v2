import React from "react";
import HomeAccordion from './accordions/HomeAccordion';
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Grid, Message } from 'semantic-ui-react';
import { Logo } from "../components/AuthForm";
import logoImg from "../img/logo.jpg";
 

function Home(props) {
	const { user } = useAuth();
	
	if (user) {
  		return (
			<React.Fragment>
				<Grid textAlign='center'>
					<Grid.Column style={{ maxWidth: 450 }}>
						<Grid.Row>
		  					<Message>Welcome to the COLRC!  You are currently signed in as {user.first} {user.last}</Message>
						</Grid.Row>
						<Grid.Row>
							<Logo src={logoImg} />
						</Grid.Row>
						<Grid.Row>
							<HomeAccordion />
						</Grid.Row>
					</Grid.Column>
				</Grid>
			</React.Fragment>
		  );		
	}
  	return (
	  <React.Fragment>
		<Grid textAlign='center'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Message>Welcome to the COLRC!</Message>  
				<Logo src={logoImg} />
				<HomeAccordion />
				<Message>Are you a site administrator? <Link to="/login">Log in here</Link></Message>
			</Grid.Column>
		</Grid>
	  </React.Fragment>
	  );
}

export default Home;