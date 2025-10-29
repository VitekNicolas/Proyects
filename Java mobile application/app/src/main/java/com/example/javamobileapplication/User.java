package com.example.javamobileapplication;

public class User {
    private String email;
    private String imageUri;
    private String role;

    public User() {

    }

    public User(String email, String imageUri) {
        this.email = email;
        this.imageUri = imageUri;
        this.role = "user";
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getImageUri() { return imageUri; }
    public void setImageUri(String imageUri) { this.imageUri = imageUri; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
