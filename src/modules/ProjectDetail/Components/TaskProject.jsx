import React, { useEffect } from "react";
import projectAPI from "apis/projectAPI";
import useRequest from "hooks/useRequest";

import SCSS from "../css/styleProjectDetail.module.scss";
import ModalTask from "./ModalTask";
import { useDispatch, useSelector } from "react-redux";

import { getAllComment, getProjectAllById } from "../slices/taskSlices";

import { useNavigate, useParams } from "react-router-dom";

import { removeTaskz } from "../slices/taskSlices";
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

  const user = JSON.parse(localStorage.getItem("user"));

  const { data1: tasks, comment } = useSelector((state) => state.taskS);
  useEffect(() => {
    dispatch(getProjectAllById({ projectId }));
  }, [tasks]);

  const handleDelete = (projectId, taskId, acce) => {
    dispatch(removeTaskz({ projectId, taskId, acce }));
  };
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
                    <div className={SCSS.taskContent} key={task.taskId}>
                      <p>
                        <b>Task Name:</b> {task.taskName}
                      </p>
                      <p>
                        <b>Priority Task:</b> {task.priorityTask.priority}
                      </p>
                      <p>
                        <b>Task Type:</b> {task.taskTypeDetail.taskType}
                      </p>
                      <div className="d-flex justify-content-end ">
                        <button
                          type="button"
                          className="btn btn-primary m-2"
                          onClick={() => handleCinema(task, task.taskId)}
                        >
                          Detail
                        </button>
                        <button
                          className="btn btn-danger m-2"
                          onClick={() =>
                            handleDelete(
                              projectId,
                              task.taskId,
                              user.accessToken
                            )
                          }
                        >
                          X
                        </button>
                      </div>
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
