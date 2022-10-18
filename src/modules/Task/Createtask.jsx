import React, { useState, useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import useRequest from "hooks/useRequest";
import projectAPI from "apis/projectAPI";
import userAPI from "apis/userAPI";

import Swal from "sweetalert2";
import SCSS from "../Task/css/styleTask.module.scss";

import { Form, notification } from "antd";

import { Navigate, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material//Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";

import { MultiSelect } from "@mantine/core";

const Createtask = () => {
  const [selected, setSelected] = useState([]);

  const [project, setProject] = useState({
    projectId: 0,
    statusId: "",
    typeId: 0,
    priorityId: 0,
  });
  const navigate = useNavigate();
  const [variantName, setVariantName] = React.useState([]);
  const [state, setState] = React.useState({});

  const {
    data: dataProject,
    isLoading,
    error,
  } = useRequest(() => projectAPI.getProjectAll());

  const { data: dataStatus } = useRequest(() => projectAPI.getStatus());

  const { data: dataTaskType } = useRequest(() => projectAPI.getTaskType());

  const { data: dataPriority } = useRequest(() => projectAPI.getPriority());

  const { data: infoUser1 } = useRequest(() => userAPI.getAllUser());

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setProject((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  const { control, setValue, register, handleSubmit } = useForm({
    defaultValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: project.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: project.projectId,
      typeId: project.typeId,
      priorityId: project.priorityId,
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });
  const { data: handleRegister } = useRequest(
    (values) => projectAPI.createTask(values),
    { isManual: true }
  );
  const onSubmit = async (values) => {
    console.log(values);
    try {
      // chờ cho action login thành công
      await handleRegister(values);
      // Chuyển user về trang home
      // navigate("/");

      Swal.fire({
        icon: "success",
        title: "Thêm thành công",
        buttons: "Ok",
      });
    } catch (error) {
      notification.error({
        message: "Thêm thất bại",
        description: error,
      });
    }
  };

  // const handleChangeUser = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const handleChangeUser = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    const filterdValue = value.filter(
      (item) => variantName.findIndex((o) => o.userId === item.userId) >= 0
    );

    let duplicatesRemoved = value.filter((item, itemIndex) =>
      value.findIndex(
        (o, oIndex) => o.userId === item.userId && oIndex !== itemIndex
      )
    );

    // console.log(duplicatesRemoved);

    // let map = {};

    // for (let list of value) {
    //   map[Object.values(list).join('')] = list;
    // }
    // console.log('Using Map', Object.values(map));

    let duplicateRemoved = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.userId === item.userId) >= 0) {
        duplicateRemoved = duplicateRemoved.filter(
          (x) => x.userId === item.userId
        );
      } else {
        duplicateRemoved.push(item);
      }
    });

    setVariantName(duplicateRemoved);
  };

  return (
    <div className={SCSS.createTask}>
      <Form onFinish={handleSubmit(onSubmit)}>
        <h4>Create Project</h4>
        <div className={SCSS.controlcreateTask}>
          <Controller
            name="projectId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Project không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Project Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={project.projectId}
                    label="Project Name"
                    onChange={handleChange}
                    {...field}
                  >
                    {dataProject?.map((i) => {
                      return (
                        <MenuItem value={i.id} key={i.id}>
                          {i.projectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Form.Item>
            )}
          />
          <Controller
            name="taskName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Task Name không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <TextField
                  id="outlined-disabled"
                  label="Task Name"
                  multiline
                  maxRows={4}
                  fullWidth
                  placeholder="Task Name"
                  {...field}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="statusId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Status Id không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Status Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-autowidth"
                    value={project.statusId}
                    onChange={handleChange}
                    {...field}
                  >
                    {dataStatus?.map((i) => {
                      return (
                        <MenuItem value={i.statusId} key={i.statusId}>
                          {i.statusName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Form.Item>
            )}
          />
          <div className={SCSS.containerPriorityandType}>
            <Controller
              name="typeId"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Type Id không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <FormControl variant="filled" sx={{ minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={project.typeId}
                      label="Type Id"
                      onChange={handleChange}
                      {...field}
                    >
                      {dataTaskType?.map((i) => {
                        return (
                          <MenuItem value={i.id} key={i.id}>
                            {i.taskType}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Form.Item>
              )}
            />
            <Controller
              name="priorityId"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Priority Id không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <FormControl variant="filled" sx={{ minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Priority
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={project.priorityId}
                      label="Priority"
                      onChange={handleChange}
                      {...field}
                    >
                      {dataPriority?.map((i) => {
                        return (
                          <MenuItem value={i.priorityId} key={i.priorityId}>
                            {i.priority}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Form.Item>
              )}
            />
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  {...field}
                />
              </Form.Item>
            )}
          />

          {/* <Controller
            name="listUserAsign"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel htmlFor="age-native-simple">
                    Names here to select from
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={variantName}
                    onChange={handleChangeUser}
                    renderValue={(selected) =>
                      selected.map((x) => x.name).join(", ")
                    }
                    input={<OutlinedInput label="Tag" />}
                  >
                    {infoUser1?.map((name) => (
                      <MenuItem key={name.userId} value={name}>
                        <Checkbox checked={variantName.indexOf(name) > -1} />
                        <ListItemText primary={name.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Form.Item>
            )}
          /> */}
        </div>
        <Button type="submit" variant="outlined" className="mt-4">
          Create project
        </Button>
      </Form>
    </div>
  );
};

export default Createtask;
