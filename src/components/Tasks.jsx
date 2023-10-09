import TaskCard from "./TaskCard";

const Tasks = ({ sort, data }) => {
  let sortedData = [...data].sort((a, b) => a - b); // Create a copy of the data array

  if (sort === "title") {
    sortedData = [...data].sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
  }
  if (sort === "status") {
    sortedData = [...data].sort((a, b) => {
      if (a.status > b.status) return -1;
      if (a.status < b.status) return 1;
      return 0;
    });
  }
  if (sort === "date") {
    sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.dueDate.split("/").reverse().join("/"));
      const dateB = new Date(b.dueDate.split("/").reverse().join("/"));
      return dateA - dateB;
    });
  }

  return (
    <div className="mt-6 w-full sm:w-[450px] px-4">
      {sortedData?.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
};

export default Tasks;
