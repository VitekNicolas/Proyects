package com.example.javamobileapplication;

import java.io.Serializable;

public class Post implements Serializable {
    private long id;
    private String address, category, date, imageUri, userId;
    private double latitude, longitude;

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
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getImageUri() {
        return imageUri;
    }

    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}