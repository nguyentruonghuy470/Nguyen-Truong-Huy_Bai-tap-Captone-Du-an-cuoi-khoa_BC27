import React, { useEffect } from "react";
// import scss from "./styles.module.scss";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateUsers } from "modules/ProjectDetail/slices/userSlices";

import TextField from "@mui/material/TextField";
import { Button } from "@mantine/core";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import SCSS from "../css/styleUser.module.scss";
import { Form, notification } from "antd";
const CreateUser = () => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    console.log(values);
    const user = JSON.parse(localStorage.getItem("user"));
    const acce = user.accessToken;
    try {
      await dispatch(CreateUsers(values)).unwrap();
      navigate("/user");
      notification.success({
        message: "Tạo User thành công",
      });
    } catch (error) {
      notification.error({
        message: "Tạo User thất bại",
        description: error,
      });
    }
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
  return (
    <div>
      <div>
        <div className={SCSS.mainContainer}>
          <div className={SCSS.authSidebar}>
            <header>
              <a href="/" className={SCSS.logo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 96 24"
                  role="img"
                  aria-labelledby="annv7hge4q92fk1pimbvtjad00ylo5is"
                  className={SCSS.icon}
                >
                  <title id="annv7hge4q92fk1pimbvtjad00ylo5is">
                    Dribbble: the community for graphic design
                  </title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M95.8512 18.5141C91.8395 25.3156 85.4862 23.342 83.5781 21.7968C82.7661 22.3478 81.342 23.5554 79.4433 23.4161C75.3996 23.1192 73.9514 17.3405 73.9514 17.3405C73.9804 17.3636 72.747 17.7662 72.0802 17.759C72.0716 19.4536 70.6067 23.5018 66.6533 23.4501C62.217 23.3922 61.3151 16.7828 61.3151 16.7828C61.3151 16.7828 60.8736 17.3959 59.195 18.0064C59.2795 16.7045 59.2177 23.2519 53.9006 23.3481C49.6971 23.4242 48.5623 16.6809 48.5623 16.6809C48.5623 16.6809 47.8331 17.4385 46.4199 17.7012C46.5097 16.378 46.3637 23.3703 41.0459 23.3481C37.4523 23.3331 36.2242 19.1941 36.3197 18.6197C36.4416 17.8875 35.1052 23.4511 31.6145 23.3644C30.1739 23.322 29.1 22.2791 28.4261 20.8885C27.524 21.9209 26.2142 23.3644 24.7448 23.3644C22.1075 23.3644 20.9446 21.1584 21.1416 14.8577C21.1583 14.1105 21.1044 13.8165 20.3616 13.7047C19.9157 13.6304 19.459 13.4895 18.976 13.4152C18.8211 13.932 17.5076 23.1962 12.9912 23.372C11.476 23.4311 10.6475 22.1186 9.96715 21.1443C8.92417 22.5241 7.54738 23.4161 5.58603 23.4161C2.26365 23.4161 0 20.7302 0 17.417C0 14.1038 2.26365 11.4182 5.58603 11.4182C6.17345 11.4182 6.33836 11.5024 6.87502 11.659C5.77137 1.61058 8.37774 0.0401515 10.6578 0.0401515C12.8467 0.0401515 16.5863 5.12064 11.3244 18.0074C12.4926 21.8512 15.0111 21.6338 16.2214 13.7212C16.4676 12.1128 15.809 9.9423 16.8335 9.63937C18.7061 9.08575 18.9048 10.7468 19.7828 11.0235C20.7112 11.316 21.2531 11.2875 22.1444 11.4736C23.6674 11.771 24.2618 12.5892 24.0761 14.4113C23.8533 16.7171 23.4636 20.0729 24.652 20.4818C25.5091 20.779 27.0739 19.0016 27.3485 18.0291C27.623 17.0566 27.6803 16.7237 27.7047 16.0105C27.7419 14.4859 27.7884 13.3684 28.0484 12.2154C28.1597 11.7693 28.2865 11.4739 28.7912 11.4537C29.2066 11.4431 29.9661 11.318 30.3005 11.5782C30.7461 11.9131 30.6905 12.2529 30.6393 13.1471C30.121 25.8966 34.11 19.5319 35.2994 14.4357C34.876 8.67313 35.1667 0.145675 38.7779 0.00265405C40.6559 -0.0717249 41.4861 1.43282 41.5775 2.55581C41.8357 5.72757 40.3888 10.9815 38.4859 14.5148C37.3984 21.7242 43.2411 23.1498 44.1754 17.3952C42.6467 16.6684 40.9947 13.7265 42.339 12.2928C43.0934 11.4882 46.2335 12.6441 46.2849 15.1651C47.8252 14.7531 48.0308 13.8835 48.0522 14.0276C47.6287 8.265 48.0214 0.145749 51.6328 0.00272768C53.5106 -0.0716513 54.3408 1.43289 54.4321 2.55589C54.6904 5.72764 53.2435 10.9816 51.3408 14.5149C50.253 21.7243 56.096 23.1498 57.0301 17.3953C55.8983 17.1769 53.5091 14.0478 54.8876 12.2929C55.6243 11.3551 58.7528 13.3053 59.1032 15.2486C60.5829 14.8298 60.7838 13.9878 60.805 14.1296C60.3815 8.36712 60.7742 0.247876 64.3855 0.104854C66.2634 0.0304754 67.0936 1.53502 67.1849 2.65802C67.4432 5.82977 65.9962 11.0838 64.0933 14.6171C63.0058 21.8266 68.8485 23.2519 69.7829 17.4973C68.2276 17.2383 66.0171 13.9344 67.7962 12.2442C68.507 11.5689 71.2229 13.3219 71.8586 15.3218C72.742 15.2878 73.2918 14.9833 73.4097 14.9525C71.9995 8.18754 73.0493 0.0705829 76.9342 0.00282686C79.0338 -0.0337594 81.0867 1.13799 80.1856 7.57394C79.3256 13.7146 76.234 16.2916 76.2411 16.331C76.4211 17.0667 78.0074 23.2233 82.0023 19.9749C81.7955 19.5066 81.5885 19.0282 81.4728 18.4486C80.8107 15.0729 82.1112 11.2599 85.6462 10.6436C87.6715 10.2906 89.5793 11.2766 89.881 13.4996C90.3773 17.1371 87.0927 19.7715 85.8437 20.3429C85.2843 20.0251 90.9148 23.6362 94.2563 16.3995C94.45 15.9863 94.6837 16.0213 94.9863 16.2343C95.2 16.3847 96.4175 17.5379 95.8512 18.5141ZM8.00277 16.5233C7.83274 16.0149 7.48381 14.8949 7.36044 14.4096C6.68091 13.8187 6.19588 13.7227 5.32365 13.7227C3.38526 13.7227 2.24437 15.5148 2.24437 17.4473C2.24437 19.3798 3.48729 21.1722 5.42567 21.1722C7.10552 21.1722 8.38402 20.03 8.77408 18.4132C8.50106 17.7829 8.23024 17.2036 8.00277 16.5233ZM10.6103 2.70004C9.24825 2.70004 8.78622 5.94913 8.87589 8.72092C8.95519 11.1715 9.63996 13.329 9.99519 14.2956C10.0854 14.4168 10.0686 14.338 10.1491 14.4665C12.514 9.28488 11.5331 2.70004 10.6103 2.70004ZM38.9724 2.80209C37.212 2.60021 37.2233 9.93334 37.4419 11.5782C38.3561 10.1157 39.9444 3.1959 38.9724 2.80209V2.80209ZM51.827 2.80209C50.0667 2.60021 50.078 9.93334 50.2966 11.5782C51.2108 10.1157 52.7991 3.1959 51.827 2.80209ZM64.5798 2.90412C62.8194 2.70223 62.8307 10.0354 63.0494 11.6804C63.9635 10.2177 65.5518 3.2979 64.5798 2.90412V2.90412ZM77.1284 2.37283C74.3857 2.9236 75.0244 12.0682 75.4409 13.672C78.6717 9.23475 78.7381 2.20615 77.1284 2.37283V2.37283ZM87.4073 13.8005C87.268 13.2175 86.5707 12.9058 86.0894 12.9826C84.7123 13.1707 83.3767 14.8858 83.8937 17.497C84.0087 18.0786 84.2967 18.6138 84.2921 18.5961C87.3741 16.5285 87.636 14.8991 87.4073 13.8005ZM29.3312 9.43526C28.9376 9.43534 28.5528 9.31869 28.2255 9.10007C27.8982 8.88145 27.6431 8.57067 27.4924 8.20705C27.3417 7.84344 27.3023 7.4433 27.379 7.05726C27.4558 6.67122 27.6453 6.31661 27.9236 6.03827C28.2019 5.75994 28.5565 5.57039 28.9425 5.49359C29.3285 5.41679 29.7287 5.45619 30.0923 5.60681C30.456 5.75744 30.7668 6.01252 30.9854 6.33979C31.2041 6.66706 31.3208 7.05183 31.3208 7.44542C31.3208 7.70672 31.2693 7.96546 31.1693 8.20686C31.0694 8.44827 30.9228 8.66763 30.7381 8.8524C30.5533 9.03718 30.334 9.18375 30.0926 9.28376C29.8512 9.38377 29.5925 9.43525 29.3312 9.43526V9.43526Z"
                  ></path>
                </svg>
              </a>
              <h1>Discover the world’s top Designers &amp; Creatives.</h1>
            </header>
          </div>
          <div className={SCSS.containerUser}>
            <Form onFinish={handleSubmit(onSubmit)} className={SCSS.formUser}>
              <h1>Create User</h1>

              <div>
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
                      <FormControl variant="filled" sx={{ minWidth: 300 }}>
                        <TextField
                          className="w-100"
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          {...field}
                        />
                      </FormControl>
                    </Form.Item>
                  )}
                />
              </div>
              <div>
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
                      <FormControl sx={{ minWidth: 300 }} variant="outlined">
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
              </div>
              <div>
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
                      <FormControl variant="filled" sx={{ minWidth: 300 }}>
                        <TextField
                          className="w-100"
                          id="outlined-basic"
                          label="Name"
                          variant="outlined"
                          {...field}
                        />
                      </FormControl>
                    </Form.Item>
                  )}
                />
              </div>
              <div>
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
                      <FormControl variant="filled" sx={{ minWidth: 300 }}>
                        <TextField
                          className="w-100"
                          id="outlined-basic"
                          label="Phone Number"
                          variant="outlined"
                          {...field}
                        />
                      </FormControl>
                    </Form.Item>
                  )}
                />
              </div>
              <div className={SCSS.button}>
                <Button type="submit">Create user</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
