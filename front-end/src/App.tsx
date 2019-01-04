import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import './App.css';
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask"

class App extends Component {
    public render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact={true} path="/dashboard" component={Dashboard}/>
                    <Route exact={true} path="/addProject" component={AddProject}/>
                    <Route exact={true} path="/updateProject/:id" component={UpdateProject}/>
                    <Route exact={true} path="/projectBoard/:id" component={ProjectBoard}/>
                    <Route exact={true} path="/addProjectTask/:id" component={AddProjectTask}/>
                    <Route exact={true} path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
                </div>
            </Router>
        );
    }
}

export default App;
