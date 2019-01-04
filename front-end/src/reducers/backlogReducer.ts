import {ActionType} from "typesafe-actions";
import * as actions from "../actions/backlogActions";
import {DELETE_PROJECT_TASK, GET_BACKLOG, GET_PROJECT_TASK} from "../actions/types";
import ProjectTaskModel from "../models/ProjectTaskModel";

export type BacklogAction = ActionType<typeof actions>

export interface BacklogState {
    projectTasks: ProjectTaskModel[],
    projectTask?: ProjectTaskModel
}

const initialState: BacklogState = {
    projectTasks: []
};

const backlogReducer = (state: BacklogState = initialState, action: BacklogAction): BacklogState => {
    switch (action.type) {
        case GET_BACKLOG:
            return {
                ...state,
                projectTasks: action.payload
            };
        case GET_PROJECT_TASK:
            return {
                ...state,
                projectTask: action.payload
            };
        case DELETE_PROJECT_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(projectTask => projectTask.projectSequence !== action.payload)
            };
        default:
            return state;
    }
};

export default backlogReducer;

