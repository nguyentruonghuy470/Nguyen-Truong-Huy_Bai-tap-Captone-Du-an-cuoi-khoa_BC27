import React from "react";
import { useParams } from "react-router-dom";
import useRequest from "hooks/useRequest";
import TaskProject from "../Components/TaskProject";
import projectAPI from "apis/projectAPI";

const ProjectDetail = () => {
  const { projectId } = useParams();

  return (
    <div
      className="overView"
      style={{ backgroundColor: "#0f2029", padding: "30px", height: "100vh"}}
    >
      <TaskProject projectId={projectId} />
    </div>
  );
};

export default ProjectDetail;
