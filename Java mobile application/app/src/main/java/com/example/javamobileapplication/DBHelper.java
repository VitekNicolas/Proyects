package com.example.javamobileapplication;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;
import java.util.List;

public class DBHelper extends SQLiteOpenHelper {

    private static final String DB_NAME = "posts_db";
    private static final int DB_VERSION = 1;

    public static final String TABLE_POSTS = "posts";
    public static final String COL_ID = "id";
    public static final String COL_DESCRIPTION = "description";
    public static final String COL_IMAGE_PATH = "image_path";
    public static final String COL_LAT = "latitude";
    public static final String COL_LON = "longitude";
    public static final String COL_TIMESTAMP = "timestamp";

    public DBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String CREATE_TABLE = "CREATE TABLE " + TABLE_POSTS + "("
                + COL_ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                + COL_DESCRIPTION + " TEXT,"
                + COL_IMAGE_PATH + " TEXT,"
                + COL_LAT + " REAL,"
                + COL_LON + " REAL,"
                + COL_TIMESTAMP + " INTEGER"
                + ")";
        db.execSQL(CREATE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldV, int newV) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_POSTS);
        onCreate(db);
    }

    // Insertar post
    public long addPost(Post post) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(COL_DESCRIPTION, post.getDescription());
        cv.put(COL_IMAGE_PATH, post.getImagePath());
        cv.put(COL_LAT, post.getLatitude());
        cv.put(COL_LON, post.getLongitude());
        cv.put(COL_TIMESTAMP, post.getTimestamp());
        long id = db.insert(TABLE_POSTS, null, cv);
        db.close();
        return id;
    }

    // Obtener todos los posts
    public List<Post> getAllPosts() {
        List<Post> list = new ArrayList<>();
        String select = "SELECT * FROM " + TABLE_POSTS + " ORDER BY " + COL_TIMESTAMP + " DESC";
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor c = db.rawQuery(select, null);
        if (c.moveToFirst()) {
            do {
                Post p = new Post();
                p.setId(c.getLong(c.getColumnIndexOrThrow(COL_ID)));
                p.setDescription(c.getString(c.getColumnIndexOrThrow(COL_DESCRIPTION)));
                p.setImagePath(c.getString(c.getColumnIndexOrThrow(COL_IMAGE_PATH)));
                p.setLatitude(c.getDouble(c.getColumnIndexOrThrow(COL_LAT)));
                p.setLongitude(c.getDouble(c.getColumnIndexOrThrow(COL_LON)));
                p.setTimestamp(c.getLong(c.getColumnIndexOrThrow(COL_TIMESTAMP)));
                list.add(p);
            } while (c.moveToNext());
        }
        c.close();
        db.close();
        return list;
    }

    // Borrar post
    public void deletePost(long id) {
        SQLiteDatabase db = this.getWritableDatabase();
        db.delete(TABLE_POSTS, COL_ID + "=?", new String[]{String.valueOf(id)});
        db.close();
    }

    // Update si hace falta
    public int updatePost(Post post) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(COL_DESCRIPTION, post.getDescription());
        cv.put(COL_IMAGE_PATH, post.getImagePath());
        cv.put(COL_LAT, post.getLatitude());
        cv.put(COL_LON, post.getLongitude());
        cv.put(COL_TIMESTAMP, post.getTimestamp());
        int rows = db.update(TABLE_POSTS, cv, COL_ID + "=?", new String[]{String.valueOf(post.getId())});
        db.close();
        return rows;
    }
}
