import React from "react";
import CommentForm from "./CommentForm";

const Comment = ({
  acces,
  comment,
  setActiveComment,
  activeComment,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";

  return (
    <div className="col-sm-4">
      {!isEditing && (
        <div className="comment-text">{comment.contentComment}</div>
      )}
      {isEditing && (
        <CommentForm
          setActiveComment={setActiveComment}
          comment={comment}
          submitLabel="Update"
          hasCancelButton
          initialText={comment.contentComment}
          handleCancel={() => setActiveComment(null)}
        />
      )}
    </div>
  );
};

export default Comment;
