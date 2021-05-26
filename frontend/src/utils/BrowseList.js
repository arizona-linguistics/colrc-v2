import React from 'react'
import { Link } from 'react-router-dom';
import { List } from "semantic-ui-react";



function BrowseList() {
    return ( 
        <List horizontal>
            {/* <List.Item><Link to={{pathname: "/browseroot", search:`?root=a%`}} target="_blank">a</Link></List.Item>  */}
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=a%&label=a`}} target="_top">a</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=b%&label=b`}} target="_top">b</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=c%&label=c`}} target="_top">c</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=c'%&label=c'`}} target="_top">c'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=č%&label=č`}} target="_TOP">č</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=č'%&label=č'`}} target="_top">č'</Link></List.Item>            
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=d%&label=d`}} target="_top">d</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=gʷ%&label=gʷ`}} target="_top">gʷ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=h%&label=h`}} target="_top">h</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=ǰ%&label=ǰ'`}} target="_top">ǰ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=k%&label=k`}} target="_top">k</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=kʷ%&label=kʷ`}} target="_top">kʷ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=k'ʷ%&label=kʷ'`}} target="_top">k'ʷ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=l%&label=l`}} target="_top">l</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=l'%&label=l'`}} target="_top">l'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=ɫ%&label=ɫ`}} target="_top">ɫ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=m%&label=m`}} target="_top">m</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=m'%&label=m'`}} target="_top">m'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=n%&label=n`}} target="_top">n</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=n'%&label=n'`}} target="_top">n'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=p%&label=p`}} target="_top">p</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=p'%&label=p'`}} target="_top">p'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=q%&label=q`}} target="_top">q</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=q'%&label=q'`}} target="_top">q'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=qʷ%&label=qʷ`}} target="_top">qʷ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=q'ʷ%&label=q'`}} target="_top">q'ʷ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=s%&label=s`}} target="_top">s</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=š%&label=š`}} target="_top">š</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=t%&label=t`}} target="_top">t</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=t'%&label=t'`}} target="_top">t'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=w%&label=w`}} target="_top">w</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=w'%&label=w'`}} target="_top">w'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=xʷ%&label=xʷ`}} target="_top">xʷ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=x̣%&label=x̣`}} target="_top">x̣</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=x̣ʷ%&label=x̣ʷ`}} target="_top">x̣ʷ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=y%&label=y`}} target="_top">y</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=y'%&label=y'`}} target="_top">y'</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=ʕ%&label=ʕ`}} target="_top">ʕ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=ʕʷ%&label=ʕʷ`}} target="_top">ʕʷ</Link></List.Item>
            <List.Item><Link to={{pathname: "/browseroot", search:`?root=ʔ%&label=ʔ`}} target="_top">ʔ</Link></List.Item>
        </List>
    )
}

export default BrowseList
  