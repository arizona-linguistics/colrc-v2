import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Icon,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

const NavBarMobile = ({
  children,
  //leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
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
    <Menu.Item as={Link} to="/" name="Home" size='mini' key="minihome">
	   <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as={Link} to="/roots" name="Roots" size='mini' key="miniroots">
    <Icon name="leaf" />
       Roots
    </Menu.Item>
    <Menu.Item as={Link} to="/stems" name="Stems" key="ministems">
    <Icon name="code branch" />
       Stems
    </Menu.Item>
    <Menu.Item as={Link} to="/affixes" name="Affixes" key="miniaffixes">
    <Icon name="sort alphabet down" />
       Affixes
    </Menu.Item>
    <Menu.Item as={Link} to="/texts" name="Texts" key="minitexts">
    <Icon name="comment" />
       Texts
    </Menu.Item>
    <Menu.Item as={Link} to="/audio" name="Audio" key="miniaudio">
    <Icon name="file audio" />
       Audio
    </Menu.Item>
    <Menu.Item as={Link} to="/spelling" name="Spelling" key="minispelling">
     <Icon name="font" />
       Spelling
    </Menu.Item>
    <Menu.Item as={Link} to="/bibliography" name="Bibliography" key="minibib">
    <Icon name="book" />
       Bibliography
    </Menu.Item>
    <Menu.Item as={Link} to="/contactus" name="Contact" key="minicontact">
    <Icon name="mail" />
       Contact
    </Menu.Item>
    <Menu.Item as={Link} to="/elicitations" name="Elicitations" key="minielic">
    <Icon name="talk" />
       Elicitations
    </Menu.Item>
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
        <Menu fixed="top" inverted>
          <Menu.Item key="tophome">
            <Icon name="home" />
          </Menu.Item >
          <Menu.Item key="side" onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {_.map(rightItems, item => <Menu.Item as={Link} {...item} />)}
          </Menu.Menu>
        </Menu>
        {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ rightItems }) => (
  <Menu fixed="top" inverted>
    <Menu.Item as={Link} to="/" name="home" key="home">
       <Icon name="home" />
    </Menu.Item>
    <Menu.Item as={Link} to="/roots" name="Roots" key="roots">
       Roots
    </Menu.Item>
    <Menu.Item as={Link} to="/stems" name="Stems" key="stems">
       Stems
    </Menu.Item>
     <Menu.Item as={Link} to="/affixes" name="Affixes" key="affixes">
       Affixes
    </Menu.Item>
    <Menu.Item as={Link} to="/texts" name="Texts" key="texts">
       Texts
    </Menu.Item>
    <Menu.Item as={Link} to="/audio" name="Audio" key="audio">
       Audio
    </Menu.Item>
    <Menu.Item as={Link} to="/spelling" name="Spelling" key="spelling">
       Spelling
    </Menu.Item>
    <Menu.Item as={Link} to="/bibliography" name="Bibliography" key="bib">
       Bibliography
    </Menu.Item>
    <Menu.Item as={Link} to="/contactus" name="Contact" key="contact">
       Contact
    </Menu.Item>
    <Menu.Item as={Link} to="/elicitations" name="Elicitations" key="elicit">
       Elicitations
    </Menu.Item>
    <Menu.Menu position="right">
      {_.map(rightItems, item => <Menu.Item as={Link} {...item} />)}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

class NavBar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, rightItems } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            //leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>

        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}

export default NavBar;
