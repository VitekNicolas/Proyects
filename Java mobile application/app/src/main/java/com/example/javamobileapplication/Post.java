package com.example.javamobileapplication;

import java.io.Serializable;

public class Post implements Serializable {

    private String id, address, category, date, imageUri, userId, status;
    private double latitude, longitude;
    private boolean notified;

    public Post() {
    }

    public Post(String address, String category, String date, String imageUri, double latitude, double longitude, String userId) {
        this.address = address;
        this.category = category;
        this.date = date;
        this.imageUri = imageUri;
        this.latitude = latitude;
        this.longitude = longitude;
        this.userId=userId;
        this.status="pendiente";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public String getCategory() {
        return category;
    }

    public String getDate() {
        return date;
    }

    public String getImageUri() {
        return imageUri;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }
    public String getUserId() { return userId; }
    public String getStatus() { return status; }
    public boolean isNotified() { return notified; }
    public void setNotified(boolean notified) { this.notified = notified; }
}