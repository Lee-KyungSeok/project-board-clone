import {ActionType} from "typesafe-actions";
import * as actions from "../actions/projectActions";
import {DELETE_PROJECT, GET_PROJECT, GET_PROJECTS} from "../actions/types";
import Project from "../models/Project";

export type ProjectAction = ActionType<typeof actions>

export interface ProjectState {
    projects: Project[];
    project?: Project;
}

const initialState: ProjectState = {
    projects: []
};

const projectReducer = (state: ProjectState = initialState, action: ProjectAction): ProjectState => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.projectIdentifier !== action.payload)
            }
        default:
            return state;
    }
};

export default projectReducer;