package com.example.javamobileapplication;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import timber.log.Timber;

public class PostActivity extends MenuActivity {

    private static final int REQUEST_CAMERA = 100;
    private static final int REQUEST_GALLERY = 100;
    private static final int REQUEST_IMAGE_CAPTURE = 101;
    private Uri imageUri;
    private Spinner spinnerTipo;
    private EditText etFecha;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.post_activity);
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
        etFecha = findViewById(R.id.et_fecha);
        spinnerTipo = findViewById(R.id.spinner_tipo_reclamo);
        Button btnCamera = findViewById(R.id.btnCamera);
        Button btnSavePost = findViewById(R.id.btn_publish_title);
        Button btnGaleria = findViewById(R.id.btn_choose_image);
        btnCamera.setOnClickListener(v -> {
            if (ContextCompat.checkSelfPermission(this,
                    Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[] { Manifest.permission.CAMERA }, REQUEST_CAMERA);
            } else {
                openCamera();
            }
        });
        btnGaleria.setOnClickListener(v -> openImageGallery());
        btnSavePost.setOnClickListener(v -> savePost());
        etFecha.setOnClickListener(v -> showDateSelector());
    }

    private void openCamera() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (intent.resolveActivity(getPackageManager()) != null) {
            File photo = new File(getExternalFilesDir(null), "temp.jpg");
            imageUri = FileProvider.getUriForFile(this, getPackageName() + ".provider", photo);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
        } else {
            Toast.makeText(this, "No se encontró una aplicación de cámara", Toast.LENGTH_SHORT).show();
        }
    }

    private void openImageGallery() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.setType("image/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        startActivityForResult(intent, REQUEST_GALLERY);
    }

    private void showDateSelector() {
        final Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        DatePickerDialog dialog = new DatePickerDialog(this,
                (view, yr, mon, dayOfMonth) -> {
                    String selectDate = dayOfMonth + "/" + (month + 1) + "/" + year;
                    etFecha.setText(selectDate);
                }, year, month, day);
        dialog.show();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
            @NonNull String[] permissions,
            @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_CAMERA) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                openCamera();
            } else {
                Toast.makeText(this, "Permiso de cámara denegado", Toast.LENGTH_LONG).show();
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        ImageView imageView = findViewById(R.id.img_preview);
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            imageView.setImageURI(imageUri);
        } else if (requestCode == REQUEST_GALLERY && resultCode == RESULT_OK && data != null) {
            Uri sourceUri = data.getData();
            assert sourceUri != null;
            Timber.tag("PostActivity").d("Uri authority: %s", sourceUri.getAuthority());
            try {
                getContentResolver().takePersistableUriPermission(sourceUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
                InputStream inputStream = getContentResolver().openInputStream(sourceUri);
                File file = new File(getFilesDir(), "imagen_" + System.currentTimeMillis() + ".jpg");
                OutputStream outputStream = null;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    outputStream = Files.newOutputStream(file.toPath());
                }
                byte[] buffer = new byte[1024];
                int length;
                while (true) {
                    assert inputStream != null;
                    if (!((length = inputStream.read(buffer)) > 0)) break;
                    assert outputStream != null;
                    outputStream.write(buffer, 0, length);
                }
                inputStream.close();
                assert outputStream != null;
                outputStream.close();
                imageUri = Uri.fromFile(file);
                imageView.setImageURI(imageUri);
            } catch (SecurityException se) {
                Toast.makeText(this, "No se puede acceder a la imagen seleccionada", Toast.LENGTH_SHORT).show();
                Timber.e(se,"Se produjo un error");
            } catch (IOException e) {
                Toast.makeText(this, "Error al cargar imagen", Toast.LENGTH_SHORT).show();
                Timber.e(e,"Se produjo un error");
            }
        }
    }
    private void savePost() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        StorageReference storageRef = FirebaseStorage.getInstance().getReference()
                .child("images/" + UUID.randomUUID().toString() + ".jpg");
        if (user == null) return;
        String userId = user.getUid();
        FirebaseApp.initializeApp(this);
        EditText et_description = findViewById(R.id.et_description);
        String address = et_description.getText().toString();
        String category = spinnerTipo.getSelectedItem().toString();
        String date = etFecha.getText().toString().trim();
        if (address.isEmpty() || category.isEmpty() || date.isEmpty() || imageUri == null) {
            Toast.makeText(this, "Complete todos los campos y seleccione una imagen", Toast.LENGTH_SHORT).show();
            return;
        }
        Geocoder geocoder = new Geocoder(this, Locale.getDefault());
        try {
            List<Address> addresses = geocoder.getFromLocationName(address, 1);
            if (addresses == null || addresses.isEmpty()) {
                Toast.makeText(this, "Dirección no encontrada", Toast.LENGTH_SHORT).show();
                return;
            }
            Address location = addresses.get(0);
            double latitude = location.getLatitude();
            double longitude = location.getLongitude();
            FirebaseFirestore db = FirebaseFirestore.getInstance();
            String postId = db.collection("posts").document().getId();
            Post post = new Post(address, category, date, imageUri.toString(), latitude, longitude, userId);
            post.setId(postId);
            post.setNotified(false);
            db.collection("posts").document(postId)
                    .set(post)
                    .addOnSuccessListener(aVoid -> {
                        Toast.makeText(this, "Reclamo subido correctamente", Toast.LENGTH_SHORT).show();
                    })
                    .addOnFailureListener(e -> {
                        Toast.makeText(this, "Error al subir el reclamo: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                        Timber.e(e, "Se produjo un error");
                    });
        }
        catch (IOException e) {
            Toast.makeText(this, "Error al buscar dirección", Toast.LENGTH_SHORT).show();
            Timber.e(e, "Se produjo un error");
        }
    }
}