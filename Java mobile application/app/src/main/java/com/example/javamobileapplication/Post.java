package com.example.javamobileapplication;

public class Post {
    private long id;
    private String direccion;
    private String tipo;
    private String fecha;
    private String imagenUri;
    private double latitud, longitud;

    public Post(String direccion, String tipo, String fecha, String imagenUri, double latitud, double longitud) {
        this.direccion = direccion;
        this.tipo = tipo;
        this.fecha = fecha;
        this.imagenUri = imagenUri;
        this.latitud=latitud;
        this.longitud=longitud;
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

    public double getLatitud() { return latitud;}

    public void setLatitud(double latitud) {this.latitud=latitud;}
    public double getLongitud() { return longitud;}

    public void setLongitud(double longitud) {this.longitud=longitud;}
}