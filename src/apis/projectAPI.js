import axiosClient from "./axiosClient";
import { domain } from "../config/setting";

const projectAPI = {
  getProjectAll: (acces) => {
    return axiosClient.get("Project/getAllProject", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  getProjectAllById: (Id, acces) => {
    return axiosClient.get("Project/getProjectDetail", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        id: Id,
      },
    });
  },
  updateProjectById: (values, projectId, acces) => {
    return axiosClient.put("Project/updateProject", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        projectId: projectId,
      },
    });
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
  addUserForProject: (values, acces) => {
    return axiosClient.post(`Project/assignUserProject`, values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
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
  updateTasks: (values, acces) => {
    return axiosClient.post(`${domain}/Project/updateTask`, values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  getTaskDetail: (taskId, acces) => {
    return axiosClient.get("Project/getTaskDetail", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        taskId: taskId,
      },
    });
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
