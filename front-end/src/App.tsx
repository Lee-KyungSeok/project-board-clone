import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import './App.css';
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import AddProject from "./components/Project/AddProject";

class App extends Component {
    public render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact={true} path="/dashboard" component={Dashboard}/>
                    <Route exact={true} path="/addProject" component={AddProject}/>
                </div>
            </Router>
        );
    }
}

export default App;
