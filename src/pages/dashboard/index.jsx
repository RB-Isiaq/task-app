import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tasks from "../../components/Tasks";
import { getData } from "../../services/ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../store/taskReducer";
import { storeUser } from "../../store/userReducer";

const UserPage = () => {
  const [sort, setSort] = useState(null);
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);
  const { name } = useSelector((state) => state.user);
  const user = getData("user");

  dispatch(storeUser({ ...user }));

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <section className="relative w-full max-w-[600px] flex items-center flex-col mb-4 min-h-screen">
      <h1 className="mt-10 text-[22px] sm:text-[28px] text-center max-w-[350px] sm:max-w-full">
        Welcome to your dashboard,{" "}
        <span className="orange_gradient">{name || "User"}.</span>
      </h1>
      <Link to="/dashboard/create">
        <button
          type="button"
          className="px-5 py-2 w-[200px] mx-auto mt-6 text-lg bg_green_gradient rounded-full text-white"
        >
          Add new task
        </button>
      </Link>
      <div className="flex flex-col mt-6 w-full sm:w-[450px] px-4">
        <h1 className="mb-2">Sort your tasks by</h1>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="title"
            name="sorting"
            onChange={() => setSort("title")}
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="status"
            name="sorting"
            onChange={() => setSort("status")}
          />
          <label htmlFor="status">Status</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="date"
            name="sorting"
            onChange={() => setSort("date")}
          />
          <label htmlFor="date">Due date</label>
        </div>
      </div>

      <Tasks sort={sort} data={tasks} />
    </section>
  );
};

export default UserPage;
