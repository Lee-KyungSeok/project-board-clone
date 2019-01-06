import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {bindActionCreators, Dispatch} from "redux";
import {logout, setUser} from "./actions/securityActions";
import './App.css';
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask"
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";
import UserModel from "./models/UserModel";
import {RootAction, RootState} from "./reducers";
import SecuredRoute from "./securityUtils/SecureRoute";
import setJWTToken from "./securityUtils/setJWTToken";

interface IProps {
    setUserInfo: (decodedJWT: UserModel) => any;
    logUserOut: () => any;
}

class App extends Component<IProps> {

    public constructor(props: IProps) {
        super(props);

        const {setUserInfo, logUserOut} = this.props;
        const jwtToken = localStorage.jwtToken;

        if(jwtToken) {
            setJWTToken(jwtToken);
            const decodedJWTToken: UserModel = jwtDecode(jwtToken);
            setUserInfo(decodedJWTToken);

            console.log(decodedJWTToken);

            const currentTime = Date.now() / 1000;
            if(decodedJWTToken.exp && decodedJWTToken.exp < currentTime) {
                logUserOut();
                window.location.href = "/";
            }
        }
    }

    public render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact={true} path="/" component={Landing}/>
                    <Route exact={true} path="/register" component={Register}/>
                    <Route exact={true} path="/login" component={Login}/>

                    <Switch>
                        <SecuredRoute exact={true} path="/dashboard" component={Dashboard}/>
                        <SecuredRoute exact={true} path="/addProject" component={AddProject}/>
                        <SecuredRoute exact={true} path="/updateProject/:id" component={UpdateProject}/>
                        <SecuredRoute exact={true} path="/projectBoard/:id" component={ProjectBoard}/>
                        <SecuredRoute exact={true} path="/addProjectTask/:id" component={AddProjectTask}/>
                        <SecuredRoute exact={true} path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    setUserInfo: (decodedJWT: UserModel) => setUser(decodedJWT),
    logUserOut: () => logout()
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
