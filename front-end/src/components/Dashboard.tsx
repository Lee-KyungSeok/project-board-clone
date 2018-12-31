import React from 'react';
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {bindActionCreators, Dispatch} from "redux";
import * as projectActions from "../actions/projectActions";
import Project from "../models/Project";
import {RootAction, RootState} from "../reducers";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";

interface IProps extends RouteComponentProps<any> {
    projects: Project[];
    getProjects: () => void;
}

class Dashboard extends React.Component<IProps> {

    public componentDidMount = () => {
        const {getProjects} = this.props;
        getProjects();
    }

    public render() {
        const {projects} = this.props;
        return(
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br/>
                            <CreateProjectButton/>
                            <br/>
                            <hr/>
                            { projects.map(project => (
                                <ProjectItem key={project.id} project={project}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    projects: state.project.projects
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    getProjects: () => projectActions.getProjects()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);