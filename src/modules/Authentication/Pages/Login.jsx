import React from "react";
import { Form, notification } from "antd";
import {
  Container,
  Text,
  Checkbox,
  Input,
  PasswordInput,
  Button,
} from "@mantine/core";
import TextField from "@mui/material/TextField";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/authSlice";

// import "../Components/Login/css/styleLogin.css";
import SCSS from "../css/styleAuthentication.module.scss";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

import * as images1 from "../images1";

const Login = () => {
  const {
    handleSubmit,
    // Sử dụng kết hợp với Controller thay thế cho register đối với các trường hợp component không hỗ trợ ref
    control,
  } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
    },
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    
    try {
      // chờ cho action login thành công
      await dispatch(login(values)).unwrap();
      // Chuyển user về trang home
      navigate("/");
      Swal.fire({
        text: "Xin chào " + values.email,
        icon: "success",
        title: "Đăng nhập thành công",
        buttons: "Ok",
      });
    } catch (error) {
      Swal.fire({
        text: error,
        icon: "error",
        title: "Đăng nhập thất bại",
        buttons: "Ok",
      });
    }
  };

  return (
    <div className={SCSS.login}>
      <div className={SCSS.loginContainer}>
        <div className={SCSS.loginImg}>
          <img src={images1.image1} />
        </div>
        <Form onFinish={handleSubmit(onSubmit)} className={SCSS.formContainer}>
          <div className={SCSS.iconUserLogin}>
            <FontAwesomeIcon
              icon={faCircleUser}
              color="#fb4226"
              fontSize={50}
            />
          </div>

          <Text
            component="p"
            align="center"
            size="30px"
            weight={400}
            color="#333"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Login to continue
          </Text>
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
            }}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <TextField
                  className="w-100 mt-3"
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </Form.Item>
            )}
          />
          <div className={SCSS.chkSavePass}>
            <Checkbox label="Nhớ tài khoản" />
          </div>
          <div className={SCSS.btnLogin}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              loading={isLoading}
            >
              Login
            </Button>
          </div>
          <div className="text-center pt-4 pb-2">
            <Text
              href="/register"
              component="a"
              align="center"
              size="13px"
              color="#999"
              weight={400}
              style={{ fontFamily: "Montserrat-Regular" }}
            >
              or sign up using
            </Text>
          </div>
          <div className={SCSS.containerBrands}>
            <FontAwesomeIcon
              className="iconUserLogin"
              icon={faFacebook}
              color="#425a9a"
              fontSize={35}
            />
            <FontAwesomeIcon
              className="iconUserLogin"
              icon={faTwitter}
              color="#49a3f5"
              fontSize={35}
            />
          </div>
          <div className="mt-3">
            <Text
              href="/login"
              component="a"
              align="center"
              size="md"
              weight={400}
              style={{
                fontFamily: "Greycliff CF, sans-serif",
                display: "block",
              }}
            >
              Bạn đã có tài khoản? Đăng nhập
            </Text>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
