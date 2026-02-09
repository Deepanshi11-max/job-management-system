package com.deepanshi.jobApp.dto;

public class JobDTO {

    private Long id;
    private String title;
    private String company;
    private String location;

    // no salary shown to frontend

    public JobDTO() {
    }

    public JobDTO(Long id, String title, String company, String location) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCompany() {
        return company;
    }

    public String getLocation() {
        return location;
    }
}
