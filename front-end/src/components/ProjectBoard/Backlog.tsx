import React from "react";
import ProjectTaskModel from "../../models/ProjectTaskModel";
import ProjectTask from "./ProjectTasks/ProjectTask";

interface IProps {
    projectTasks: ProjectTaskModel[]
}

class Backlog extends React.Component<IProps> {

    public render() {

        const {projectTasks} = this.props;

        const ProjectTaskComponents: JSX.Element[] = projectTasks.map(projectTask => (
            <ProjectTask key={projectTask.id} projectTask={projectTask}/>
        ));

        const todoTaskComponents: JSX.Element[] = [];
        const inProgressITaskComponents: JSX.Element[] = [];
        const doneTaskComponents: JSX.Element[] = [];

        for (const taskComponent of ProjectTaskComponents) {

            if (taskComponent.props.projectTask.status === "TO_DO") {
                todoTaskComponents.push(taskComponent);
            }

            if (taskComponent.props.projectTask.status === "IN_PROGRESS") {
                inProgressITaskComponents.push(taskComponent);
            }

            if (taskComponent.props.projectTask.status === "DONE") {
                doneTaskComponents.push(taskComponent);
            }
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {todoTaskComponents}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {inProgressITaskComponents}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {doneTaskComponents}
                    </div>
                </div>
            </div>
        );
    }
}

export default Backlog;