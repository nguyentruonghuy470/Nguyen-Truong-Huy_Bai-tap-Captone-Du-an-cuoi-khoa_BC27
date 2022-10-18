import React from "react";
import axiosClient from "./axiosClient";

const userAPI = {
  getAllUser: () => {
    return axiosClient.get(`Users/getUser`);
  },
  getUserByProjectId: (ProjectId) => {
    return axiosClient.get(`Users/getUserByProjectId?idProject=${ProjectId}`);
  },
};

export default userAPI;
