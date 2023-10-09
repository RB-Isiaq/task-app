import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getData } from "../../../services/ApiClient";
import { storeUser } from "../../../store/userReducer";
import { useDispatch } from "react-redux";

const SignIn = ({ toggle }) => {
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    const data = getData("user");
    if (!data) {
      setError("User not found");
      return;
    }
    if (
      formData.username === data.username &&
      formData.password === data.password
    ) {
      dispatch(storeUser({ ...data }));
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <form
        onSubmit={handSubmit}
        action="post"
        className="flex flex-col gap-4 items-center mb-4 w-full sm:w-[550px]"
      >
        <h1 className="text-lg blue_gradient text-center">Welcome Back</h1>
        <input
          type="username"
          placeholder="username"
          required
          name="username"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="search_input peer"
        />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="password"
          required
          name="password"
          className="search_input peer"
        />
        <label>
          <input
            type="checkbox"
            checked={passwordVisible}
            onChange={() => setPasswordVisible(!passwordVisible)}
          />{" "}
          show password
        </label>
        <div className="flex justify-between gap-10">
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg_blue_gradient rounded-full text-white w-max shadow-lg"
          >
            {"Sign In"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-400 text-center">{error}</p>}
      <p>
        Don't have an account?{" "}
        <span className="orange_gradient cursor-pointer" onClick={toggle}>
          Sign Up
        </span>
      </p>
    </>
  );
};

export default SignIn;
