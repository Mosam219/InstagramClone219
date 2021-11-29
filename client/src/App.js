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
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "USER", payload: user })
    }
    else {
      history.push('/login')
    }
  }, [])
  return (
    // <Home />
    // <Switch>
    <Route exact path="/"><Home /></Route>
    //   <Route exact path="/profile"><Profile /></Route>
    //   <Route path="/signup"><SignUp /></Route>
    //   <Route path="/login"><Login /></Route>
    //   <Route path="/create"><CreatePost /></Route>
    //   <Route path="/profile/:userid"><UserProfile /></Route>
    //   <Route path="/myfollowerspost"><SubscribeUserPost /></Route>
    // </Switch>
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
