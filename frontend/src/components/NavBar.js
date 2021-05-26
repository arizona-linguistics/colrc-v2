/* eslint-disable no-mixed-operators */

import { map } from "lodash"
import React, { useState } from "react"
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'

import {
  Container,
  Icon,
  Menu,
  Sidebar,
  Responsive,
  Popup
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

let rightMenuItems = (currentUser) => {
  const rightItems = [
    {to: "/search", icon: 'search', content:"Search", key: 'rsearch'},
    ]
    if (currentUser){
      rightItems.push({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'})
    }
    else {
      rightItems.push(
        { to: "/login", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'},
        { to: "/contact", icon: 'mail outline', content:"Contact Us", key: 'rcontact'}
      )
    }
    return rightItems
  }


const NavBarMobile = ({
  children,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
  currentUser
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      size='mini'
      vertical
      visible={visible}
      width='thin'
    >
    <Menu.Item as={NavLink} to="/" name="Home" size='mini' key="minihome">
     <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as={NavLink} to="/roots" name="Roots" size='mini' key="miniroots">
     <Icon name="database" />
      Roots
    </Menu.Item>
    <Menu.Item as={NavLink} to="/affixes" name="Affixes" size='mini' key="miniaffixes">
     <Icon name="leaf" />
      Affixes
    </Menu.Item>
    <Menu.Item as={NavLink} to="/stems" name="Stems" size='mini' key="ministems">
     <Icon name="code branch" />
      Stems
    </Menu.Item>
    <Menu.Item as={NavLink} to="/texts" name="Texts" size='mini' key="minitexts">
     <Icon name="book" />
      Texts
    </Menu.Item>
    <Menu.Item as={NavLink} to="/audios" name="Audios" size='mini' key="miniaudios">
     <Icon name="file audio outline" />
      Audios
    </Menu.Item>
    <Menu.Item as={NavLink} to="/spelling" name="Spelling" size='mini' key="minispelling">
     <Icon name="pencil" />
      Spelling
    </Menu.Item>
    <Menu.Item as={NavLink} to="/bibliography" name="Bibliograpy" size='mini' key="minibib">
     <Icon name="list" />
      Bibliography
    </Menu.Item>
    {currentUser && (
      currentUser.roles.includes('manager') || currentUser.roles.includes('update') &&
        (<Menu.Item as={NavLink} to="/elicitations" name="Elicitations" size='mini' key="minielicitations">
          <Icon name="file audio outline" />
            Elicitations
         </Menu.Item>
        )
    )}
    {currentUser && (
      currentUser.roles.includes('manager') || currentUser.roles.includes('update') &&
        (<Menu.Item as={NavLink} to="/log" name="Log" size='mini' key="minilog">
          <Icon name="history" />
            Log
         </Menu.Item>
        )
    )}

    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
        <Menu fixed="top" inverted>
          <Menu.Item key="side" onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {map(rightItems, item  => <Popup key={item.key} content={ item.content } trigger={<Menu.Item as={NavLink} to={item.to} key={item.key} icon={item.icon} /> } /> )}
          </Menu.Menu>
        </Menu>
        {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ rightItems, currentUser }) => (
  <Menu fixed="top" inverted>
    <Menu.Item as={NavLink} to="/" name="home" key="mhome">
       <Icon name="home" />
    </Menu.Item>
    <Menu.Item as={NavLink} to="/roots" name="Roots" key="mroots">
       Roots
    </Menu.Item>
    <Menu.Item as={NavLink} to="/affixes" name="Affixes" key="maffixes">
       Affixes
    </Menu.Item>
    <Menu.Item as={NavLink} to="/stems" name="Stems" key="mstems">
       Stems
    </Menu.Item>
    <Menu.Item as={NavLink} to="/texts" name="Texts" key="mtexts">
       Texts
    </Menu.Item>
    <Menu.Item as={NavLink} to="/audios" name="Audios" key="maudios">
       Audios
    </Menu.Item>
    <Menu.Item as={NavLink} to="/spelling" name="Spelling" key="mspelling">
       Spelling
    </Menu.Item>
    <Menu.Item as={NavLink} to="/bibliography" name="Bibliography" key="mbib">
       Bibliography
    </Menu.Item>
    { currentUser && (
      currentUser.roles.includes('manager') || currentUser.roles.includes('update') &&
      (<Menu.Item as={NavLink} to="/elicitations" name="Elicitations" key="melicitations">Elicitations</Menu.Item>) 
      )
    }
    { currentUser && (
      currentUser.roles.includes('manager') || currentUser.roles.includes('update') &&
      (<Menu.Item as={NavLink} to="/log" name="Log" key="mlog">Log</Menu.Item>) 
      )
    }

    <Menu.Menu position="right">
      {map(rightItems, item  => <Popup key={item.key} content={ item.content } trigger={<Menu.Item as={NavLink} to={item.to} key={item.key} icon={item.icon} /> } /> )}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

function NavBar(props) {
  let [visible, setVisible] = useState(false)
  const { user } = useAuth()

  const handlePusher = () => {
    if (visible) setVisible(false)
  }

  const handleToggle = () => setVisible(!visible)

  const { children } = props;
  return (
    
    <div>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightMenuItems(user)}
          visible={visible}
          currentUser={user}
        >
          <NavBarChildren>{children}</NavBarChildren>
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop rightItems={rightMenuItems(user)} currentUser={user} />
        <NavBarChildren>{children}</NavBarChildren>
      </Responsive>
    </div>
  )
}

export default NavBar