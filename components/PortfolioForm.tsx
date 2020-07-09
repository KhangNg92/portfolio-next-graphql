import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { getUserPortfolio } from "apollo/actions";

const PortfolioForm = ({ onSubmit, mode, data }) => {
  const editMode = mode && mode.length;
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: data
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    register({ name: "startDate" });
    register({ name: "endDate" });
  }, [register, mode]);

  useEffect(() => {
    const { startDate, endDate } = data;
    if (startDate) setStartDate(new Date(parseInt(startDate)));
    if (endDate) setEndDate(new Date(parseInt(endDate)));
  }, [data]);

  const handleDateChange = (dateType, setDate) => date => {
    setValue(
      dateType,
      (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
    );
    setDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          ref={register}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          ref={register}
          name="company"
          type="text"
          className="form-control"
          id="company"
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
          ref={register}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="company"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          ref={register}
          name="location"
          type="text"
          className="form-control"
          id="location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          ref={register}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          ref={register}
          name="description"
          rows={5}
          className="form-control"
          id="description"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="street">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleDateChange("startDate", setStartDate)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            disabled={!endDate}
            selected={endDate}
            onChange={handleDateChange("endDate", setEndDate)}
          />
        </div>
      </div>

      <div className="form-group">
        {endDate && (
          <button
            className="btn btn-danger"
            onClick={() => handleDateChange("endDate", setEndDate)(null)}
          >
            No End Date
          </button>
        )}

        {!endDate && (
          <button
            className="btn btn-success"
            onClick={() => handleDateChange("endDate", setEndDate)(new Date())}
          >
            Set End Date
          </button>
        )}
      </div>

      <button type="submit" className={`btn btn-primary`}>
        {editMode ? "Edit" : "Create"}
      </button>
    </form>
  );
};

export default PortfolioForm;
