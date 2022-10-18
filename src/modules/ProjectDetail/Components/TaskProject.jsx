import React from "react";
import projectAPI from "apis/projectAPI";
import useRequest from "hooks/useRequest";

import SCSS from "../css/styleProjectDetail.module.scss";
import ModalTask from "./ModalTask";
import { useDispatch,useSelector } from "react-redux";

import { getAllComment } from "../slices/taskSlices";

const TaskProject = ({ projectId }) => {
  const [openModalTask, setOpenModalTask] = React.useState(false);

  const handleOpen = () => {
    setOpenModalTask(true);
  };
  const handleClose = () => setOpenModalTask(false);

  const dispatch = useDispatch();

  const handleCinema = (cinemaCode,idTask) => {
    dispatch(getAllComment(idTask));
    setOpenModalTask(true);
    dispatch({ type: "location", cinemaCode });
  };
  const {
    data: infoProjectTask,
    isLoading,
    error,
  } = useRequest(() => projectAPI.getProjectAllById(projectId));
  console.log(infoProjectTask);
  return (
    <div>
      <h1>{infoProjectTask?.projectName}</h1>
      <div className={SCSS.TaskProjectContainer}>
        {infoProjectTask?.lstTask?.map((i) => {
          return (
            <div key={i.statusId} className={SCSS.itemTask}>
              <div>
                <p style={{ fontWeight: 500 }}>{i.statusName}</p>
                {i.lstTaskDeTail.map((task) => {
                  return (
                    <div
                      className={SCSS.taskContent}
                      key={task.taskId}
                      onClick={() => handleCinema(task,task.taskId)}
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
