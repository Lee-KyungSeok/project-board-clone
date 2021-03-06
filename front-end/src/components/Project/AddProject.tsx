import classNames from "classnames";
import {History} from "history";
import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";
import * as projectActions from "../../actions/projectActions";
import Project from "../../models/Project";
import {RootAction, RootState} from "../../reducers";
import {ErrorState} from "../../reducers/errorReducer";

interface IProps extends RouteComponentProps<any> {
    createProject: (project: Project, history: History) => any;
    errors: ErrorState;
}

interface IState {
    projectName: string;
    projectIdentifier: string;
    description: string;
    start_date: string;
    end_date: string;
}

class AddProject extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            projectName: '',
            projectIdentifier: '',
            description: '',
            start_date: '',
            end_date: ''
        };
    }

    public render() {
        const {onChange, onSubmit} = this;
        const {errors : {error} } = this.props;
        const {projectName, projectIdentifier, description, start_date, end_date} = this.state;

        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr/>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.projectName
                                        })}
                                        placeholder="Project Name"
                                        name="projectName"
                                        value={projectName}
                                        onChange={onChange}
                                    />
                                    { error.projectName && (
                                        <div className="invalid-feedback">{error.projectName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.projectIdentifier
                                        })}
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        value={projectIdentifier}
                                        onChange={onChange}
                                    />
                                    { error.projectIdentifier && (
                                        <div className="invalid-feedback">{error.projectIdentifier}</div>
                                    )}                                </div>
                                <div className="form-group">
                                    <textarea
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.description
                                        })}
                                        placeholder="Project Description"
                                        name="description"
                                        value={description}
                                        onChange={onChange}
                                    />
                                    { error.description && (
                                        <div className="invalid-feedback">{error.description}</div>
                                    )}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="start_date"
                                        value={start_date}
                                        onChange={onChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="end_date"
                                        value={end_date}
                                        onChange={onChange}
                                    />
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
        )
    }

    public onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const {target: {name, value}} = event;

        this.setState({
            [name]: value
        } as any);
    }

    public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        const {createProject, history} = this.props;
        const {projectName, projectIdentifier, description, start_date, end_date} = this.state;

        const newProject: Project = new Project(undefined, projectName, projectIdentifier, description, start_date, end_date);

        createProject(newProject, history);
    }
}

const mapStateToProps = (state: RootState) => ({
    errors: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    createProject: (project: Project, history: History) => projectActions.createProject(project, history)
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProject);