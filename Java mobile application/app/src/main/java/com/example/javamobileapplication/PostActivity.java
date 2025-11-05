package com.example.javamobileapplication;

import android.app.DatePickerDialog;
import android.location.Address;
import android.location.Geocoder;
import android.net.Uri;
import android.os.Bundle;
import android.widget.*;
import android.view.WindowManager;
import android.widget.Toast;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

public class PostActivity extends MenuActivity {

    private Spinner spinnerTipo;
    private EditText etFecha, et_description;
    private ImagePickerHelper imagePickerHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.post_activity);
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
        spinnerTipo = findViewById(R.id.spinner_tipo_reclamo);
        etFecha = findViewById(R.id.et_fecha);
        et_description = findViewById(R.id.et_description);
        ImageView imgPreview = findViewById(R.id.img_preview);
        imagePickerHelper = new ImagePickerHelper(this, imgPreview);
        findViewById(R.id.btnCamera).setOnClickListener(v -> imagePickerHelper.showImageSourceDialog());
        findViewById(R.id.btn_publish_title).setOnClickListener(v -> savePost());
        etFecha.setOnClickListener(v -> showDateSelector());
    }

    private void showDateSelector() {
        final Calendar calendar = Calendar.getInstance();
        DatePickerDialog dialog = new DatePickerDialog(this,
                (view, yr, mon, dayOfMonth) -> etFecha.setText(dayOfMonth + "/" + (mon + 1) + "/" + yr),
                calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH),
                calendar.get(Calendar.DAY_OF_MONTH));
        dialog.show();
    }

    private void savePost() {
        Uri imageUri = imagePickerHelper.getImageUri();
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user == null) return;

        String userId = user.getUid();
        FirebaseApp.initializeApp(this);

        String address = et_description.getText().toString().trim();
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
                    .addOnSuccessListener(aVoid -> Toast.makeText(this, "Reclamo subido correctamente", Toast.LENGTH_SHORT).show())
                    .addOnFailureListener(e -> Toast.makeText(this, "Error al subir el reclamo: " + e.getMessage(), Toast.LENGTH_SHORT).show());

        } catch (IOException e) {
            Toast.makeText(this, "Error al buscar dirección", Toast.LENGTH_SHORT).show();
        }
    }
}