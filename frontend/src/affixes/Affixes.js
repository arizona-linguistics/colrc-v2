import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import AffixesAccordion from "../accordions/AffixesAccordion";
import AffixList from "./AffixList";
import AffixMetadata from "./AffixMetadata";


class Affixes extends Component {
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
			currentItem = <AffixList affixState={this.props.affixState} changeAffixState={this.props.changeAffixState} admin={this.props.admin}/>;
		}
		else {
			currentItem = <AffixMetadata />;
		};
		return (
			<div className='ui content'>
				<Menu size='mini'>
					<Menu.Item 
						name='list'
						active={activeItem === 'list'}
						onClick={this.handleItemClick}>
						Affix List
					</Menu.Item>
					<Menu.Item 
						name='metadata'
						active={activeItem === 'metadata'}
						onClick={this.handleItemClick}>
						Metadata
					</Menu.Item>
				</Menu>
				<p></p>
				<AffixesAccordion />
				<p></p>
				{currentItem}
			</div>
			);
		}
	}

export default Affixes;
