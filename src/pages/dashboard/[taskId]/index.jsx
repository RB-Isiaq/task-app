import { useNavigate, useParams } from "react-router-dom";
import TaskDetails from "../../../components/TaskDetails";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../../../store/taskReducer";

const TaskDetail = () => {
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  const { tasks } = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask(id));
  }, []);

  const handleDelete = () => {
    setDeleting(true);

    dispatch(deleteTask(id));
    toast.success("Task deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/dashboard");
    setDeleting(false);
  };

  return (
    <TaskDetails
      data={tasks}
      deleteHandler={handleDelete}
      deleting={deleting}
    />
  );
};

export default TaskDetail;
