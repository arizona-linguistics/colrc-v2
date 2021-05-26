import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { getUserFromToken } from './queries/queries';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import AddAffix from './pages/AddAffix';
import EditAffix from './pages/EditAffix';
import DeleteAffix from './pages/DeleteAffix';
import AddRoot from './pages/AddRoot';
import BrowseRoot from './pages/BrowseRoot';
import ExactRoot from './pages/ExactRoot';
import AddStem from './pages/AddStem';
import EditStem from './pages/EditStem';
import DeleteStem from './pages/DeleteStem';
import EditRoot from './pages/EditRoot';
import DeleteRoot from './pages/DeleteRoot';
import AffixHistory from './pages/AffixHistory';
import RootHistory from './pages/RootHistory';
import UserListContainer from './pages/UserListContainer';
import Affixes from './pages/Affixes';
import Roots from './pages/Roots';
import Stems from './pages/Stems';
import Texts from './pages/Texts';
import Metadata from './pages/Metadata';
import Log from './pages/Log';
import Audios from './pages/Audios';
import Elicitations from './pages/Elicitations';
import Spelling from './pages/Spelling';
import Bibliography from './pages/Bibliography';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import Contact from './pages/Contact';
import { AuthContext } from "./context/auth";
import { ToastContainer } from 'react-toastify';
import { broadCastSuccess } from './utils/messages';
import ImageViewer from './utils/ImageViewer';
import SplitView from './utils/SplitView';
import Upload from './pages/Upload'
import TestUpload from './pages/TestUpload'
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import 'react-toastify/dist/ReactToastify.css';

function App(props) {

  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const existingUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(existingUser);

  const client = new ApolloClient({
    link: new ApolloLink((operation, forward) => {
      const token = JSON.parse(localStorage.getItem('tokens'))
      console.log("Client--My token is:", token ? `Bearer ${token}` : '')
      operation.setContext(
        token ? {
        headers: {
          authorization: `Bearer ${token}`, 
        }} : {
          headers: {}
        });
      return forward(operation);
    }).concat(
      new HttpLink({
        uri: 'http://localhost:8080/v1/graphql',
      })
    ),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  });

 
  const authClient = new ApolloClient({
    link: new ApolloLink((operation, forward) => {
      const token = JSON.parse(localStorage.getItem('tokens'))
      console.log("Auth--My token is:", token ? `Bearer ${token}` : '')
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '', 
        }
      });
      return forward(operation);
    }).concat(
      new HttpLink({
        uri: 'http://localhost:4000/api',
      })
    ),
    cache: new InMemoryCache(),
  });



  const setTokens = async (data) => {
    if (!data) {
      localStorage.removeItem("tokens")
      localStorage.removeItem("user")
      console.log("Setting the authorization tokens")
      setAuthTokens();
      console.log("Setting the user")
      setUser();
    }
    else {
      console.log("Setting the authorization tokens")
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
      console.log("Setting the user")
      let userQuery = await authClient.query({
        query: getUserFromToken,
        errorPolicy: 'all'
      })
      console.log(userQuery)
      let user = userQuery.data.getUserFromToken_Q
      let roles = []
      user.roles.forEach(role => roles.push(role.role_code))
      user.roles = roles
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
      broadCastSuccess(`Successfully logged in as: ${user.username}`)
    }
  }

  const NotFound = () => <div>Not found</div>
  const NotFoundRedirect = () => <Redirect to='/not-found' />

  return (
    <AuthContext.Provider value={{ client: client, authClient: authClient, user, setUser, authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div>
          <NavBar>
            <ToastContainer key="ToastContainer"/>
            <Switch>
              <Route exact path="/" component={Home} key="HomePage" />
              <Route path="/login" component={Login} key="LoginPage" />
              <Route path="/signup" component={Signup} key="SignupPage" />
              <Route path="/affixes" component={Affixes} key="Affixes" />
              <Route path="/roots" component={Roots} key="Roots" />
              <Route path="/browseroot" component={BrowseRoot} key="BrowseRoot" />
              <Route path="/exactroot" component={ExactRoot} key="ExactRoot" />
              <Route path="/stems" component={Stems} key="Stems" />
              <Route path="/texts" component={Texts} key="Texts" />
              <Route path="/metadata" component={Metadata} key="Metadata" />
              <Route path="/audios" component={Audios} key="Audios" />
              <Route path="/spelling" component={Spelling} key="Spelling" />
              <Route path="/bibliography" component={Bibliography} key="Bibliography" />
              <Route path="/contact" component={Contact} key="Contact" />
              <Route path="/imageviewer" component={ImageViewer} />
              <Route path="/splitview" component={SplitView} />
              <PrivateRoute path="/elicitations" component={Elicitations} key="Elicitations" />
              <PrivateRoute path="/addaffix" component={AddAffix} key="AddAffix" />
              <PrivateRoute path="/editaffix" component={EditAffix} key="EditAffix" />
              <PrivateRoute path="/deleteaffix" component={DeleteAffix} key="DeleteAffix" />
              <PrivateRoute path="/addstem" component={AddStem} key="AddStem" />
              <PrivateRoute path="/editstem" component={EditStem} key="EditStem" />
              <PrivateRoute path="/deletestem" component={DeleteStem} key="DeleteStem" /> */}
              <PrivateRoute path="/addroot" component={AddRoot} key="AddRoot" />
              <PrivateRoute path="/editroot" component={EditRoot} key="EditRoot" />
              <PrivateRoute path="/deleteroot" component={DeleteRoot} key="DeleteRoot" /> 
              <PrivateRoute path="/affixhistory" component={AffixHistory} key="AffixHistory" />
              <PrivateRoute path="/roothistory" component={RootHistory} key="RootHistory" />
              <PrivateRoute path="/log" component={Log} key="Log" />
              <PrivateRoute path="/users" component={Users} key="Users" />
              <PrivateRoute path="/userprofile" component={UserProfile} key="UserProfile" />
              <PrivateRoute path="/userlist" component={UserListContainer} key="UserListContainer" />
              <Route path="/upload" component={Upload} key="Upload" />
              <Route path="/crap/" component={TestUpload} key="TestUpload" />
              <Route path="/search" component={Search} key="Search" />
              <Route path="/searchresults" component={SearchResults} key="SearchResults" />
              <Route path="/not-found" component={NotFound} key="NotFound" />
              <Route component={NotFoundRedirect} key="NotFoundRedirect" />
            </Switch>
          </NavBar>
        </div>            
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
