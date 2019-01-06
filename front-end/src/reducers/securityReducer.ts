import {ActionType} from "typesafe-actions";
import * as actions from "../actions/securityActions";
import {CLEAR_CURRENT_USER, SET_CURRENT_USER} from "../actions/types";
import UserModel from "../models/UserModel";

export type SecurityAction = ActionType<typeof actions>;

export interface SecurityState {
    validToken: boolean;
    user: UserModel | {};
}

const initialState: SecurityState = {
    validToken: false,
    user: {}
};

const securityReducer = (state: SecurityState = initialState, action: SecurityAction): SecurityState => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: !!action.payload,
                user: action.payload
            };

        case CLEAR_CURRENT_USER:
            return {
                ...state,
                validToken: false,
                user: {}
            };
        default:
            return state
    }
};

export default securityReducer;