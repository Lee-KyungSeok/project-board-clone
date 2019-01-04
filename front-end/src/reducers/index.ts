import {combineReducers} from "redux";
import backlogReducer, {BacklogAction, BacklogState} from "./backlogReducer";
import errorReducer, {ErrorAction, ErrorState} from "./errorReducer";
import projectReducer, {ProjectAction, ProjectState} from "./projectReducer";

export interface RootState {
    errors: ErrorState
    project: ProjectState
    backlog: BacklogState
}

export type RootAction =
    | ErrorAction
    | ProjectAction
    | BacklogAction

export default combineReducers({
    errors: errorReducer,
    project: projectReducer,
    backlog: backlogReducer
});