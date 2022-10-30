import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import SCSS from "../css/styleUser.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
  getdetailUser,
} from "modules/ProjectDetail/slices/userSlices";

const { Header, Sider, Content } = Layout;

const ListUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const userz = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const handleDelte = (userId) => {
    dispatch(deleteUser({ userId: userId, acc: userz.accessToken }));
  };
  const handleSelect = (user) => {
    localStorage.setItem("userdetail", JSON.stringify(user));
    navigate(`/user/${user.userId}`);
  };

  return (
    <div>
      <div className="row m-0">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={SCSS.infoNameUser}>
            {userz ? (
              <div>
                <span className="text-white">Hello! {userz.name}</span>
              </div>
            ) : null}
          </div>
          <div />
          <div
            className={SCSS.navChoose}
            onClick={() => {
              navigate("/");
            }}
          >
            <UserOutlined className={SCSS.icon} />
            <a className="text-decoration-none text-white ">Projet List</a>
          </div>
          <div
            className={SCSS.navChoose}
            onClick={() => {
              navigate("/CreateUser");
            }}
          >
            <VideoCameraOutlined className={SCSS.icon} />
            <a className="text-decoration-none text-white">Create user</a>
          </div>
          <div className={SCSS.navChoose}>
            <UploadOutlined className={SCSS.icon} />
            <a className="text-decoration-none text-white">User List</a>
          </div>
          <div className={SCSS.hover}></div>
        </Sider>
        <div className="col-sm-10">
          <h1 className="text-center"> USERS LIST</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>mail</th>
                <th>PhoneNumber</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                ?.map((user) => {
                  return (
                    <tr key={user.userId}>
                      <td>{user.userId}</td>
                      <td>
                        <img src={user.avatar} alt="" />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>
                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleSelect(user)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelte(user.userId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListUser;
