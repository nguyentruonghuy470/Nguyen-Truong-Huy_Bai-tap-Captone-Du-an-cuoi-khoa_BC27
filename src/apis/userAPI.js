import React from "react";
import axiosClient from "./axiosClient";
import { domain } from "../config/setting";

const userAPI = {
  getAllUser: () => {
    return axiosClient.get(`Users/getUser`);
  },

  createUserApi: (values) => {
    return axiosClient.post("Users/signup", values);
  },

  getUserByProjectId: (ProjectId, acces) => {
    return axiosClient.get(
      `${domain}/Users/getUserByProjectId?idProject=${ProjectId}`,
      {
        headers: {
          Authorization: `Bearer ${acces}`,
        },
      }
    );
  },

  removeUserProject: (values, acces) => {
    return axiosClient.post("Project/removeUserFromProject", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },

  updateUserApi: (values) => {
    console.log(values);
    return axiosClient.put("Users/editUser", {
      ...values,
    });
  },

  searchUser: (values, acces) => {
    console.log(values);
    return axiosClient.get(`Users/getUser?keyword=${values}`, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  deleteUserApi: (userId, acces) => {
    console.log(userId, acces);
    return axiosClient.delete("Users/deleteUser", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        id: userId,
      },
    });
  },
};

export default userAPI;
