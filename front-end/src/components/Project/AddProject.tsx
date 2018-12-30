import React from "react";
import Project from "../../models/Project";

interface IState {
    projectName: string;
    projectIdentifier: string;
    description: string;
    start_date: string;
    end_date: string;
}

class AddProject extends React.Component<{}, IState> {
    constructor(props) {
        super(props);

        this.state = {
            projectName: '',
            projectIdentifier: '',
            description: '',
            start_date: '',
            end_date: ''
        }
    }

    public render() {
        const {onInputChange, onSubmit} = this;
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
                                        className="form-control form-control-lg "
                                        placeholder="Project Name"
                                        name="projectName"
                                        value={projectName}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        value={projectIdentifier}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Project Description"
                                        name="description"
                                        value={description}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="start_date"
                                        value={start_date}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="end_date"
                                        value={end_date}
                                        onChange={onInputChange}
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

    public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const {target: {name, value}} = event;

        this.setState({
            [name]: value
        } as any);
    }

    public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        const {projectName, projectIdentifier, description, start_date, end_date} = this.state;

        const newProject: Project = new Project(projectName, projectIdentifier, description, start_date, end_date);

        console.log(newProject);
    }
}

export default AddProject