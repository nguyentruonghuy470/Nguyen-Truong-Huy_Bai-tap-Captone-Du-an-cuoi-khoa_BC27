import React, { useState, useEffect } from "react";

import { Form, notification } from "antd";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Swal from "sweetalert2";

import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import useRequest from "hooks/useRequest";

import projectAPI from "apis/projectAPI";

import SCSS from "../css/styleProjectDetail.module.scss";

import CommentForm from "./CommentForm";
import {
  insertComment,
  deleteComment,
  updateComment,
} from "../slices/taskSlices";
import Comment from "./Comment";
const ModalTask = ({ handleClose, openModalTask }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const acces = user.accessToken;

  const [taskId, setTaskId] = useState(5610);
  const { data1: tasks, comment } = useSelector((state) => state.taskS);
  const { dataTaskDetail } = useSelector((state) => state.task);
  const [activeComment, setActiveComment] = useState(null);

  const dispatch = useDispatch();

  const {
    data: infoProjectTask,
    isLoading,
    error,
  } = useRequest(() => projectAPI.getComment(taskId), {
    isManual: false,
    deps: [taskId],
  });
  // console.log(infoProjectTask);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
      taskId: dataTaskDetail?.taskId,
      contentComment: "",
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });

  useEffect(() => {
    if (dataTaskDetail) {
      Object.entries(dataTaskDetail).forEach(([name, value]) =>
        setValue(name, value)
      );
      // setTaskId(dataTaskDetail?.taskId);
    }
  }, [setValue, dataTaskDetail]);

  const handleDeleteComment = (commentId, acces, taskId) => {
    dispatch(deleteComment({ commentId, acces, taskId }));
  };

  const onSubmit = async (values) => {
    console.log(values);
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      // if (values.id === "") {
      dispatch(insertComment({ values, acces }));
      setValue("contentComment", " ");
      notification.success({
        message: "thêm comment thành công",
      });
      // } else {
      //   // dispatch(updateComment({ values, acces }));
      // }
    } catch (error) {
      notification.error({
        message: "thêm comment thất bại",
        description: error,
      });
    }
  };

  const objectKeys = Object.values(infoProjectTask || []);
  // console.log(typeof objectKeys);
  // console.log(comment.id);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalTask}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalTask}>
          <Box sx={style}>
            <div className="d-flex">
              <div className="w-50 m-2">
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  className="mb-3"
                >
                  Comment
                </Typography>
                <Form
                  onFinish={handleSubmit(onSubmit)}
                  className="formRegister"
                >
                  <Controller
                    name="contentComment"
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
                        <input
                          {...field}
                          className="form-control mb-3"
                          type="text"
                          placeholder="Add a comment ... "
                          {...register("contentComment", {
                            minLength: {
                              value: 5,
                              message: "Tài khoản phải từ 5 đến 20 ký tự",
                            },
                            maxLength: {
                              value: 20,
                              message: "Tài khoản phải từ 5 đến 20 ký tự",
                            },
                          })}
                        />
                      </Form.Item>
                    )}
                  />
                  <Button type="submit" variant="outlined">
                    Post
                  </Button>
                </Form>
                <div className={SCSS.containerComment}>
                  {comment.map((i, index) => {
                    return (
                      <div key={i.id} className={SCSS.row}>
                        <div className="col-sm-2">
                          <span>
                            <img src={i.user.avatar} alt="" />
                          </span>
                        </div>

                        <Comment
                          acces={acces}
                          comment={i}
                          activeComment={activeComment}
                          setActiveComment={setActiveComment}
                         
                        />
                        <div className="col-sm-6 d-flex justify-content-center">
                          <button
                            className="btn btn-success me-2"
                            // onClick={() => handleGetMovieId(product.id)}
                            onClick={() => {
                              setActiveComment({
                                id: i.id,
                                type: "editing",
                              });
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDeleteComment(i.id, acces, i.taskId);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-50 m-2">
                <h5>STATUS</h5>
                <h5>ASSIGNEES</h5>
                <h5>PRIORITY</h5>
                <h5>ORIGINAL ESTIMATE (HOURS)</h5>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalTask;
