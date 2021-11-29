import React, { useState, createContext, useReducer, useContext } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Login from './components/screen/Login'
import Home from './components/screen/Home'
import Profile from './components/screen/Profile'
import SignUp from './components/screen/SignUp'
import UserProfile from './components/screen/UserProfile'
import CreatePost from './components/screen/createPost'
import SubscribeUserPost from './components/screen/SubscribesUser'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { reducer, initialState } from './reducers/userReducer'
import { useEffect } from 'react/cjs/react.development'
export const UserContext = createContext()

const Routing = () => {
  // const history = useHistory()
  // const { state, dispatch } = useContext(UserContext)
  // useEffect(() => {
  //   history.push('/login')
  // }, [])
  return (
    <Switch>
      <Route exact path="/home" component={Home}><Home /></Route>
      <Route exact path="/profile" component={Profile}><Profile /></Route>
      <Route path="/signup" component={SignUp}><SignUp /></Route>
      <Route path="/login" component={Login}><Login /></Route>
      <Route path="/create" component={CreatePost}><CreatePost /></Route>
      <Route path="/profile/:userid" component={UserProfile}><UserProfile /></Route>
      <Route path="/myfollowerspost" component={SubscribeUserPost}><SubscribeUserPost /></Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
