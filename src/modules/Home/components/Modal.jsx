import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "hooks/useRequest";
import projectAPI from "apis/projectAPI";

import { Form, notification } from "antd";
import { useForm, Controller } from "react-hook-form";

import Swal from "sweetalert2";
import {
  getProjectAllById,
  getProjectCategory,
  updateProjectById,
} from "modules/ProjectDetail/slices/projectSlices";
const Modal = ({ projectId, open, handleClose }) => {
  const { update: projectById, list: aliass } = useSelector(
    (state) => state.project
  );

  const [categoryId, setCategoryId] = React.useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const acce = user.accessToken;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const creatorId = projectById.creator?.id;
  

  useEffect(() => {
    dispatch(getProjectAllById({ projectId, acce }));
    dispatch(getProjectCategory());
  }, [projectId]);
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      projectName: "",
      creator: creatorId,
      description: "",
      categoryId: categoryId,
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });

  useEffect(() => {
    if (projectById) {
      Object.entries(projectById).forEach(([name, value]) =>
        setValue(name, value)
      );
      setValue("creator", creatorId);
    }
  }, [setValue, projectById]);

  const handleChange = (evt) => {
    const type = evt.target.value;
    setValue("categoryId", type);
  };

  const onSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const acce = user.accessToken;
      await dispatch(updateProjectById({ values, projectId, acce })).unwrap();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        buttons: "Ok",
      });
    } catch (error) {
      notification.error({
        message: "Cập nhật thất bại",
        description: error,
      });
    }
  };
  return (
    <div>
      <Dialog
        // fullWidth={fullWidth}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle style={{ fontWeight: 800 }}>Edit Project</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
          <Form onFinish={handleSubmit(onSubmit)} labelCol={{ span: 2 }}>
            <DialogContentText>Information Project</DialogContentText>
            <div>
              <div className="mt-3" >
                <Controller
                  name="id"
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
                      <FormControl variant="filled" sx={{ minWidth: 250 }}>
                        <TextField
                          style={{ cursor: "not-allowed" }}
                          disabled
                          id="outlined-disabled"
                          label="Project Id"
                          multiline
                          maxRows={4}
                          placeholder="Tài Khoản"
                          {...field}
                        />
                      </FormControl>
                      {errors.id && <p>{errors.id.message}</p>}
                    </Form.Item>
                  )}
                />
              </div>
              <div className="mt-3">
                <Controller
                  name="projectName"
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
                      <TextField
                        id="outlined-disabled"
                        label="Project name"
                        multiline
                        maxRows={4}
                        fullWidth
                        {...field}
                      />
                    </Form.Item>
                  )}
                />
              </div>

              <div className="mt-2">
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
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={categoryId}
                          label="Category Id"
                          onChange={handleChange}
                          {...field}
                        >
                          {aliass?.map((alia) => {
                            return (
                              <MenuItem value={alia.id} key={alia.id}>
                                {alia.projectCategoryName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Form.Item>
                  )}
                />
              </div>
            </div>
            <DialogActions>
              <Button type="submit" variant="outlined" className="mt-2">
                Submit
              </Button>
            </DialogActions>
            {/* <Button type="submit" variant="outlined" className="mt-4">
              Submit
            </Button> */}
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
