package com.example.javamobileapplication;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "reclamos.db";
    private static final int DATABASE_VERSION = 1;

    public static final String TABLE_POSTS = "posts";
    public static final String COLUMN_ID = "id";
    public static final String COLUMN_DIRECCION = "direccion";
    public static final String COLUMN_TIPO = "tipo";
    public static final String COLUMN_FECHA = "fecha";
    public static final String COLUMN_IMAGEN_URI = "imagenUri";

    private static final String TABLE_CREATE =
            "CREATE TABLE " + TABLE_POSTS + " (" +
                    COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    COLUMN_DIRECCION + " TEXT, " +
                    COLUMN_TIPO + " TEXT, " +
                    COLUMN_FECHA + " TEXT, " +
                    COLUMN_IMAGEN_URI + " TEXT" +
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
}
