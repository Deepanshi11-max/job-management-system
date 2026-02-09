package com.deepanshi.jobApp.controller;

import com.deepanshi.jobApp.dto.JobDTO;
import com.deepanshi.jobApp.model.Job;
import com.deepanshi.jobApp.service.JobService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class Jobcontroller {

    private final JobService jobService;



    public Jobcontroller(JobService jobService) {
        this.jobService = jobService;
    }

    // TEST
    @GetMapping("/hello")
    public String hello() {
        return "Backend running";
    }

    // CREATE
    @PostMapping("/jobs")
    public Job createJob( @Valid @RequestBody Job job) {
        return jobService.createJob(job);
    }

    // READ ALL (DTO)
    @GetMapping("/jobs")
    public List<JobDTO> getJobs() {
        return jobService.getAllJobs();
    }

    // READ BY ID
    @GetMapping("/jobs/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // UPDATE
    @PutMapping("/jobs/{id}")
    public Job updateJob(
            @PathVariable Long id,
           @Valid @RequestBody Job job
    ) {
        return jobService.updateJob(id, job);
    }

    // DELETE
    @DeleteMapping("/jobs/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return "Job deleted successfully";
    }

    @GetMapping("/jobs/paged")
    public org.springframework.data.domain.Page<JobDTO> getJobsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return jobService.getJobsWithPagination(page, size);
    }

}





