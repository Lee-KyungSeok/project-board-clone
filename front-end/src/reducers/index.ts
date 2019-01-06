import {combineReducers} from "redux";
import backlogReducer, {BacklogAction, BacklogState} from "./backlogReducer";
import errorReducer, {ErrorAction, ErrorState} from "./errorReducer";
import projectReducer, {ProjectAction, ProjectState} from "./projectReducer";
import SecurityReducer, {SecurityAction, SecurityState} from "./securityReducer";

export interface RootState {
    errors: ErrorState
    project: ProjectState
    backlog: BacklogState
    security: SecurityState
}

export type RootAction =
    | ErrorAction
    | ProjectAction
    | BacklogAction
    | SecurityAction

export default combineReducers({
    errors: errorReducer,
    project: projectReducer,
    backlog: backlogReducer,
    security: SecurityReducer
});