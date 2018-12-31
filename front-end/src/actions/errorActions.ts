import {AxiosError} from "axios";
import {createAction} from "typesafe-actions";
import {CLEAR_ERRORS, GET_ERRORS} from "./types";

export const createProjectError = createAction(GET_ERRORS, resolve => (error: AxiosError) => resolve(error));
export const clearProjectError = createAction(CLEAR_ERRORS);