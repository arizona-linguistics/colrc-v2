import React from 'react'
import { Link } from 'react-router-dom';
import { List } from "semantic-ui-react";



function BrowseList() {
    const roots = ["a", "b", "c", "c'", "č", "č'", "d", "gʷ", "h", "ǰ", "k", "kʷ", "k'ʷ", "l", "l'", "ɫ", "m", "m'", "n", 
        "n'", "p", "p'", "q", "q'", "qʷ", "q'ʷ", "s", "š", "t", "t'", "w", "w'", "xʷ", "x̣", "x̣ʷ", "y", "y'", "ʕ", "ʕʷ", "ʔ",];

    return ( 
        <List horizontal>
            {roots.map((root) => <List.Item key={root.toString()}><Link to={{pathname: "/browseroot", search:`?root=${root}%&label=${root}`}} target="_top" key={root}>{root}</Link></List.Item>)}
        </List>
    )
}

export default BrowseList
  