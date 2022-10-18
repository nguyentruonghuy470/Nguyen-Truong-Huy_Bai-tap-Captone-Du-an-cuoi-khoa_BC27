import { useState } from "react";
import {
  insertComment,
  deleteComment,
  updateComment,
} from "../slices/taskSlices";

import { Form, notification } from "antd";

import { useForm, Controller } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";

const CommentForm = ({
  setActiveComment,
  comment,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  console.log(text);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: comment?.id,
      taskId: comment?.taskId,
      contentComment: text,
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });
  const dispatch = useDispatch();

  const isTextareaDisabled = text.length === 0;

  const onSubmit = async (values) => {
    console.log(values);
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      dispatch(updateComment({ values, acces, text }));
      setActiveComment(null)
      notification.success({
        message: "thêm comment thành công",
      });
    } catch (error) {
      notification.error({
        message: "thêm comment thất bại",
        description: error,
      });
    }
  };
  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <textarea
        name="contentComment"
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </Form>
  );
};

export default CommentForm;
