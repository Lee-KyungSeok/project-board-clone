import classNames from "classnames";
import {History} from "history";
import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {bindActionCreators, Dispatch} from "redux";
import * as projectActions from "../../actions/projectActions";
import Project from "../../models/Project";
import {RootAction, RootState} from "../../reducers";
import {ErrorState} from "../../reducers/errorReducer";

interface IProps extends RouteComponentProps<any> {
    project?: Project;
    errors: ErrorState;
    getProject: (id: number, history: History) => any;
    createProject: (project: Project, history: History) => any;
}

interface IState {
    id: number;
    projectName: string;
    projectIdentifier: string;
    description: string;
    start_date: string;
    end_date: string;
}

class UpdateProject extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps = (nextProps: IProps, prevState: IState) => {
        const {project: {id=0, projectName='', projectIdentifier='', description='', start_date='', end_date=''} = {} } = nextProps;
        const {id :stateId} = prevState;
        if(id !== stateId) {
            return {
                id, projectName, projectIdentifier, description, start_date, end_date
            }
        }
        return null;
    }

    constructor(props: IProps) {
        super(props);

        this.state = {
            id: 0,
            projectName: '',
            projectIdentifier: '',
            description: '',
            start_date: '',
            end_date: ''
        };
    }

    public componentDidMount = () => {
        const {history, match, getProject} = this.props;
        const {params: {id}} = match;
        getProject(id, history);
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
                            <h5 className="display-4 text-center">Update Project form</h5>
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
                                        className="form-control form-control-lg"
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        disabled={true}
                                        value={projectIdentifier}
                                        onChange={onChange}
                                    />
                                </div>
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
                                        value={start_date? start_date : ''}
                                        onChange={onChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="end_date"
                                        value={end_date? end_date : ''}
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
        );
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
        const {id, projectName, projectIdentifier, description, start_date, end_date} = this.state;

        const updateProject: Project = new Project(id, projectName, projectIdentifier, description, start_date, end_date);

        createProject(updateProject, history);
    }
}

const mapStateToProps = (state: RootState) => ({
    project: state.project.project,
    errors: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    getProject: (id: number, history: History) => projectActions.getProject(id, history),
    createProject: (project: Project, history: History) => projectActions.createProject(project, history)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);