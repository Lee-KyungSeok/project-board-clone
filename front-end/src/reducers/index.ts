import {combineReducers} from "redux";
import errorReducer, {ErrorAction, ErrorState} from "./errorReducer";
import projectReducer, {ProjectAction, ProjectState} from "./projectReducer";

export interface RootState {
    errors: ErrorState
    project: ProjectState
}

export type RootAction =
    | ErrorAction
    | ProjectAction;

export default combineReducers({
    errors: errorReducer,
    project: projectReducer
});