package com.example.javamobileapplication;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

public class PostRepository {

    private final DatabaseHelper dbHelper;

    public PostRepository(Context context) {
        dbHelper = new DatabaseHelper(context);
    }

    public long insertarPost(Post post) {
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(DatabaseHelper.COLUMN_DIRECCION, post.getDireccion());
        values.put(DatabaseHelper.COLUMN_TIPO, post.getTipo());
        values.put(DatabaseHelper.COLUMN_FECHA, post.getFecha());
        values.put(DatabaseHelper.COLUMN_IMAGEN_URI, post.getImagenUri());
        long id = db.insert(DatabaseHelper.TABLE_POSTS, null, values);
        db.close();
        return id;
    }
}
