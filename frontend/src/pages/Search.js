import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import { Link } from "react-router-dom";
import { Grid, Header, Segment, Message, Input } from "semantic-ui-react";
import "react-simple-keyboard/build/css/index.css";

//import { useAuth } from "../context/auth";
//import { broadCastSuccess } from '../utils/messages';

function Search(props) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  // const globalFilters =  {
  //     "roots": {
  //         "filters": [],
  //         "globalFilterVariables": ["english", "nicodemus", "salish"]
  //     },
  //     "affixes": {
  //       "filters": [],
  //       "globalFilterVariables": ["english", "nicodemus", "salish"]
  //   }
  // }

  const onChange = (input) => {
    setGlobalFilter(input);
    console.log("Input changed", globalFilter);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setGlobalFilter(input);
    keyboard.current.setInput(input);
  };

  return (
    <Grid relaxed columns={1} textAlign="center" verticalAlign="top">
      <Grid.Column>
        <Grid.Row>
          <Header as="h2" textAlign="center">
            Search the COLRC
          </Header>
          <Message>
            Use this page to search across all <Link to="/roots">roots</Link>,{" "}
            <Link to="/affixes">affixes</Link> and <Link to="/stem">stems</Link>
            .
          </Message>
        </Grid.Row>
        <Grid.Row>
          <Segment>
            <div id="App">
              <Input
                id="search"
                value={globalFilter}
                size="large"
                fluid
                action={{
                  color: "blue",
                  labelPosition: "right",
                  icon: "search",
                  content: "find it!",
                  onClick: async (event, data) => {
                    //console.log(JSON.stringify(await getSearchResults(input, globalFilters)));
                    console.log(globalFilter);
                    props.history.push("/searchresults?search=" + globalFilter);
                  },
                }}
                placeholder="Search the COLRC..."
                onChange={onChangeInput}
              />
              <Keyboard
                keyboardRef={(r) => (keyboard.current = r)}
                layoutName={layout}
                layout={{
                  default: [
                    "á ä ä́ é ɛ ɛ́ í ι ó ú ə ɔ ụ · ʷ",
                    "ɫ ∤ ɬ č ǰ š x̣ ʔ ʕ ‿ † ‡ § √",
                    "ʀ ᴇ c̕ l̕ m̕ n̕ p̕ q̕ r̕ ṛ ʀ̕ s̕ t̕ w̕ y̕",
                    "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                    "q w e r t y u i o p [ ] \\",
                    "{lock} a s d f g h j k l ; '",
                    "{shift} z x c v b n m , . / {shift}",
                    "{space}",
                  ],
                  shift: [
                    "Á Ä Ä́ É ɛ ɛ́ Í ι Ó Ú ə ɔ Ụ · ʷ",
                    "ɫ Ł Č J̌ Š X̣ ʔ ʕ ‿ · † ‡ § √",
                    "ʀ ᴇ c̕ l̕ m̕ n̕ p̕ q̕ r̕ ṛ ʀ̕ s̕ t̕ w̕ y̕",
                    "! @ # $ % ^ & * ( ) _ + {bksp}",
                    "Q W E R T Y U I O P { } |",
                    '{lock} A S D F G H J K L : "',
                    "{shift} Z X C V B N M < > ? {shift}",
                    "{space}",
                  ],
                }}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
            </div>
          </Segment>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default Search;
