import {ActionType} from "typesafe-actions";
import * as actions from "../actions/errorActions";
import {CLEAR_ERRORS, GET_ERRORS} from "../actions/types";

export type ErrorAction = ActionType<typeof actions>

export interface ErrorState {
    readonly error: {
        projectName?: string,
        projectIdentifier?: string,
        description?: string,
    };
}

const initialState: ErrorState = {
    error: {}
};

const errorReducer = (state: ErrorState = initialState, action: ErrorAction): ErrorState => {

    switch (action.type) {
        case CLEAR_ERRORS:
            return {
                ...state,
                error: {}
            };
        case GET_ERRORS:
            const {response: {data = {}} = {}} = action.payload;

            return {
                ...state,
                error: data
            };
        default:
            return state;
    }
};

export default errorReducer;