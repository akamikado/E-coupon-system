import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [errorText, setErrorText] = useState({ error: null });
  const OnSubmit = async (data) => {
    const user = data.user;

    const requestData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/${user}/registration`,
      headers: {
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    await axios
      .request(config)
      .then((response) => {
        const { email } = response.data;
        if (email) {
          navigate(`/${user}/login`);
        }
        setErrorText({
          error: () => {
            if (!email) {
              return "Please check and enter correct input";
            }
          },
        });
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <select {...register("user", { required: true })}>
          <option value="">Select user type</option>
          <option value="student">Student</option>
          <option value="vendor">Vendor</option>
        </select>
        {errors.user && <span>User type is required</span>}
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <input
          type="confirmPassword"
          placeholder="ConfirmPassword"
          {...register("confirmPassword", { required: true })}
        />
        {errors.password && <span>Confirm password is required</span>}
        <p>{errorText.error && errorText.error()}</p>
        <button type="submit">Register</button>
      </form>
      <p>
        Already a user?
        <p>
          <Link to="/student/login"> Student Login</Link>
        </p>
        <p>
          <Link to="/vendor/login"> Vendor Login</Link>
        </p>
      </p>
    </div>
  );
};

export default RegistrationForm;
