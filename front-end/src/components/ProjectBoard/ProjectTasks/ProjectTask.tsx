import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../../actions/backlogActions";
import ProjectTaskModel from "../../../models/ProjectTaskModel";
import {RootAction} from "../../../reducers";

interface IProps {
    projectTask: ProjectTaskModel;
    deleteProjectTask: (backlogId: string, ptId: string) => any;
}

class ProjectTask extends React.Component<IProps> {

    public render() {

        const {onDeleteClick} = this;
        const {projectTask} = this.props;

        let priorityString;
        let priorityClass;
        if(projectTask.priority === 1) {
            priorityClass = "bg-danger text-light";
            priorityString = "High"
        } else if(projectTask.priority === 2) {
            priorityClass = "bg-warning text-light";
            priorityString = "MEDIUM";
        } else {
            priorityClass = "bg-info text-light";
            priorityString = "LOW";
        }

        return (
            <div className="card mb-1 bg-light">
                <div className={`card-header text-primary ${priorityClass}`}>
                    ID: {projectTask.projectSequence} -- Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{projectTask.summary}</h5>
                    <p className="card-text text-truncate ">
                        {projectTask.acceptanceCriteria}
                    </p>
                    <Link to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button className="btn btn-danger ml-4" onClick={onDeleteClick}>Delete</button>
                </div>
            </div>
        );
    }

    public onDeleteClick: React.MouseEventHandler<HTMLButtonElement> = event => {
        const {projectTask, deleteProjectTask} = this.props;
        const {projectIdentifier, projectSequence} = projectTask;
        if(projectSequence) {
            deleteProjectTask(projectIdentifier, projectSequence);
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    deleteProjectTask: (backlogId: string, ptId: string) => actions.deleteProjectTask(backlogId, ptId)
}, dispatch);

export default connect(null, mapDispatchToProps)(ProjectTask);