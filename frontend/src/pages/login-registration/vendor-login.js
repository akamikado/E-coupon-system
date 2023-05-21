import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const VendorLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [credentialsCheck, setCredentialsCheck] = useState({
    emailCheck: null,
    passwordCheck: null,
  });
  const [errorText, setErrorText] = useState("");
  const [formIsTouched, setFormIsTouched] = useState(false);
  useEffect(() => {
    if (formIsTouched) {
      if (!credentialsCheck.emailCheck) {
        setErrorText({ error: "User does not exist" });
      } else {
        if (!credentialsCheck.passwordCheck) {
          setErrorText({ error: "Wrong password entered" });
        }
      }
    }
  }, [credentialsCheck, formIsTouched]);
  const onSubmit = async (data) => {
    setFormIsTouched(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/vendor/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        if (response.data.loginSuccess) {
          const sessionCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.startsWith("connect.sid="));

          if (sessionCookie) {
            const sessionId = sessionCookie.split("=")[1];
            console.log(sessionId);
          }
          window.location.href = "http://localhost:3000/vendor/home";
        } else {
          const { emailCheck, passwordCheck } = response.data;
          setCredentialsCheck({
            emailCheck: emailCheck,
            password: passwordCheck,
          });
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <p>{errorText.error}</p>
        <button type="submit">Login</button>
      </form>
      <p>
        Not a user?
        <Link to="/registration"> Register</Link>
      </p>
    </div>
  );
};

export default VendorLoginForm;
