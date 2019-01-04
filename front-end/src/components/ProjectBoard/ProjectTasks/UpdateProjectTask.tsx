import classNames from "classnames";
import {History} from "history";
import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Link} from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../../actions/backlogActions";
import ProjectTaskModel from "../../../models/ProjectTaskModel";
import {RootAction, RootState} from "../../../reducers";
import {ErrorState} from "../../../reducers/errorReducer";

interface IProps extends RouteComponentProps<any> {
    errors: ErrorState;
    projectTask?: ProjectTaskModel;
    getProjectTask: (backlogId: string, ptId: string, history: History) => any;
    updateProjectTask: (backlogId: string, ptId: string, projectTask: ProjectTaskModel, history: History) => any;
}

interface IState {
    id: number;
    projectSequence: string;
    summary: string;
    acceptanceCriteria: string;
    status: string;
    priority: number;
    dueDate: string;
    projectIdentifier: string;
}

class UpdateProjectTask extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps = (nextProps: IProps, prevState: IState) => {
        const {
            projectTask: {
                id = 0,
                projectSequence = '',
                summary = '',
                acceptanceCriteria = '',
                status = '',
                priority = 3,
                dueDate = '',
                projectIdentifier = ''
            } = {}
        } = nextProps;
        const {id: stateId} = prevState;

        if(id !== stateId) {
            return {
                id, projectSequence, summary, acceptanceCriteria, status, priority, dueDate, projectIdentifier
            }
        }

        return null;
    }

    constructor(props: IProps) {
        super(props);

        this.state = {
            id: 0,
            projectSequence: '',
            summary: '',
            acceptanceCriteria: '',
            status: '',
            priority: 3,
            dueDate: '',
            projectIdentifier: ''
        };
    }

    public componentDidMount = () => {
        const {match, history, getProjectTask} = this.props;
        const {params: {backlog_id, pt_id}} = match;
        getProjectTask(backlog_id, pt_id, history);
    }

    public render() {

        const {onChange, onSubmit} = this;
        const {match, errors} = this.props;
        const {summary, acceptanceCriteria, status, priority, dueDate, projectIdentifier} = this.state;

        const {params: {backlog_id}} = match;
        const {error} = errors;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${backlog_id}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.summary
                                        })}
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={summary}
                                        onChange={onChange}
                                    />
                                    {error.summary && (
                                        <div className="invalid-feedback">{error.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={acceptanceCriteria}
                                        onChange={onChange}
                                    />
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="dueDate"
                                        value={dueDate}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="priority"
                                        value={priority}
                                        onChange={onChange}
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="status"
                                        value={status}
                                        onChange={onChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (event) => {
        const {target: {name, value}} = event;

        this.setState({
            [name]: value
        } as any);
    }

    public onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const { history, updateProjectTask} = this.props;
        const {id, projectSequence, summary, acceptanceCriteria, status, priority, dueDate, projectIdentifier} = this.state;
        const newTask = new ProjectTaskModel(id, projectSequence, summary, acceptanceCriteria, status, priority, dueDate, projectIdentifier);

        updateProjectTask(projectIdentifier, projectSequence, newTask, history);
    }
}

const mapStateToProps = (state: RootState) => ({
    errors: state.errors,
    projectTask: state.backlog.projectTask
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    getProjectTask: (backlogId: string, ptId: string, history: History) => actions.getProjectTask(backlogId, ptId, history),
    updateProjectTask: (backlogId: string, ptId: string, projectTask: ProjectTaskModel, history: History) => actions.updateProjectTask(backlogId, ptId, projectTask, history)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectTask);