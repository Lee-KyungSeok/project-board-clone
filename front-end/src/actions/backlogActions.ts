import axios from "axios";
import {History} from "history";
import {Dispatch} from "redux";
import {createAction} from "typesafe-actions";
import ProjectTaskModel from "../models/ProjectTaskModel";
import {clearProjectError, createProjectError} from "./errorActions";
import {DELETE_PROJECT_TASK, GET_BACKLOG, GET_PROJECT_TASK} from "./types";

export const addProjectTask = (backlogId: string, projectTask: ProjectTaskModel, history: History) => async (dispatch: Dispatch) => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
        dispatch(clearProjectError());
    } catch (err) {
        dispatch(createProjectError(err));
    }
};

export const getBacklog = (backlogId: string) => async (dispatch: Dispatch) => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}`);
        dispatch(getBacklogSuccess(res.data));
    } catch (err) {
        dispatch(createProjectError(err));
    }

};
export const getBacklogSuccess = createAction(GET_BACKLOG, resolve => (projectTasks: ProjectTaskModel[]) => resolve(projectTasks));

export const getProjectTask = (backlogId: string, ptId: string, history: History) => async (dispatch: Dispatch) => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}/${ptId}`);
        dispatch(getProjectTaskSuccess(res.data));
    } catch (err) {
        history.push("/dashboard");
    }
};
export const getProjectTaskSuccess = createAction(GET_PROJECT_TASK, resolve => (projectTask: ProjectTaskModel) => resolve(projectTask));

export const updateProjectTask = (backlogId: string, ptId: string, projectTask: ProjectTaskModel, history: History) =>  async (dispatch: Dispatch) => {
    try {
        await axios.patch(`/api/backlog/${backlogId}/${ptId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
        dispatch(clearProjectError());
    } catch (err) {
        dispatch(createProjectError(err));
    }
};

export const deleteProjectTask = (backlogId: string, ptId: string) => async (dispatch: Dispatch) => {
    if (window.confirm(`You are deleting project task ${ptId}, this action cannot be undone`)) {
        await axios.delete(`/api/backlog/${backlogId}/${ptId}`);
        dispatch(deleteProjectTaskSuccess(ptId));
    }
}
export const deleteProjectTaskSuccess = createAction(DELETE_PROJECT_TASK, resolve => (ptId: string) => resolve(ptId));


