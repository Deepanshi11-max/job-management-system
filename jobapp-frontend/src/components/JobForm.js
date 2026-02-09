import { useState, useEffect } from "react";
import api from "../api/api";
import "./JobForm.css";

function JobForm({ selectedJob, refreshJobs, clearSelection }) {

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: ""
  });

  // when edit button clicked
  useEffect(() => {
    if (selectedJob) {
      setJob(selectedJob);
    }
  }, [selectedJob]);

  function handleChange(e) {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (selectedJob) {
      // UPDATE
      await api.put(`/jobs/${selectedJob.id}`, job);
    } else {
      // CREATE
      await api.post("/jobs", job);
    }

    setJob({ title: "", company: "", location: "" });
    clearSelection();
    refreshJobs();
  }

  return (
    <div className="job-form">
      <h3>{selectedJob ? "Update Job" : "Add Job"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />

        <input
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />

        <button>
          {selectedJob ? "Update Job" : "Add Job"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;



