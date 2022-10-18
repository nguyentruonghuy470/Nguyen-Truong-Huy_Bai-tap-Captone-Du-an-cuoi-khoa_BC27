import React from "react";
import useRequest from "hooks/useRequest";
import userAPI from "apis/userAPI";

import Swal from "sweetalert2";

import SCSS from "../css/style.module.scss";
const InforUser = ({setid}) => {
  const {
    data: infoUser,
    isLoading,
    error,
  } = useRequest(() => userAPI.getUserByProjectId(setid));
  const { data: handleRegister } = useRequest(
    (id) => userAPI.deleteProject(id),
    { isManual: true }
  );
  const handleDeleteProject = async (id) => {
    try {
      await handleRegister(id);
      Swal.fire({
        icon: "success",
        title: "Xóa thành công",
        buttons: "Ok",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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

      {infoUser?.map((i) => {
        return (
          <tbody key={i.userId}>
            <tr>
              <td>
                <div className={SCSS.userId}>{i.userId}</div>
              </td>
              <td>
                <div className={SCSS.avatarUser}>
                  <img src={i.avatar} />
                </div>
              </td>
              <td>
                <p>{i.name}</p>
              </td>
              <td>
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProject(i.userId)}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default InforUser;
