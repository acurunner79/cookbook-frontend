import React from 'react'
import logo from './logo.svg';
import './App.css';
import Display from "./Display"
import Form from "./Form"
import { Route, Link, Switch } from "react-router-dom"

function App() {

  const url = "http://localhost:4000"

  const [cookbooks, setCookbooks] = React.useState([])

  const emptyCookbook = {
    title: "",
    yearPublished: Number
  }

  const [selectedCookbook, setSelectedCookbook] = React.useState(emptyCookbook)

  const getCookbooks = () => {
    fetch(url + "/api/cookbooks")
    .then(response => response.json())
    .then(data => {
      setCookbooks(data)
    })
  }
  // console.log('this is data', data)
 
  React.useEffect(() => {
    getCookbooks()
  }, [])

  const handleCreate = (newCookbook) => {
    fetch(url + "/api/cookbooks", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCookbook)
    }).then(() => {
      getCookbooks()
    })
  }

  const selectCookbook = (cookbook) => {
    setSelectedCookbook(cookbook)
  }

  const handleUpdate = (cookbook) => {
    fetch(url + "/api/cookbooks/" + cookbook._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cookbook)
    })
    .then(() => {
      getCookbooks()
    })
  }

  const deleteCookbook = (cookbook) => {
    fetch(url + "/api/cookbooks/" + cookbook._id, {
      method: "delete"
    })
    .then(() => {
      getCookbooks()
    })
  }

  return (
    <div className="App">
      <h1>Cookbooks</h1>
      <Link to="/create">
        <button>Create a Cookbook</button>
      </Link>
      <Switch>
      <Route exact path="/" render={(rp) => <Display {...rp} cookbooks={cookbooks} selectCookbook={selectCookbook} deleteCookbook={deleteCookbook}/>}/>
      <Route exact path="/create" render={(rp) => (
          <Form {...rp} label="create" cookbook={emptyCookbook} handleSubmit={handleCreate} />)}/>
      <Route exact path="/edit" render={(rp) => (
          <Form {...rp} label="update" cookbook={selectedCookbook} handleSubmit={handleUpdate} />)}/>
      </Switch>
    </div>
  );
}

export default App;
