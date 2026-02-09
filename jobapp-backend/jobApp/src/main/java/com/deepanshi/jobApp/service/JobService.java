package com.deepanshi.jobApp.service;
import com.deepanshi.jobApp.exception.JobNotFoundException;
import com.deepanshi.jobApp.dto.JobDTO;
import com.deepanshi.jobApp.model.Job;
import com.deepanshi.jobApp.repository.JobRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;


    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // ===============================
    // CREATE JOB
    // ===============================
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    // ===============================
    // READ ALL JOBS (DTO)
    // ===============================
    public List<JobDTO> getAllJobs() {

        List<Job> jobs = jobRepository.findAll();

        return jobs.stream()
                .map(job -> new JobDTO(
                        job.getId(),
                        job.getTitle(),
                        job.getCompany(),
                        job.getLocation()
                ))
                .toList();
    }

    // ===============================
    // READ JOB BY ID
    // ===============================
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException("Job with id " + id + " not found")
                );
    }

    // ===============================
    // UPDATE JOB
    // ===============================
    public Job updateJob(Long id, Job updatedJob) {

        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException("Job with id " + id + " not found")
                );

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());

        return jobRepository.save(existingJob);
        }




    // ===============================
    // DELETE JOB
    // ===============================
    public void deleteJob(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException("Job with id " + id + " not found")
                );

        jobRepository.delete(job);
    }

    public Page<JobDTO> getJobsWithPagination(int page, int size) {

        PageRequest pageable =
                PageRequest.of(page, size, Sort.by("id").descending());

        Page<Job> jobPage = jobRepository.findAll(pageable);

        return jobPage.map(job ->
                new JobDTO(
                        job.getId(),
                        job.getTitle(),
                        job.getCompany(),
                        job.getLocation()
                )
        );
    }

}




