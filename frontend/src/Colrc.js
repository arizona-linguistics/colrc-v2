import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MainMenu from './MainMenu';
import NavBar from './NavBar';
import Roots from './roots/Roots';
import SpellingPronunciation from './spelling/SpellingPronunciation';
import Home from './home/Home';
import Stems from './stems/Stems';
import Affixes from './affixes/Affixes';
import Audio from "./audio/Audio";
import ContactUs from './contact/ContactUs';
import Texts from './texts/Texts';
import Bibliography from './bibliography/Bibliography';
import EditRoot from './roots/EditRoot';
import AddRoot from './roots/AddRoot';
import Elicitations from './elicitations/Elicitations';
import EditBib from './bibliography/EditBib';
import AddBib from './bibliography/AddBib';
import EditStem from './stems/EditStem';
import AddStem from './stems/AddStem';
import EditAffix from './affixes/EditAffix';
import AddAffix from './affixes/AddAffix';
import ImageViewer from './utilities/ImageViewer';
import SplitView from './utilities/SplitView';
import Search from './search/Search';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import "react-table/react-table.css";
import './stylesheets/NavBar.css';
import './stylesheets/Colrc.css';
import './stylesheets/AccordionTables.css';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Users from './users/Users';
import ChangePassword from './users/ChangePassword';
import UserProfile from './users/UserProfile';
import Register from './users/Register';
import Admin from './users/Admin';
import UpdateRoles from './users/UpdateRoles';
import Settings from './settings/Settings';
import More from './more/More';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const { createApolloFetch } = require('apollo-fetch');

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/api'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('TOKEN')
  console.log(token)
  return {
    headers: {
      ...headers,
      token: token ? `Bearer ${token}` : ''
    }
  }
})

const wsLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('TOKEN')
  return {
    headers: {
      ...headers,
      token: token ? `Bearer ${token}` : ''
    }
  }
})

const loggedIn = () => { 
  const token = localStorage.getItem('TOKEN')
  return token ? true : false
}

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink.concat(httpLink),
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})


class Colrc extends Component {

  constructor(props) {
    super(props)
    this.rightMenuItems = this.rightMenuItems.bind(this)
    this.changeLoginState = this.changeLoginState.bind(this)
    this.state = {
      login: loggedIn()
    }
  }

  changeLoginState(loginState) {
    this.setState({
      login: loginState    
    })
  }

  rightMenuItems = () => {
    const rightItems = [
      { to: "/search", icon: 'search', content:"Search", key: 'rsearch'},
      { to: "/settings", icon: 'cog', content:"Settings", key: 'rsettings'},
      { to: "/more", icon: 'ellipsis vertical', content:"More Options", key: 'rmore'},
    ]
    if (loggedIn()){ 
      rightItems.unshift({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'})
    }
    else {
      rightItems.unshift({ to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'})
    }
    return rightItems
  }

  render() {

    return (
      <Router>
        <ApolloProvider client={client}>
          <NavBar rightItems={this.rightMenuItems()}>
          <MainMenu title='title' />
          <Grid container verticalAlign='top'>
          <Grid.Row>
            <Grid.Column>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/spelling" component={SpellingPronunciation} />
                <Route path="/roots" component={Roots} />
                <Route path="/stems" component={Stems} />
                <Route path="/affixes" component={Affixes} />
                {/* <Route path="/audio" component={Audio} /> */}
                <Route path="/contactus" component={ContactUs} />
                <Route path="/texts" component={Texts} />
                <Route path="/bibliography" component={Bibliography} />
                <Route path="/editroot" component={EditRoot} />
                <Route path="/addroot" component={AddRoot} />
                <Route path="/editbib" component={EditBib}  />
                <Route path="/addbib" component={AddBib}  />
                <Route path="/editstem" component={EditStem} />
                <Route path="/addstem" component={AddStem} />
                <Route path="/editaffix" component={EditAffix} />
                <Route path="/addaffix" component={AddAffix}  />
                <Route path="/elicitations" component={Elicitations} />
                <Route path="/imageviewer" component={ImageViewer} />
                <Route path="/splitview" component={SplitView} />
                <Route path="/search" component={Search}  />
                <Route path="/users" component={() => <Users changeLoginState={this.changeLoginState} />} />
                <Route path="/changepassword" component={ChangePassword} />
                <Route path="/userprofile" component={UserProfile} />
                <Route path="/register" component={() => <Register changeLoginState={this.changeLoginState} />} />
                <Route path="/admin" component={Admin} />
                <Route path="/updateroles" component={UpdateRoles} />                
                <Route path="/Settings" component={Settings}  />
                <Route path="/more" component={More}  />
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Footer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </NavBar>

      </ApolloProvider>
    </Router>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className='ui bottom centered'>
        <p></p>
        <p>coeur d'alene online language resource center copyright 2009</p>
        <p>project supported by the national science foundation awards BCS-1160627 and BCS-1160394 and the national endowment for the humanities award PD-261031-18.</p>
      </div>
    );
  }
}

export default Colrc;
