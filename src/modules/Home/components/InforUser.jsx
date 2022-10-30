import React, { useEffect } from "react";
import useRequest from "hooks/useRequest";
import userAPI from "apis/userAPI";

import Swal from "sweetalert2";

import SCSS from "../css/style.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getUserByProjectId,
  removeUserz,
} from "modules/ProjectDetail/slices/projectSlices";

const InforUser = ({ setid }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const acces = user.accessToken;
  const { data: inforUser } = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(getUserByProjectId({ setid, acces }));
  }, [inforUser]);
  // const { data: handleRegister } = useRequest(
  //   (id) => userAPI.deleteProject(id),
  //   { isManual: true }
  // );
  // const removeUser = (projectId, userId) => {
  
  //   dispatch(removeUserz({ values: { projectId, userId }, acces }));
  // };
  const handleDeleteProject = async (projectId, userId ) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      await dispatch(removeUserz({ values: { projectId, userId }, acces }));
      Swal.fire({
        icon: "success",
        title: "Xóa thành công",
        buttons: "Ok",
      });
    } catch (error) {
      Swal.fire({
        text: error,
        icon: "error",
        title: "Xóa thất bại",
        buttons: "Ok",
      });
    }
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Avatar</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>

      {inforUser?.map((i) => (
        <tbody key={i.id}>
          {i.id === setid &&
            i.members.map((user) => (
              <tr key={user.userId}>
                <td>
                  <div className={SCSS.userId}>{user.userId}</div>
                </td>
                <td>
                  <div className={SCSS.avatarUser}>
                    <img src={user.avatar} />
                  </div>
                </td>
                <td>
                  <p>{user.name}</p>
                </td>
                <td>
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProject(i.id, user.userId)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      ))}
    </table>
  );
};

export default InforUser;
