package com.example.javamobileapplication;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import java.util.ArrayList;
import java.util.List;

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

    public List<Post> getLastTenPosts() {
        List<Post> posts = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.query(
                "complaint",
                null,
                null,
                null,
                null,
                null,
                "id DESC",
                "10"
        );
        if (cursor.moveToFirst()) {
            do {
                Post post = new Post();
                post.setId(cursor.getLong(cursor.getColumnIndexOrThrow("id")));
                post.setAddress(cursor.getString(cursor.getColumnIndexOrThrow("address")));
                post.setCategory(cursor.getString(cursor.getColumnIndexOrThrow("category")));
                post.setDate(cursor.getString(cursor.getColumnIndexOrThrow("date")));
                post.setImageUri(cursor.getString(cursor.getColumnIndexOrThrow("imageUri")));
                post.setLatitude(cursor.getDouble(cursor.getColumnIndexOrThrow("latitude")));
                post.setLongitude(cursor.getDouble(cursor.getColumnIndexOrThrow("longitude")));
                posts.add(post);
            } while (cursor.moveToNext());
        }
        cursor.close();
        db.close();
        return posts;
    }

    public Post getPostById(long id) {
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Post post = null;
        Cursor cursor = db.query(
                "posts",
                null,
                "id = ?",
                new String[]{String.valueOf(id)},
                null,
                null,
                null
        );
        if (cursor.moveToFirst()) {
            post = new Post();
            post.setId(cursor.getLong(cursor.getColumnIndexOrThrow("id")));
            post.setAddress(cursor.getString(cursor.getColumnIndexOrThrow("address")));
            post.setCategory(cursor.getString(cursor.getColumnIndexOrThrow("category")));
            post.setDate(cursor.getString(cursor.getColumnIndexOrThrow("date")));
            post.setImageUri(cursor.getString(cursor.getColumnIndexOrThrow("image_uri")));
            post.setLatitude(cursor.getDouble(cursor.getColumnIndexOrThrow("latitude")));
            post.setLongitude(cursor.getDouble(cursor.getColumnIndexOrThrow("longitude")));
        }
        cursor.close();
        db.close();
        return post;
    }
}