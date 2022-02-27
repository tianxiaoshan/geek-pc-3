import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Layout'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>

          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
