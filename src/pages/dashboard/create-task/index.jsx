import { useState } from "react";
import Form from "../../../components/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../../store/taskReducer";

const CreateTask = () => {
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    dueDate: "",
    status: "",
  });
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createTask = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    dispatch(
      create({ ...formData, userId: id, id: Math.random().toString(36) })
    );

    navigate("/dashboard");
    toast.success("Task created successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setSubmitting(false);
  };

  return (
    <Form
      type="Create"
      task={task}
      setTask={setTask}
      submitting={submitting}
      handleSubmit={createTask}
    />
  );
};

export default CreateTask;
