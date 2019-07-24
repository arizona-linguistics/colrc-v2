import React, { Component } from 'react';
import { Grid, Segment, Label } from 'semantic-ui-react';
import { Link } from "react-router-dom";

class MainMenu extends Component {
  render() {
    return (
    	<div className="ui grid" id="Banner">
	      	<Grid columns={3}>
	          	<Grid.Column verticalAlign='top' width={16}>
	            	<Segment>
		           		<Label as={Link} to="/" name="about" color='blue' ribbon>
		          			COLRC
		        		  </Label>
		        		  <span>Coeur d'Alene Online Language Resource Center</span>
	        		  </Segment>
	          	</Grid.Column>
	      	</Grid>
      </div>
    );
  }
}

export default MainMenu;
