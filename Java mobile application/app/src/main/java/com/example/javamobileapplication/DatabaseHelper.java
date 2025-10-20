package com.example.javamobileapplication;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;
import java.util.List;

public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "beraApp.db";
    private static final int DATABASE_VERSION = 1;
    public static final String TABLE_COMPLAINT = "complaint";
    public static final String COLUMN_ID = "id";
    public static final String COLUMN_ADDRESS = "address";
    public static final String COLUMN_CATEGORY = "category";
    public static final String COLUMN_DATE = "date";
    public static final String COLUMN_IMAGE_URI = "imageUri";
    public static final String COLUMN_LATITUDE = "latitude";
    public static final String COLUMN_LONGITUDE = "longitude";

    private static final String TABLE_CREATE = "CREATE TABLE " + TABLE_COMPLAINT + " (" +
            COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
            COLUMN_ADDRESS + " TEXT, " +
            COLUMN_CATEGORY + " TEXT, " +
            COLUMN_DATE + " TEXT, " +
            COLUMN_IMAGE_URI + " TEXT, " +
            COLUMN_LATITUDE + " REAL, " +
            COLUMN_LONGITUDE + " REAL" +
            ");";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase dataBase) {
        dataBase.execSQL(TABLE_CREATE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase dataBase, int oldVersion, int newVersion) {
        dataBase.execSQL("DROP TABLE IF EXISTS " + TABLE_COMPLAINT);
        onCreate(dataBase);
    }

    public List<Post> getAllComplaints() {
        List<Post> complaints = new ArrayList<>();
        SQLiteDatabase dataBase = this.getReadableDatabase();
        Cursor cursor = dataBase.rawQuery("SELECT * FROM complaint", null);
        if (cursor.moveToFirst()) {
            do {
                Post complaint = new Post();
                complaint.setId(cursor.getInt(cursor.getColumnIndexOrThrow("id")));
                complaint.setCategory(cursor.getString(cursor.getColumnIndexOrThrow("category")));
                complaint.setAddress(cursor.getString(cursor.getColumnIndexOrThrow("address")));
                complaint.setDate(cursor.getString(cursor.getColumnIndexOrThrow("date")));
                complaint.setImageUri(cursor.getString(cursor.getColumnIndexOrThrow("imageUri")));
                complaint.setLatitude(cursor.getDouble(cursor.getColumnIndexOrThrow("latitude")));
                complaint.setLongitude(cursor.getDouble(cursor.getColumnIndexOrThrow("longitude")));
                complaints.add(complaint);
            } while (cursor.moveToNext());
        }
        cursor.close();
        dataBase.close();
        return complaints;
    }
}