class Project {

    public id?: number;
    public projectName: string;
    public projectIdentifier: string;
    public description: string;
    public start_date: string;
    public end_date: string;


    constructor(id: number | undefined, projectName: string, projectIdentifier: string, description: string, start_date: string, end_date: string) {
        this.id = id;
        this.projectName = projectName;
        this.projectIdentifier = projectIdentifier;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

export default Project;