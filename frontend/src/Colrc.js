import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MainMenu from './MainMenu';
import NavBar from './NavBar';
import Roots from './roots/Roots';
import SpellingPronunciation from './spelling/SpellingPronunciation';
import AddSpell from './spelling/AddSpell';
import EditSpell from './spelling/EditSpell';
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
import { ApolloProvider, withApollo, graphql, compose } from 'react-apollo';
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
import {  getUserFromToken } from './queries/queries';

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
  _isMounted = false

  constructor(props) {
    super(props)
    this.rightMenuItems = this.rightMenuItems.bind(this)
    this.changeLoginState = this.changeLoginState.bind(this)
    this.changeAffixState = this.changeAffixState.bind(this)
    this.changeRootState = this.changeRootState.bind(this)
    this.changeAudioState = this.changeAudioState.bind(this)
    this.changeBibliographyState = this.changeBibliographyState.bind(this)
    this.state = {
      login: loggedIn(),
      user: {
        first: '',
        last: '',
        email: '',
        username: '',
        password: '',
        roles: []
      },
      texts: {
        page: 0,
        pageSize: 5,
        sorted: [],
        resized: [],
        filtered: [],
      },
      bibliography: {
        page: 0,
        pageSize: 10,
        sorted: [],
        resized: [],
        filtered: [],
        selected: {
          author: true,
          year: true,
          title: true,
          reference: true,
          edit: false,
          username: false,
          active: false,
          prevId: false,
        }
      },
      audio: {
        page: 0,
        sorted: [],
        resized: [],
        filtered: [],
      },
      affixes: {
        page: 0,
        pageSize: 10,
        sorted: [{
          id: 'type',
          desc: false
        },{
          id: 'nicodemus',
          desc: false
        }],
        filtered: [],
        resized: [],
        selected: {
          type: true,
          salish: false,
          english: true,
          nicodemus: true,
          link: false,
          edit: false,
          username: false,
          active: false,
          prevId: false,
          editnote: false
        }
      },
      roots: {
        page: 0,
        pageSize: 10,
        sorted: [{
          id: 'root',
          desc: false
        },{
          id: 'number',
          desc: false
        },{
          id: 'sense',
          desc: false
        }],
        filtered: [],
        resized: [],
        selected: {
          root: true,
          number: true,
          sense: false,
          salish: false,
          nicodemus: true,
          symbol: false,
          english: true,
          grammar: false,
          crossref: false,
          variant: false,
          cognate: false,
          edit: false,
          username: false,
          active: false,
          prevId: false,
          editnote: false
        },
      }
    }
  }

  async componentDidMount() {
    this._isMounted = true
    await this.checkUserRole()
  }

  async componentWillUnmount() {
    this._isMounted = false;
    console.log("COLRC is unmounting")
  }

  changeLoginState(loginState) {
    let currentState = Object.assign({}, this.state)
    currentState.login = loginState
    this.setState(currentState)
  }

  async checkUserRole() {
    this._isMounted = true  
    try {
      const token = localStorage.getItem('TOKEN')
      if (token) {
        let userQuery = await client.query({
          query: getUserFromToken,
        })
        const user = userQuery.data.getUserFromToken_Q
        // set the state with user info based on token, and if the user has an 'admin' role, set 
        // the state variable 'admin' to true.  Else, set it to false. 
        let currentState = Object.assign({}, this.state)
        currentState.admin = user.roles.includes("admin")  || user.roles.includes("owner") || user.roles.includes("update")
        currentState.fields = {
          first: user.first,
          last: user.last,
          email: user.email,
          username: user.username,
          roles: user.roles
        }
        await this.setState(currentState) 
        console.log("My user is " + user)
        console.log(this.state)
      } else {
        let currentState = Object.assign({}, this.state)
        currentState.admin = false
        currentState.fields = {
          first: 'anonymous',
          last: 'anonymous',
          email: 'anonymous',
          username: 'anonymous',
          roles: ['view']
        }
        await this.setState(currentState) 
        console.log(this.state)
        console.log("and here's the role " + this.state.fields.roles)
      }
    } catch(error) {
      console.log(error)
    }
  }

  async changeAffixState(affixState){
    this._isMounted = true   
    let currentState = Object.assign({}, this.state) 
    currentState.affixes = affixState    
    await this.setState(currentState)
  }
  async changeRootState(rootState){
    let currentState = Object.assign({}, this.state) 
    currentState.roots = rootState    
    await this.setState(currentState)
  }
  async changeAudioState(audioState){
    let currentState = Object.assign({}, this.state) 
    currentState.audio = audioState    
    await this.setState(currentState)
  }
  async changeBibliographyState(bibliographyState){
    let currentState = Object.assign({}, this.state) 
    currentState.bibliography = bibliographyState    
    await this.setState(currentState)
  }
  async changeTextState(textState){
    let currentState = Object.assign({}, this.state) 
    currentState.texts = textState    
    await this.setState(currentState)
  }
  rightMenuItems = () => {
    const rightItems = [
      { to: "/search", icon: 'search', content:"Search", key: 'rsearch'},
      // { to: "/settings", icon: 'cog', content:"Settings", key: 'rsettings'},
      // { to: "/more", icon: 'ellipsis vertical', content:"More Options", key: 'rmore'},
    ]
    if (loggedIn()){
      rightItems.push({ to: "/users", icon: 'user', content:"User Profile", key: 'ruser'})
    }
    else {
      rightItems.push({ to: "/register", icon: 'user outline', content:"Log In/Sign Up", key: 'rreg'})
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
                <Route path="/roots" component={() => <Roots rootState={this.state.roots} changeRootState={this.changeRootState} />} />
                <Route path="/stems" component={Stems} />
                <Route path="/affixes" component={() => <Affixes affixState={this.state.affixes} changeAffixState={this.changeAffixState} admin={this.state.admin}/> } />
                <Route path="/audio" component={() => <Audio audioState={this.state.audio} changeAudioState={this.changeAudioState} />} />
                <Route path="/contactus" component={ContactUs} />
                <Route path="/texts" component={() => <Texts textState={this.state.texts} changeTextState={this.changeTextState} />} />
                <Route path="/bibliography" component={() => <Bibliography bibliographyState={this.state.bibliography} changeBibliographyState={this.changeBibliographyState} />} />
                <Route path="/addspell" component={AddSpell} />
                <Route path="/editspell" component={EditSpell} />
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
