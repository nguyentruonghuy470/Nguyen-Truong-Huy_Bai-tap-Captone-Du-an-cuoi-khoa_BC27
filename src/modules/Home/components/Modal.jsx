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

import useRequest from "hooks/useRequest";
import projectAPI from "apis/projectAPI";

import { Form, notification } from "antd";
import { useForm, Controller } from "react-hook-form";

import Swal from "sweetalert2";

const Modal = ({ movieId, open, handleClose }) => {
  const {
    data: projectById,
    isLoading,
    error,
  } = useRequest(() => projectAPI.getProjectAllById(movieId), {
    isManual: false,
    deps: [movieId],
  });
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      projectName: "",
      creator: "",
      description: "",
      categoryId: 1,
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });
  console.log(projectById)
  useEffect(() => {
    if (projectById) {
      Object.entries(projectById).forEach(([name, value]) =>
        setValue(name, value)
      );
    }
  }, [setValue, projectById]);

  const { data: handleRegister } = useRequest(
    (values) => projectAPI.updateProjectById(values),
    { isManual: true }
  );

  const onSubmit = async (values) => {
    try {
      // chờ cho action login thành công
      await handleRegister(values);
      // Chuyển user về trang home
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        buttons: "Ok",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
        <DialogContent>
          <Form
            onFinish={handleSubmit(onSubmit)}
            labelCol={{ span: 2 }}
            className="formRegister"
          >
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <DialogContentText>Information Project</DialogContentText>
              <div>
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
                      <TextField
                        disabled
                        id="outlined-disabled"
                        label="Project Id"
                        multiline
                        maxRows={4}
                        placeholder="Tài Khoản"
                        {...register("id", {
                          required: {
                            value: true,
                            message: "Tài khoản không được để trống",
                          },
                          minLength: {
                            value: 5,
                            message: "Tài khoản phải từ 5 đến 20 ký tự",
                          },
                          maxLength: {
                            value: 20,
                            message: "Tài khoản phải từ 5 đến 20 ký tự",
                          },
                        })}
                        {...field}
                        // defaultValue={projectById?.id}
                        // onChange={handleTextInputChange}
                        // onChange={handleChange}
                      />
                      {errors.id && <p>{errors.id.message}</p>}
                    </Form.Item>
                  )}
                />
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
                        id="outlined-multiline-flexible"
                        label="Project name"
                        multiline
                        maxRows={4}
                        {...field}
                        // onChange={handleTextInputChange}
                        // onChange={handleChange}
                      />
                    </Form.Item>
                  )}
                />
                <Controller
                  name="creator"
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
                        {...register("creator", {
                          required: {
                            value: true,
                            message: "Tài khoản không được để trống",
                          },
                        })}
                        id="outlined-multiline-flexible"
                        maxRows={4}
                        label="Project Category"
                        // onChange={handleTextInputChange}
                        // onChange={handleChange}
                        {...field}
                      />
                    </Form.Item>
                  )}
                />
              </div>
              <button type="submit">Submit</button>
            </Box>
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
