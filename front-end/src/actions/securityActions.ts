import axios from "axios";
import {History} from "history";
import jwtDecode from "jwt-decode";
import {Dispatch} from "redux";
import {createAction} from "typesafe-actions";
import UserModel from "../models/UserModel";
import setJWTToken from "../securityUtils/setJWTToken";
import {clearProjectError, createProjectError} from "./errorActions";
import {CLEAR_CURRENT_USER, SET_CURRENT_USER} from "./types"

export const createNewUser = (newUser: UserModel, history: History) => async (dispatch: Dispatch) => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch(clearProjectError());
    } catch (err) {
        dispatch(createProjectError(err));
    }
};

export const login = (username: string, password: string) => async (dispatch: Dispatch) => {
    try {
        const res = await axios.post("/api/users/login", {username, password});
        const {data: {token}} = res;

        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);

        // set token in header ***
        setJWTToken(token);

        // decode token on React
        const decoded: UserModel = jwtDecode(token);

        // dispatch to our securityReducer
        dispatch(setUser(decoded));
        dispatch(clearProjectError());

    } catch (err) {
        dispatch(createProjectError(err));
    }
};
export const setUser = createAction(SET_CURRENT_USER, resolve => (decodedJwt: UserModel) => resolve(decodedJwt));

export const logout = () => (dispatch: Dispatch) => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch(clearUser());
};
export const clearUser = createAction(CLEAR_CURRENT_USER);