import "./JobList.css";
function JobList({ jobs, onDelete, onEdit }) {

  return (
    <div className="job-list">
      <h3>Available Jobs</h3>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>
                <button onClick={() => onEdit(job)}>Edit</button>
                <button onClick={() => onDelete(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default JobList;





