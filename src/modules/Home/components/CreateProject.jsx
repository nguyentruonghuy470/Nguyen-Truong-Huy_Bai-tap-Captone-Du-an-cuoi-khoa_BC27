import React, { useEffect } from "react";

import useRequest from "hooks/useRequest";
import projectAPI from "apis/projectAPI";

import { Navigate, useNavigate } from "react-router-dom";

import { Form, notification } from "antd";
import { useForm, Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import mapValues from "lodash/mapValues";

import Swal from "sweetalert2";
import SCSS from "../css/style.module.scss";



const CreateProject = () => {
  const [age, setAge] = React.useState("");
  const navigate = useNavigate();

  const {
    data: dataProjectCategory,
    isLoading,
    error,
  } = useRequest(() => projectAPI.getProjectCategory());
  let defaultValues = {
    projectName: "",
    description: "",
    categoryId: age,
    alias: "",
  };

  const {
    reset,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
      categoryId: age,
      alias: "",
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // console.log(projectById);
  useEffect(() => {
    mapValues(defaultValues, (value, key) => setValue(key, value));
  }, [setValue]);

  const { data: handleRegister } = useRequest(
    (values) => projectAPI.addProject(values),
    { isManual: true }
  );

  const onSubmit = async (values) => {
    try {
      // chờ cho action login thành công
      await handleRegister(values);
      // Chuyển user về trang home
      navigate("/");

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
  return (
    <div className={SCSS.createProject}>
      <Form onFinish={handleSubmit(onSubmit)} labelCol={{ span: 2 }}>
        <h4>Create Project</h4>
        <div className={SCSS.controlCreateProject}>
          <Controller
            name="projectName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Project Name không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <TextField
                  id="outlined-disabled"
                  label="Project Name"
                  multiline
                  maxRows={4}
                  fullWidth
                  placeholder="Tài Khoản"
                  {...field}
                />
              </Form.Item>
            )}
          />
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

          <Controller
            name="categoryId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Category Id không được để trống",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <FormControl variant="filled" sx={{ minWidth: 250 }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    {...field}
                  >
                    {dataProjectCategory?.map((i) => {
                      return (
                        <MenuItem value={i.id} key={i.id}>
                          {i.projectCategoryName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Form.Item>
            )}
          />
        </div>
        <Button type="submit" variant="outlined" className="mt-4">
          Create project
        </Button>
        {/* <Button variant="contained">Create project</Button> */}
      </Form>
    </div>
  );
};

export default CreateProject;
