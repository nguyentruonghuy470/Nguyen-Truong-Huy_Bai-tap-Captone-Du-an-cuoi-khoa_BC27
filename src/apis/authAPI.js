import axiosClient from "./axiosClient";

const authAPI = {
  login: (values) => {
    console.log(values);
    return axiosClient.post("Users/signin", values);
  },

  register: (values) => {
    console.log(values)
    return axiosClient.post("Users/signup", {
      ...values,
    });
  },
  // infoUser: (values) => {
  //   return axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan", values);
  // },
  // updateInfoUser: (values) => {
  //   return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
  // },
};

export default authAPI;
