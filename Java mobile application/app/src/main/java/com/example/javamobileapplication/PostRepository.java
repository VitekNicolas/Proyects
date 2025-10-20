package com.example.javamobileapplication;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

public class PostRepository {

    private final DatabaseHelper dbHelper;

    public PostRepository(Context context) {
        dbHelper = new DatabaseHelper(context);
    }

    public long insertPost(Post post) {
        SQLiteDatabase dataBase = dbHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(DatabaseHelper.COLUMN_ADDRESS, post.getAddress());
        values.put(DatabaseHelper.COLUMN_CATEGORY, post.getCategory());
        values.put(DatabaseHelper.COLUMN_DATE, post.getDate());
        values.put(DatabaseHelper.COLUMN_IMAGE_URI, post.getImageUri());
        values.put(DatabaseHelper.COLUMN_LATITUDE, post.getLatitude());
        values.put(DatabaseHelper.COLUMN_LONGITUDE, post.getLongitude());
        long id = dataBase.insert(DatabaseHelper.TABLE_COMPLAINT, null, values);
        dataBase.close();
        return id;
    }
}