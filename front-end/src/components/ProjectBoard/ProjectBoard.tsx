import React from "react";
import {connect} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions/backlogActions";
import ProjectTaskModel from "../../models/ProjectTaskModel";
import {RootAction, RootState} from "../../reducers";
import {ErrorState} from "../../reducers/errorReducer";
import Backlog from "./Backlog";

interface IProps extends RouteComponentProps<any> {
    errors: ErrorState;
    projectTasks: ProjectTaskModel[];
    getBacklog: (backlogId: string) => any;
}

class ProjectBoard extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount = () => {
        const {match, getBacklog} = this.props;
        const {params: {id}} = match;
        getBacklog(id);
    }

    public render() {
        const {match, projectTasks, errors} = this.props;
        const {params: {id}} = match;
        const {error} = errors;

        const boardAlgorithm = (err, tasks) => {
            if (tasks.length < 1) {
                if (err.projectNotFound) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            {err.projectNotFound}
                        </div>
                    );
                } else if (err.projectIdentifier) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            {err.projectIdentifier}
                        </div>
                    );
                } else {
                    return (
                        <div className="alert alert-info text-center" role="alert">
                            No Project Tasks on this board
                        </div>
                    );
                }
            } else {
                return <Backlog projectTasks={tasks} />;
            }
        };

        const BoardContent = boardAlgorithm(error, projectTasks);

        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {BoardContent}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    projectTasks: state.backlog.projectTasks,
    errors: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    getBacklog: (backlogId: string) => actions.getBacklog(backlogId)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);