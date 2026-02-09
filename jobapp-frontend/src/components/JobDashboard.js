import { useEffect, useState } from "react";
import api from "../api/api";
import JobForm from "./JobForm";
import JobList from "./JobList";

function JobDashboard() {

  // =========================
  // JOB STATES
  // =========================
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // =========================
  // LOAD JOBS FROM BACKEND
  // =========================
  async function loadJobs() {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error loading jobs:", err);
    }
  }

  // =========================
  // LOAD JOBS ON MOUNT
  // =========================
  useEffect(() => {
    loadJobs();
  }, []);

  // =========================
  // DELETE JOB
  // =========================
  async function deleteJob(id) {
    try {
      await api.delete(`/jobs/${id}`);
      loadJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
        Job Management Dashboard
      </h2>

      <JobForm
        selectedJob={selectedJob}
        refreshJobs={loadJobs}
        clearSelection={() => setSelectedJob(null)}
      />

      <JobList
        jobs={jobs}
        onDelete={deleteJob}
        onEdit={setSelectedJob}
      />
    </div>
  );
}

export default JobDashboard;
