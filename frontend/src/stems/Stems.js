import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import StemsAccordion from '../accordions/StemsAccordion';
import StemList from "./StemList";
import StemsMetadata from "./StemsMetadata";

class Stems extends Component {
	_isMounted = false

	constructor(props) {
	  super(props);
		this.state = {
			activeItem: 'list',
		};
		this.handleItemClick = this.handleItemClick.bind(this);
	};
		
	componentDidMount() {
		this._isMounted = true
	}

	handleItemClick = (e, { name }) => {
    if (this._isMounted) {
      this.setState({ activeItem: name })
    }
  }
  
  componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const { activeItem } = this.state;	
		let currentItem; 
		if (this.state.activeItem === "list") {
			currentItem = <StemList stemState={this.props.stemState} changeStemState={this.props.changeStemState} admin={this.props.admin}/>;
		}
		else {
			currentItem = <StemsMetadata />;
		};
		return (
			<div className='ui content'>
				<Menu size='mini'>
					<Menu.Item 
						name='list'
						active={activeItem === 'list'}
						onClick={this.handleItemClick}>
							Stem List
					</Menu.Item>
					<Menu.Item 
						name='metadata'
						active={activeItem === 'metadata'}
						onClick={this.handleItemClick}>
							Metadata
					</Menu.Item>
				</Menu>
				<StemsAccordion />
					<p></p>
					{currentItem}
				</div>
			);
		}
	}

export default Stems;
