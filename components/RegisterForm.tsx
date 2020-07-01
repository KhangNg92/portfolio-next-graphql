import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          ref={register}
          name="avatar"
          type="text"
          className="form-control"
          id="avatar"
        />
      </div>
      <div className="form-group">
        <label htmlFor="userName">Username</label>
        <input
          ref={register}
          name="userName"
          type="text"
          className="form-control"
          id="userName"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register}
          name="email"
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          ref={register}
          name="passwordConfirmation"
          type="password"
          className="form-control"
          id="passwordConfirmation"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
