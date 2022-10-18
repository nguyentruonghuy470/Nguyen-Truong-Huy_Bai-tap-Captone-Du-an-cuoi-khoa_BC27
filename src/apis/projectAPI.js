import axiosClient from "./axiosClient";
import { domain } from "../config/setting";

const projectAPI = {
  getProjectAll: () => {
    return axiosClient.get("Project/getAllProject");
  },
  getProjectAllById: (movieId) => {
    console.log(movieId);
    return axiosClient.get(`${domain}/Project/getProjectDetail?id=${movieId}`);
  },
  updateProjectById: (values) => {
    console.log(values);
    return axiosClient.put(`Project/updateProject?projectId=${7604}`, values);
  },
  addProject: (values) => {
    return axiosClient.post(`Project/createProjectAuthorize`, values);
  },
  getProjectCategory: () => {
    return axiosClient.get(`ProjectCategory`);
  },
  deleteProject: (id) => {
    return axiosClient.delete(`Project/deleteProject?projectId=${id}`);
  },
  addUserForProject: (values) => {
    console.log(values);
    return axiosClient.post(`Project/assignUserProject`, values);
  },
  getStatus: () => {
    return axiosClient.get(`Status/getAll`);
  },
  getTaskType: () => {
    return axiosClient.get(`TaskType/getAll`);
  },
  getPriority: () => {
    return axiosClient.get(`Priority/getAll`);
  },
  createTask: (values) => {
    console.log(values);
    return axiosClient.post(`${domain}/Project/createTask`, values);
  },
  addComment: (values, acces) => {
    return axiosClient.post(`Comment/insertComment`, values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  getComment: (idTask) => {
    return axiosClient.get(`Comment/getAll?taskId=${idTask}`);
  },
  deleteComment: (idComment) => {
    return axiosClient.delete(`Comment/deleteComment?idComment=${idComment}`);
  },
  updateComment: (commentId, comment, acces) => {
    return axiosClient.put(
      `Comment/updateComment`,
      { contentComment: comment },
      {
        headers: {
          Authorization: `Bearer ${acces}`,
        },
        params: {
          id: commentId,
          contentComment: comment,
        },
      }
    );
  },
};

export default projectAPI;
