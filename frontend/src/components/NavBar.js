/* eslint-disable no-mixed-operators */

import { map } from "lodash";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { intersectionWith, isEqual } from "lodash";
import { path_button_permissions } from "../access/permissions";
import {
  Container,
  Icon,
  Menu,
  Sidebar,
  Responsive,
  Popup,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

let rightMenuItems = (authTokens) => {
  const rightItems = [
    { to: "/search", icon: "search", content: "Search", key: "rsearch" },
  ];
  if (authTokens) {
    rightItems.push({
      to: "/users",
      icon: "user",
      content: "User Profile",
      key: "ruser",
    });
  } else {
    rightItems.push(
      {
        to: "/login",
        icon: "user outline",
        content: "Log In/Sign Up",
        key: "rreg",
      },
      {
        to: "/contact",
        icon: "mail outline",
        content: "Contact Us",
        key: "rcontact",
      }
    );
  }
  return rightItems;
};

const NavBarMobile = ({
  children,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
  currentUser,
  authTokens,
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      size="mini"
      vertical
      visible={visible}
      width="thin"
    >
      <Menu.Item as={NavLink} to="/" name="Home" size="mini" key="minihome">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/roots"
        name="Roots"
        size="mini"
        key="miniroots"
      >
        <Icon name="database" />
        Roots
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/affixes"
        name="Affixes"
        size="mini"
        key="miniaffixes"
      >
        <Icon name="leaf" />
        Affixes
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/stems"
        name="Stems"
        size="mini"
        key="ministems"
      >
        <Icon name="code branch" />
        Stems
      </Menu.Item>
      {authTokens && currentUser && intersectionWith(path_button_permissions['adminNav'], currentUser.roles, isEqual).length >= 1 ? (
      <Menu.Item
        as={NavLink}
        to="/texts"
        name="Texts"
        size="mini"
        key="minitexts"
      >
           <Icon name="book" />
            Texts
          </Menu.Item>
          ): ( <div></div> )
      }
    {authTokens && currentUser && intersectionWith(path_button_permissions['adminNav'], currentUser.roles, isEqual).length >= 1 ? (
      <Menu.Item
        as={NavLink}
        to="/audios"
        name="Audios"
        size="mini"
        key="miniaudios"
      >
           <Icon name="file audio outline" />
            Audios
          </Menu.Item>
          ): ( <div></div> )
      }
    <Menu.Item
        as={NavLink}
        to="/spelling"
        name="Spelling"
        size="mini"
        key="minispelling"
      >
        <Icon name="pencil" />
        Spelling
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/bibliography"
        name="Bibliograpy"
        size="mini"
        key="minibib"
      >
        <Icon name="list" />
        Bibliography
      </Menu.Item>
      {authTokens &&
      currentUser &&
      intersectionWith(
        path_button_permissions["adminNav"],
        currentUser.roles,
        isEqual
      ).length >= 1 ? (
        <Menu.Item
          as={NavLink}
          to="/elicitations"
          name="Elicitations"
          size="mini"
          key="minielicitations"
        >
          <Icon name="file audio outline" />
          In Dev: Elicitations
        </Menu.Item>
      ) : (
        <div></div>
      )}
      {authTokens &&
      currentUser &&
      intersectionWith(
        path_button_permissions["adminNav"],
        currentUser.roles,
        isEqual
      ).length >= 1 ? (
        <Menu.Item as={NavLink} to="/log" name="Log" size="mini" key="minilog">
          <Icon name="history" />
          In Dev: Log
        </Menu.Item>
      ) : (
        <div></div>
      )}
      {authTokens &&
      currentUser &&
      intersectionWith(
        path_button_permissions["adminNav"],
        currentUser.roles,
        isEqual
      ).length >= 1 ? (
        <Menu.Item
          as={NavLink}
          to="/upload"
          name="Upload"
          size="mini"
          key="miniupload"
        >
          <Icon name="file" />
          In Dev: Upload
        </Menu.Item>
      ) : (
        <div></div>
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
          {map(rightItems, (item) => (
            <Popup
              key={item.key}
              content={item.content}
              trigger={
                <Menu.Item
                  as={NavLink}
                  to={item.to}
                  key={item.key}
                  icon={item.icon}
                />
              }
            />
          ))}
        </Menu.Menu>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ rightItems, currentUser, authTokens }) => (
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
    {authTokens && currentUser && intersectionWith(path_button_permissions['adminNav'], currentUser.roles, isEqual).length >= 1 ? (
      <Menu.Item as={NavLink} to="/texts" name="Texts" key="mtexts">Texts</Menu.Item>) : ( <div></div> )
    }
    {authTokens && currentUser && intersectionWith(path_button_permissions['adminNav'], currentUser.roles, isEqual).length >= 1 ? (
      <Menu.Item as={NavLink} to="/audios" name="Audios" key="maudios">Audios</Menu.Item>) : ( <div></div> )
    }  
    <Menu.Item as={NavLink} to="/spelling" name="Spelling" key="mspelling">
      Spelling
    </Menu.Item>
    <Menu.Item as={NavLink} to="/bibliography" name="Bibliography" key="mbib">
      Bibliography
    </Menu.Item>
    {authTokens &&
    currentUser &&
    intersectionWith(
      path_button_permissions["adminNav"],
      currentUser.roles,
      isEqual
    ).length >= 1 ? (
      <Menu.Item
        as={NavLink}
        to="/elicitations"
        name="Elicitations"
        key="melicitations"
      >
        In-Dev: Elicitations
      </Menu.Item>
    ) : (
      <div></div>
    )}
    {authTokens &&
    currentUser &&
    intersectionWith(
      path_button_permissions["adminNav"],
      currentUser.roles,
      isEqual
    ).length >= 1 ? (
      <Menu.Item as={NavLink} to="/log" name="Log" key="mlog">
        In-Dev: Log
      </Menu.Item>
    ) : (
      <div></div>
    )}
    {authTokens &&
    currentUser &&
    intersectionWith(
      path_button_permissions["adminNav"],
      currentUser.roles,
      isEqual
    ).length >= 1 ? (
      <Menu.Item as={NavLink} to="/upload" name="Upload" key="mupload">
        In-Dev: Upload
      </Menu.Item>
    ) : (
      <div></div>
    )}
    <Menu.Menu position="right">
      {map(rightItems, (item) => (
        <Popup
          key={item.key}
          content={item.content}
          trigger={
            <Menu.Item
              as={NavLink}
              to={item.to}
              key={item.key}
              icon={item.icon}
            />
          }
        />
      ))}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

function NavBar(props) {
  let [visible, setVisible] = useState(false);
  const { authTokens, user } = useAuth();

  const handlePusher = () => {
    if (visible) setVisible(false);
  };

  const handleToggle = () => setVisible(!visible);

  const { children } = props;
  return (
    <>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightMenuItems(user)}
          visible={visible}
          currentUser={user}
          authTokens={authTokens}
        >
          <NavBarChildren>{children}</NavBarChildren>
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop
          rightItems={rightMenuItems(user)}
          currentUser={user}
          authTokens={authTokens}
        />
        <NavBarChildren>{children}</NavBarChildren>
      </Responsive>
    </>
  );
}

export default NavBar;
