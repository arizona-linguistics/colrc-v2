import React, { Component } from 'react';
import { Input, Button, Icon, Form, Grid } from 'semantic-ui-react';

class CharPicker extends Component {

constructor(props) {
    super(props);
    this.state = {currentChar:"", currentText:""};
	this.handleItemClick = this.handleItemClick.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.typeLetter = this.typeLetter.bind(this);
	};

handleItemClick = (e, { name }) => this.setState({ activeItem: name });

handleChange = (e) => { 
	console.log("e.target.value=" + e.target.value);
	this.setState({currentText: e.target.value});
	e.target.focus();
};

typeLetter = (e) => {
	/*box.value = box.value + char;*/
	e.preventDefault();
	console.log("current char=" + e.target.name);
	const text = this.state.currentText + e.target.name;
	this.setState({currentText:text});
};

render() {
	function validateForm(form){
		var txtbox = form.tosearch;
		var radios = form.type;
		var result1 = validateTextBox(txtbox);
		return result1;
	}
	function validateTextBox(txtbox){
		if(txtbox.value.match(/^(\s)*$/)){
			alert("Enter text in the textbox");
			return false;
		}
		return true;
	}

	const CharInput = () => (
		/*<form action="../scripts/search_all.php"  name="search_dict" id="search_dict" method="POST">*/
		<Form>
			<span className="charPicker">
			<p>Click to type special characters, then copy and paste into a search or filter box:</p> 
			<Input autoFocus onChange={this.handleChange} value={this.state.currentText} label="character palette" size="mini" name="char_palette" id = "char_palette" key="char_palette" />
				<p>
				<a onClick={this.typeLetter} name="∤" className="letter"> ∤</a> - 
				<a onClick={this.typeLetter} name="ɫ" className="letter"> ɫ</a> -
				<a onClick={this.typeLetter} name="č" className="letter"> č</a> - 
				<a onClick={this.typeLetter} name="ǰ" className="letter"> ǰ</a> -
				<a onClick={this.typeLetter} name="š" className="letter"> š</a> - 
				<a onClick={this.typeLetter} name="x̣" className="letter"> x̣</a> -
				<a onClick={this.typeLetter} name="ʔ" className="letter"> ʔ</a> -
				<a onClick={this.typeLetter} name="ʕ" className="letter"> ʕ</a> -
				<a onClick={this.typeLetter} name="ʷ" className="letter"> ʷ</a> - 
				<a onClick={this.typeLetter} name="á" className="letter"> á</a> - 
				<a onClick={this.typeLetter} name="ä" classname="letter"> ä</a> -
				<a onClick={this.typeLetter} name="ä́" classname="letter"> ä́</a> -
				<a onClick={this.typeLetter} name="é" className="letter"> é</a> - 
				<a onClick={this.typeLetter} name="ɛ" className="letter"> ɛ</a> - 
				<a onClick={this.typeLetter} name="ɛ́" className="letter"> ɛ́</a> - 
				<a onClick={this.typeLetter} name="í" className="letter"> í</a> - 
				<a onClick={this.typeLetter} name="ι" classname="letter"> ι</a> -
				<a onClick={this.typeLetter} name="ó" className="letter"> ó</a> - 
				<a onClick={this.typeLetter} name="ú" className="letter"> ú</a> - 
				<a onClick={this.typeLetter} name="ə" className="letter"> ə</a> - 
				<a onClick={this.typeLetter} name="ɔ" className="letter"> ɔ</a> - 
				<a onClick={this.typeLetter} name="ụ" classname="letter"> ụ</a> -
				<a onClick={this.typeLetter} name="·" className="letter"> ·</a> - 
				<a onClick={this.typeLetter} name="‿" className="letter"> ‿</a> - 
				<a onClick={this.typeLetter} name="†" className="letter"> †</a> - 
				<a onClick={this.typeLetter} name="‡" className="letter"> ‡</a> -
				<a onClick={this.typeLetter} name="§" className="letter"> §</a>
				</p>
			</span>

		</Form>
		);

	 return (     
			<CharInput />
		);
	}
}
export default CharPicker;


