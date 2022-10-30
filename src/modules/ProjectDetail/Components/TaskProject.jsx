import React, { useEffect } from "react";
import projectAPI from "apis/projectAPI";
import useRequest from "hooks/useRequest";

import SCSS from "../css/styleProjectDetail.module.scss";
import ModalTask from "./ModalTask";
import { useDispatch, useSelector } from "react-redux";

import { getAllComment, getProjectAllById } from "../slices/taskSlices";

import { useNavigate, useParams } from "react-router-dom";

const TaskProject = ({ projectId }) => {
  const [openModalTask, setOpenModalTask] = React.useState(false);
  const handleClose = () => setOpenModalTask(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCinema = (cinemaCode, idTask) => {
    dispatch(getAllComment(idTask));
    setOpenModalTask(true);
    dispatch({ type: "location", cinemaCode });
    dispatch({ type: "getTaskId", idTask });
  };
  // const {
  //   data: infoProjectTask,
  //   isLoading,
  //   error,
  // } = useRequest(() => projectAPI.getProjectAllById(projectId));
  const user = JSON.parse(localStorage.getItem("user"));

  const { data1: tasks, comment } = useSelector((state) => state.taskS);
  useEffect(() => {
    dispatch(getProjectAllById({ projectId }));
  }, [tasks]);

  return (
    <div>
      <h1>{tasks?.projectName}</h1>
      <div className={SCSS.TaskProjectContainer}>
        {tasks?.lstTask?.map((i) => {
          return (
            <div key={i.statusId} className={SCSS.itemTask}>
              <div>
                <p style={{ fontWeight: 500 }}>{i.statusName}</p>
                {i.lstTaskDeTail.map((task) => {
                  return (
                    <div
                      className={SCSS.taskContent}
                      key={task.taskId}
                      onClick={() => handleCinema(task, task.taskId)}
                    >
                      <p>
                        <b>Task Name:</b> {task.taskName}
                      </p>
                      <p>
                        <b>Priority Task:</b> {task.priorityTask.priority}
                      </p>
                      <p>
                        <b>Task Type:</b> {task.taskTypeDetail.taskType}
                      </p>
                    </div>
                  );
                })}
              </div>
              <ModalTask
                handleClose={handleClose}
                openModalTask={openModalTask}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskProject;
