import axios from "axios";
import {History} from "history";
import {Dispatch} from "redux";
import {createAction} from "typesafe-actions";
import Project from "../models/Project";
import {clearProjectError, createProjectError} from "./errorActions";
import {CREATE_PROJECT, DELETE_PROJECT, GET_PROJECT, GET_PROJECTS} from "./types";

export const createProject = (project: Project, history: History) => async (dispatch: Dispatch) => {
    try {
        const res = await axios.post("/api/project", project);
        history.push("/dashboard");
        dispatch(clearProjectError());
    } catch (err) {
        dispatch(createProjectError(err));
    }
};

export const getProjects = () => async (dispatch: Dispatch) => {
    const res = await axios.get("/api/project/all");
    dispatch(getProjectsSuccess(res.data));
};
export const getProjectsSuccess = createAction(GET_PROJECTS, resolve => (projects: Project[]) => resolve(projects));

export const getProject = (id: number, history: History) => async (dispatch: Dispatch) => {
    try {
        const res = await axios.get(`/api/project/${id}`);
        dispatch(getProjectSuccess(res.data));
    } catch (err) {
        history.push("/dashboard");
    }
};
export const getProjectSuccess = createAction(GET_PROJECT, resolve => (project: Project) => resolve(project));

export const deleteProject = (projectIdentifier: string) => async (dispatch: Dispatch) => {
    if (window.confirm("Are you sure? This will delete the project and all the data related to it")) {
        await axios.delete(`/api/project/${projectIdentifier}`);
        dispatch(deleteProjectSuccess(projectIdentifier))
    }
};
export const deleteProjectSuccess = createAction(DELETE_PROJECT, resolve => (projectIdentifier: string) => resolve(projectIdentifier));
