import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import RootsAccordion from "../accordions/RootsAccordion";
import RootsDictionary from "./RootsDictionary";
import RootsHistory from "./RootsHistory";
import RootsMetadata from "./RootsMetadata";

class Roots extends Component {
	_iMounted = false

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

	render() {
		const { activeItem } = this.state;

		let currentItem;
		if (this.state.activeItem === "dictionary") {
			currentItem = <RootsDictionary rootState={this.props.rootState} changeRootState={this.props.changeRootState} admin={this.props.admin}/>;
		}
		else if (this.state.activeItem === "history") {
		currentItem = <RootsHistory />;
		}
		else {
			currentItem = <RootsMetadata />;
		};
		return (
			<div className='ui content'>
				<Menu size='mini'>
					<Menu.Item
						name='dictionary'
						active={activeItem === 'dictionary'}
						onClick={this.handleItemClick}>
						Dictionary
					</Menu.Item>
					<Menu.Item
						name='history'
						active={activeItem === 'history'}
						onClick={this.handleItemClick}>
						History
					</Menu.Item>
					<Menu.Item
						name='metadata'
						active={activeItem === 'metadata'}
						onClick={this.handleItemClick}>
						Metadata
					</Menu.Item>
				</Menu>
				<p></p>
				<RootsAccordion />
				<p></p>
				{currentItem}
			</div>
		);
	}
}

export default Roots;
