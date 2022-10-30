import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Form, notification } from "antd";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { useDispatch, useSelector } from "react-redux";
import {
  getProjectAllById,
  getTaskDetail,
  getStatus,
  updateTasks,
  getAllpri,
  getAlltas,
} from "../slices/taskSlices";
import Select from "@mui/material/Select";

import Swal from "sweetalert2";

import SCSS from "../css/styleProjectDetail.module.scss";
const UpdateTask = ({ handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { taskId } = useSelector((state) => state.task);
  const user = JSON.parse(localStorage.getItem("user"));
  const acce = user.accessToken;

  const [project, setProject] = useState({
    statusId: "",
    typeId: 0,
    priorityId: 0,
  });
  const {
    data1: taskss,
    updatetask: task1,
    getall,
    getallpri,
    getalltas,
  } = useSelector((state) => state.taskS);
  const taskIds = taskss.id;
  useEffect(() => {
    // dispatch(getProjectAllById({ taskId: projectId }));
    dispatch(getTaskDetail({ taskId, acce }));
    dispatch(getStatus());
    dispatch(getAllpri(taskId));
    dispatch(getAlltas());
  }, []);
  // const [description, setDescription] = React.useState(task1?.description);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      listUserAsign: [],
      taskId: taskId,
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: taskIds,
      typeId: "",
      priorityId: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      await dispatch(updateTasks({ values, acces })).unwrap();
      // navigate(`/task/${taskIds}`);
      Swal.fire({
        icon: "success",
        title: "update task thành công",
        buttons: "Ok",
      });
    } catch (error) {
      notification.error({
        message: "update task thất bại",
        description: error,
      });
    }
  };

  const setInput = () => {
    setValue("taskName", `${task1.taskName}`);
    setValue("originalEstimate", task1.originalEstimate);
    setValue("timeTrackingSpent", task1.timeTrackingSpent);
    setValue("timeTrackingRemaining", task1.timeTrackingRemaining);
    setValue("description", task1.description);
  };
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setProject((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
    setValue("taskName", `${task1?.taskName}`);
    setValue("originalEstimate", value);
    setValue("timeTrackingSpent", value);
    setValue("timeTrackingRemaining", value);
    setValue("description", value);
  };

  return (
    <div className={SCSS.updateTasks}>
      {/* <Form onFinish={handleSubmit(onSubmit)}>
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
                  {getall?.map((i) => {
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

        <h5>ASSIGNEES</h5>
        <h5>PRIORITY</h5>
        <h5>ORIGINAL ESTIMATE (HOURS)</h5>
        <button>Submit</button>
      </Form> */}
      <Form onFinish={handleSubmit(onSubmit)}>
        <div>
          <h6>Task Name</h6>
          <input
            id="taskName"
            name="taskName"
            type="text"
            style={{ width: "100%", padding: "3px 10px" }}
            onChange={handleChange}
            defaultValue={task1?.taskName}
          />
        </div>
        <div className="mt-2">
          <h6>Status</h6>
          <Controller
            name="statusId"
            control={control}
            rules={{
              required: {
                value: true,
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
                    {getall?.map((i) => {
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
        </div>
        <div className="mt-2">
          <h6>Type</h6>
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
                    {getalltas?.map((i) => {
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
        </div>
        <div className="mt-2">
          <h6>Priority</h6>
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
                    {getallpri?.map((i) => {
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
        <div className="mt-2">
          <div>
            <h6>Original Estimete</h6>
            <input
              onChange={handleChange}
              {...register("originalEstimate", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            {errors.originalEstimate && (
              <p style={{ color: "red" }}>{errors.originalEstimate.message}</p>
            )}
          </div>
          <div>
            <h6>Time Spent</h6>
            <input
              {...register("timeTrackingSpent", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            {errors.timeTrackingSpent && (
              <p style={{ color: "red" }}>{errors.timeTrackingSpent.message}</p>
            )}
          </div>
          <div>
            <h6>Time remaining</h6>
            <input
              {...register("timeTrackingRemaining", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            {errors.timeTrackingRemaining && (
              <p style={{ color: "red" }}>
                {errors.timeTrackingRemaining.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <h6>Decription</h6>
          <textarea
            rows={5}
            cols={50}
            style={{ width: "100%", padding: "3px 10px" }}
            {...register("description", {
              required: {
                value: true,
                message: "không được để trống",
              },
            })}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="outlined"
          className="mt-3"
          onClick={handleClose}
        >
          Submit
        </Button>
      </Form>
      {setInput()}
    </div>
  );
};

export default UpdateTask;
