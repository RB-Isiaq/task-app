import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../components/Form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getTask, update } from "../../../../store/taskReducer";

const UpdateTask = () => {
  const navigate = useNavigate();
  const p = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    dueDate: "",
    status: "",
  });
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTask(p.id));
  }, []);
  setTask(tasks);
  const updateTask = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    dispatch(
      update({
        ...formData,
        userId: id,
        id: p.id,
      })
    );

    toast.success("Task updated successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate("/dashboard");

    setSubmitting(false);
  };

  return (
    <Form
      type="Edit"
      task={task}
      setTask={setTask}
      submitting={submitting}
      handleSubmit={updateTask}
    />
  );
};

export default UpdateTask;
