import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faBars,
  faMagnifyingGlass,
  faPlus,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import SCSS from "../css/style.module.scss";
import * as images from "../images";

import useRequest from "hooks/useRequest";
import projectAPI from "apis/projectAPI";
import userAPI from "apis/userAPI";

import Modal from "./Modal";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import InforUser from "./InforUser";

import { Popover, Text, Button } from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import {
  assignUserProject,
  getProjectAll,
  deleteProject,
} from "modules/ProjectDetail/slices/projectSlices";

import { logout } from "modules/Authentication/slices/authSlice";

import {
  changeSearch,
  searchUser,
} from "modules/ProjectDetail/slices/userSlices";
// import { searchUser } from "modules/ProjectDetail/slices/userSlices";
const Management = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [projectId, setProjectId] = React.useState(8626);

  const user = JSON.parse(localStorage.getItem("user"));

  const { data: projects, listuser: users } = useSelector(
    (state) => state.project
  );
  const { searchUser: adu } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProjectAll());
  }, []);

  const {
    data: movies,
    isLoading,
    error,
  } = useRequest(() => projectAPI.getProjectAll());

  const handleClose = () => {
    setOpen(false);
  };
  //   return i.id;
  // });
  // console.log(row1);
  // const rows = [
  //   { id: row1, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  const sidebarClass = sidebarOpen ? `${SCSS.sidebaropen}` : `${SCSS.sidebar}`;
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const { data: handleDeleteProject } = useRequest(
    (id) => projectAPI.deleteProject(id),
    { isManual: true }
  );

  const submitDeleteProject = async (id) => {
    try {
      await handleDeleteProject(id);
      Swal.fire({
        icon: "success",
        title: "Xóa Project thành công",
        buttons: "Ok",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      Swal.fire({
        text: error,
        icon: "error",
        title: "Xóa Project thất bại",
        buttons: "Ok",
      });
    }
  };
  const handleDelete = (projectId, acces) => {
    dispatch(deleteProject({ projectId, acces }));
  };

  const handleGetProductId = (id) => {
    setOpen(true);
    setProjectId(id);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const submitAddUser = async (idUser, projectId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    const info = {
      projectId: projectId,
      userId: idUser,
    };
    try {
      await dispatch(assignUserProject({ info, acces })).unwrap();
      // await handleAddUser(info);
      Swal.fire({
        icon: "success",
        title: "Thêm thành viên thành công",
        buttons: "Ok",
      });
    } catch (error) {
      Swal.fire({
        text: error,
        icon: "error",
        title: "Thêm thành viên thất bại",
        buttons: "Ok",
      });
    }
  };

  const { data: infoUser1 } = useRequest(() => userAPI.getAllUser());

  const handleSearch = (evt) => {
    setIsFetching(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const acce = user.accessToken;
    if (evt.key !== "Enter") return;

    const { value } = evt.target;
    dispatch(searchUser({ value, acce }));
  };
  const handleMovieShowing = (projectId) => {
    navigate(`/projectDetail/${projectId}`);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={SCSS.containerManagement}>
      <div className={sidebarClass}>
        <div className={SCSS.iconUser}>
          <FontAwesomeIcon
            icon={faBars}
            color="#9e9e9e"
            onClick={handleViewSidebar}
          />
        </div>

        <div className={SCSS.example1}>
          <FontAwesomeIcon className="iconUser" icon={faPlus} color="#9e9e9e" />
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            size="20px"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            Create
          </Text>
        </div>

        <div className={SCSS.example1}>
          <FontAwesomeIcon
            className="iconUser"
            icon={faMagnifyingGlass}
            color="#9e9e9e"
          />
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            size="20px"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            Search
          </Text>
        </div>
      </div>
      <div className={SCSS.projectTask}>
        <div className={SCSS.projectTitle}>
          <img className={SCSS.imgIcon} src={images.image1} />
          <div>
            <h5>CyberLearn.vn</h5>
            <span>Report bugs</span>
          </div>
        </div>
        <div className={SCSS.projectFunction}>
          <div>
            <FontAwesomeIcon
              className="iconUser"
              icon={faGear}
              color="#9e9e9e"
            />
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              size="16"
              weight={700}
              style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >
              <Link to="/task">Project Management</Link>
            </Text>
          </div>
          <div>
            <FontAwesomeIcon
              className="iconUser"
              icon={faGear}
              color="#9e9e9e"
            />
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              size="16"
              weight={700}
              style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >
              <Link to="/createProject">Create project</Link>
            </Text>
          </div>
          <div>
            <FontAwesomeIcon
              className="iconUser"
              icon={faGear}
              color="#9e9e9e"
            />
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              size="16"
              weight={700}
              style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >
              <Link to="/user">User Management</Link>
            </Text>
          </div>
        </div>
      </div>
      <div className={SCSS.projectManagement}>
        <div className={SCSS.containerProjectManagement}>
          <div className="d-flex justify-content-between">
            <div>
              <h4>Project management</h4>
            </div>
            {user ? (
              <div className={SCSS.infoUser}>
                <div className={SCSS.inforUserName}>
                  <span>
                    <FontAwesomeIcon
                      className="iconUser"
                      icon={faCircleUser}
                      color="#9e9e9e"
                    />
                  </span>
                  <h3>{user.name}</h3>
                </div>
                <div>
                  <Button onClick={handleLogout}>Logout</Button>
                </div>
              </div>
            ) : null}
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Creator</th>
                <th>Members</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.projectName}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.creator.name}</td>
                  <td>
                    <div className={SCSS.members}>
                      {product.members.map((i, index) => (
                        <div key={index} className={SCSS.containerMember}>
                          <div>
                            <img src={i.avatar} />
                          </div>
                        </div>
                      ))}
                      <div className={SCSS.infoMember}>
                        <InforUser setid={product.id} />
                      </div>
                    </div>
                    <Popover
                      width={200}
                      position="right"
                      withArrow
                      shadow="md"
                      styles={{}}
                    >
                      <Popover.Target>
                        <Button type="submit">
                          <FontAwesomeIcon
                            className="iconUser"
                            icon={faPlus}
                            color="#9e9e9e"
                          />
                        </Button>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <div className={SCSS.containerTextUser}>
                          <Text size="sm">Add User</Text>
                        </div>
                        <div className={SCSS.containerAddUser}>
                          <div className={SCSS.containerSearch}>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search your todo"
                              onKeyDown={handleSearch}
                            />
                          </div>

                          {isFetching
                            ? adu?.map((i) => {
                                return (
                                  <div key={i.userId}>
                                    <p
                                      onClick={() =>
                                        submitAddUser(i.userId, product.id)
                                      }
                                    >
                                      {i.name}
                                    </p>
                                  </div>
                                );
                              })
                            : infoUser1?.map((i) => {
                                return (
                                  <div key={i.userId}>
                                    <p
                                      onClick={() =>
                                        submitAddUser(i.userId, product.id)
                                      }
                                    >
                                      {i.name}
                                    </p>
                                  </div>
                                );
                              })}
                        </div>
                      </Popover.Dropdown>
                    </Popover>
                  </td>
                  <td>
                    <div className={SCSS.projectManagementButton}>
                      <button
                        type="button"
                        className="btn btn-primary me-2"
                        onClick={() => handleMovieShowing(product.id)}
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleGetProductId(product.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDelete(product.id, user.accessToken)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal handleClose={handleClose} open={open} projectId={projectId} />
        </div>
      </div>
    </div>
  );
};

export default Management;
