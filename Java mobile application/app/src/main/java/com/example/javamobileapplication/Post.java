package com.example.javamobileapplication;

public class Post {
    private long id;
    private String direccion;
    private String tipo;
    private String fecha;
    private String imagenUri;

    public Post(String direccion, String tipo, String fecha, String imagenUri) {
        this.direccion = direccion;
        this.tipo = tipo;
        this.fecha = fecha;
        this.imagenUri = imagenUri;
    }

    // Getters y setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String getImagenUri() { return imagenUri; }
    public void setImagenUri(String imagenUri) { this.imagenUri = imagenUri; }
}