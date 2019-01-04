class ProjectTaskModel {

    public id?: number;
    public projectSequence?: string;
    public summary: string;
    public acceptanceCriteria: string;
    public status: string;
    public priority: number;
    public dueDate: string;
    public projectIdentifier: string;

    constructor(id: number | undefined, projectSequence: string | undefined, summary: string, acceptanceCriteria: string, status: string, priority: number, dueDate: string, projectIdentifier: string) {
        this.id = id;
        this.projectSequence = projectSequence;
        this.summary = summary;
        this.acceptanceCriteria = acceptanceCriteria;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.projectIdentifier = projectIdentifier;
    }
}

export default ProjectTaskModel;