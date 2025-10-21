package com.example.javamobileapplication;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.UserProfileChangeRequest;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.widget.*;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.UserProfileChangeRequest;

import java.io.*;
import java.util.Objects;

public class RegisterActivity extends AppCompatActivity {

    private EditText et_email, et_password, et_repeatPassword;
    private ImageView imgUserProfile;
    private Uri imageUri;
    private FirebaseAuth myAuth;
    private static final int PICK_IMAGE_REQUEST = 100;
    private static final int REQUEST_CAMERA = 101;

    private SharedPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.register_activity);
        myAuth = FirebaseAuth.getInstance();
        preferences = getSharedPreferences("UserPrefs", Context.MODE_PRIVATE);
        et_email = findViewById(R.id.et_userEmail);
        et_password = findViewById(R.id.et_userPassword);
        et_repeatPassword = findViewById(R.id.et_userPasswordRepeat);
        imgUserProfile = findViewById(R.id.iv_profile_photo);
        Button btn_register = findViewById(R.id.btn_registerUser);
        Button btn_add_photo = findViewById(R.id.btn_add_photo);
        btn_register.setOnClickListener(v -> registerUser());
        btn_add_photo.setOnClickListener(v -> abrirSelectorImagen());
    }

    private void registerUser() {
        String email = et_email.getText().toString().trim();
        String password = et_password.getText().toString().trim();
        String repeatPassword = et_repeatPassword.getText().toString().trim();
        if (email.isEmpty() || password.isEmpty() || repeatPassword.isEmpty()) {
            Toast.makeText(this, "Complete todos los campos", Toast.LENGTH_SHORT).show();
            return;
        }
        if (!password.equals(repeatPassword)) {
            Toast.makeText(this, "Las contraseñas no coinciden", Toast.LENGTH_SHORT).show();
            return;
        }
        if (password.length() < 6) {
            Toast.makeText(this, "La contraseña debe tener al menos 6 caracteres", Toast.LENGTH_SHORT).show();
            return;
        }
        myAuth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        Toast.makeText(this, "Registro exitoso", Toast.LENGTH_SHORT).show();
                        finish();
                    } else {
                        Toast.makeText(this,
                                "Error al registrar: " + Objects.requireNonNull(task.getException()).getMessage(),
                                Toast.LENGTH_LONG).show();
                    }
                });
    }

    private void abrirSelectorImagen() {
        String[] opciones = {"Galería", "Cámara"};
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Seleccionar imagen desde:")
                .setItems(opciones, (dialog, which) -> {
                    if (which == 0) {
                        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                        startActivityForResult(intent, PICK_IMAGE_REQUEST);
                    } else {
                        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                        startActivityForResult(intent, REQUEST_CAMERA);
                    }
                });
        builder.show();
    }

    private Uri guardarBitmapTemporal(Bitmap bitmap) {
        File file = new File(getCacheDir(), "temp_image.jpg");
        try (FileOutputStream out = new FileOutputStream(file)) {
            bitmap.compress(Bitmap.CompressFormat.JPEG, 90, out);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Uri.fromFile(file);
    }

    private void guardarImagenEnSharedPreferences(Bitmap bitmap) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 90, baos);
        String imagenBase64 = Base64.encodeToString(baos.toByteArray(), Base64.DEFAULT);
        preferences.edit().putString("profile_image", imagenBase64).apply();
        Glide.with(this).load(bitmap).into(imgUserProfile);
        Toast.makeText(this, "Imagen guardada localmente", Toast.LENGTH_SHORT).show();
    }

    private void actualizarFotoPerfil(Bitmap bitmap) {
        FirebaseUser user = myAuth.getCurrentUser();
        if (user == null) return;
        Uri uri = guardarBitmapTemporal(bitmap);
        UserProfileChangeRequest profileUpdates = new UserProfileChangeRequest.Builder()
                .setPhotoUri(uri)
                .build();
        user.updateProfile(profileUpdates)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        guardarImagenEnSharedPreferences(bitmap);
                    }
                });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            if (requestCode == PICK_IMAGE_REQUEST && data != null) {
                try {
                    Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), data.getData());
                    actualizarFotoPerfil(bitmap);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else if (requestCode == REQUEST_CAMERA && data != null) {
                Bitmap bitmap = (Bitmap) Objects.requireNonNull(data.getExtras()).get("data");
                if (bitmap != null) {
                    actualizarFotoPerfil(bitmap);
                }
            }
        }
    }
}

