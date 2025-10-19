package com.example.javamobileapplication;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;
import java.util.List;

public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "reclamos.db";
    private static final int DATABASE_VERSION = 1;

    public static final String TABLE_POSTS = "posts";
    public static final String COLUMN_ID = "id";
    public static final String COLUMN_DIRECCION = "direccion";
    public static final String COLUMN_TIPO = "tipo";
    public static final String COLUMN_FECHA = "fecha";
    public static final String COLUMN_IMAGEN_URI = "imagenUri";
    public static final String COLUMN_LATITUD = "latitud";
    public static final String COLUMN_LONGITUD= "longitud";

    private static final String TABLE_CREATE =
            "CREATE TABLE " + TABLE_POSTS + " (" +
                    COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    COLUMN_DIRECCION + " TEXT, " +
                    COLUMN_TIPO + " TEXT, " +
                    COLUMN_FECHA + " TEXT, " +
                    COLUMN_IMAGEN_URI + " TEXT, " +
                    COLUMN_LATITUD + " REAL, " +
                    COLUMN_LONGITUD + " REAL" +
                    ");";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(TABLE_CREATE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_POSTS);
        onCreate(db);
    }
    public List<Post> getAllReclamos() {
        List<Post> reclamos = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM posts", null);
        if (cursor.moveToFirst()) {
            do {
                Post r = new Post();
                r.setId(cursor.getInt(cursor.getColumnIndexOrThrow("id")));
                r.setTipo(cursor.getString(cursor.getColumnIndexOrThrow("tipo")));
                r.setDireccion(cursor.getString(cursor.getColumnIndexOrThrow("direccion")));
                r.setFecha(cursor.getString(cursor.getColumnIndexOrThrow("fecha")));
                r.setImagenUri(cursor.getString(cursor.getColumnIndexOrThrow("imagenUri")));
                r.setLatitud(cursor.getDouble(cursor.getColumnIndexOrThrow("latitud")));
                r.setLongitud(cursor.getDouble(cursor.getColumnIndexOrThrow("longitud")));
                reclamos.add(r);
            } while (cursor.moveToNext());
        }
        cursor.close();
        db.close();
        return reclamos;
    }
}
