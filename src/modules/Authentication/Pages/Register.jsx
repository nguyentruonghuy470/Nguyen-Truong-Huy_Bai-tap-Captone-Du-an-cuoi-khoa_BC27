import React from "react";

import authAPI from "apis/authAPI";
import { Form, notification } from "antd";

import useRequest from "hooks/useRequest";

import TextField from "@mui/material/TextField";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Components/Register/css/styleRegister.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import { Text } from "@mantine/core";

import Swal from "sweetalert2";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";

import SCSS from "../css/styleAuthentication.module.scss";

const Register = () => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  // const handleClickShowPassword = () => {
  //   setValues(true);
  // };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });
  const navigate = useNavigate();

  const { data: handleRegister, isLoading } = useRequest(
    (values) => authAPI.register(values),
    { isManual: true }
  );

  const onSubmit = async (values) => {
    try {
      await handleRegister(values);
      // Sau khi đăng ký thành công, ta cần chuyển user về trang login
      navigate("/login");
      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công tài khoản " + values.email,
        buttons: "Ok",
      });
    } catch (error) {
      // Đăng ký thất bại show error ra cho user thấy
      Swal.fire({
        icon: "error",
        title: "Đăng ký thất bại",
        text: error,
        buttons: "Ok",
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className={SCSS.register}>
      <div className={SCSS.containerRegister}>
        <Container maxWidth="lg">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className={SCSS.wrap}>
                <div className={SCSS.imgRegister}>
                  <div className={SCSS.titleRegister}>
                    <h4 className="mb-4">Welcome to signup form</h4>
                    <p>
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                  </div>
                </div>
                <Form
                  className={SCSS.formRegister}
                  onFinish={handleSubmit(onSubmit)}
                >
                  <Text
                    component="h3"
                    align="center"
                    size="xl"
                    weight={700}
                    style={{ fontFamily: "Greycliff CF, sans-serif" }}
                  >
                    Đăng Ký
                  </Text>
                  <div className={SCSS.containerFormRegister}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Email không được để trống",
                        },
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Email không đúng định dạng",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item
                          validateStatus={error ? "error" : ""}
                          help={error?.message}
                        >
                          <TextField
                            className="w-100"
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            {...field}
                          />
                        </Form.Item>
                      )}
                    />
                    <Controller
                      name="passWord"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Mật khẩu không được để trống",
                        },
                        minLength: {
                          value: 5,
                          message: "Mật Khẩu phải từ 5 đến 20 ký tự",
                        },
                        maxLength: {
                          value: 20,
                          message: "Mật Khẩu phải từ 5 đến 20 ký tự",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item
                          validateStatus={error ? "error" : ""}
                          help={error?.message}
                        >
                          <FormControl
                            sx={{ width: "100%" }}
                            variant="outlined"
                          >
                            <InputLabel htmlFor="outlined-adornment-password">
                              Password
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password"
                              type={values.showPassword ? "text" : "password"}
                              value={values.password}
                              onChange={handleChange("password")}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {values.showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Password"
                              {...field}
                            />
                          </FormControl>
                        </Form.Item>
                      )}
                    />
                    <Controller
                      name="name"
                      control={control}
                      rules={{
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
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item
                          validateStatus={error ? "error" : ""}
                          help={error?.message}
                        >
                          <TextField
                            className="w-100"
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            {...field}
                          />
                        </Form.Item>
                      )}
                    />
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Số Điện Thoại không được để trống",
                        },
                        maxLength: {
                          value: 11,
                          message: "Số Điện Thoại tối đa 11 ký tự",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item
                          validateStatus={error ? "error" : ""}
                          help={error?.message}
                        >
                          <TextField
                            className="w-100"
                            id="outlined-basic"
                            label="Phone Number"
                            variant="outlined"
                            {...field}
                          />
                        </Form.Item>
                      )}
                    />
                    <button className="btn btn-success w-100">Đăng Ký</button>
                    <Text
                      href="/login"
                      component="a"
                      align="center"
                      size="md"
                      weight={400}
                      style={{ fontFamily: "Greycliff CF, sans-serif" }}
                    >
                      Bạn đã có tài khoản? Đăng nhập
                    </Text>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Register;
