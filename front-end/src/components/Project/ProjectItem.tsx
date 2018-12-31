import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";
import * as projectActions from "../../actions/projectActions";
import Project from "../../models/Project";
import {RootAction, RootState} from "../../reducers";

interface IProps {
    project: Project;
    deleteProject: (identifier: string) => any;
}

class ProjectItem extends React.Component<IProps> {

    public render() {

        const {onDeleteClick} = this;
        const {project: {projectName, projectIdentifier, description}} = this.props;

        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">{projectIdentifier}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{projectName}</h3>
                            <p>{description}</p>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <a href="#">
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                                    </li>
                                </a>
                                <Link to={`/updateProject/${projectIdentifier}`}>
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-1"> Update Project Info</i>
                                    </li>
                                </Link>

                                <li className="list-group-item delete" onClick={() => onDeleteClick(projectIdentifier)}>
                                    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    public onDeleteClick = (identifier: string) => {
        const {deleteProject} = this.props;
        deleteProject(identifier);
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    deleteProject: (identifier: string) => projectActions.deleteProject(identifier)
}, dispatch);

export default connect(null, mapDispatchToProps)(ProjectItem);