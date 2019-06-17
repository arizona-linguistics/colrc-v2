import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import { Form, Button, Icon } from 'semantic-ui-react';
import 'react-simple-keyboard/build/css/index.css';

class SimpleKeyboard extends Component {
	keyboardRef: Keyboard;
	state = {
	    layoutName: "default",
	    input: "",
	    keyboardOpen: false
	  };

	onChange = input => {
	    this.setState({
	      input: input
	    });
	    console.log("Input changed", input);
	};

	onKeyPress = button => {
	    console.log("Button pressed", button);
	    /**
	     * If you want to handle the shift and caps lock buttons
	     */
	    if (button === "{shift}" || button === "{lock}") this.handleShift();
	};

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboardRef.keyboard.setInput(input);
      }
    );
  };

setActiveInput = keyInput => {
    this.setState(
      {
        inputName: keyInput,
        keyboardOpen: true
      },
      () => {
        console.log("Active input", keyInput);
      }
    );
  };

closeKeyboard = () => {
    this.setState({
      keyboardOpen: false
    });
  };

  render(){
  let { input, keyboardOpen } = this.state;
  
  const colrc = {
  'default' : [
    "á ä ä́ é ɛ ɛ́ í ι ó ú ə ɔ ụ · ʷ",
    "ɫ ∤ ɬ č ǰ š x̣ ʔ ʕ ‿ † ‡ § √",
    "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; '",
    "{shift} z x c v b n m , . / {shift}",
    "{space}"
  ],
  'shift' : [
    "á ä ä́ é ɛ ɛ́ í ι ó ú ə ɔ ụ ʷ",
    "ɫ ∤ č ǰ š x̣ ʔ ʕ ‿ · † ‡ § √",
    "! @ # $ % ^ & * ( ) _ + {bksp}",
    "Q W E R T Y U I O P { } |",
    "{lock} A S D F G H J K L : \"",
    "{shift} Z X C V B N M < > ? {shift}",
    "{space}"
  ]
};

    return (
    <div>
	    <Form>
	        <input
	          key="keyInput"
	          name="keyInput"
	          value={this.state.input}
	          placeholder={"Tap to launch virtual keyboard"}
	          onChange={e => this.onChangeInput(e)}
           	  onFocus={() => this.setActiveInput("keyInput")}
	        />
	        <div className={`keyboardContainer ${!keyboardOpen ? "hidden" : ""}`}>
		    <Keyboard
		        ref={r => (this.keyboardRef = r)}
		        key="keyboard"
		        layout={colrc}
		        layoutName={this.state.layoutName}
				preventMouseDownDefault={true}
		        onChange={input =>
		          this.onChange(input)}
		        onKeyPress={button =>
		          this.onKeyPress(button)}
		    />
          	<Button basic color="blue" icon size="mini" labelPosition="right" className="closeBtn" onClick={this.closeKeyboard}>
            	<Icon name='close' />
            	Close Keyboard
          	</Button>
          </div>
	      </Form>
    </div>
    );
  }
}

export default SimpleKeyboard;