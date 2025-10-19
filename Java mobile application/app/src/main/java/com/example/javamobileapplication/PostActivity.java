package com.example.javamobileapplication;

import android.Manifest;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.widget.Toolbar;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import java.io.File;
import java.util.Calendar;

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
        Button btnSavePost=findViewById(R.id.btn_publish);
        Button btnGaleria = findViewById(R.id.btn_choose_image);
        btnCamera.setOnClickListener(v -> {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA);
            } else {
                abrirCamara();
            }
        });
        btnGaleria.setOnClickListener(v -> abrirGaleria());
        btnSavePost.setOnClickListener(v -> guardarPublicacion());
        etFecha.setOnClickListener(v -> mostrarSelectorFecha());
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
    }

    private void abrirCamara() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (intent.resolveActivity(getPackageManager()) != null) {
            File foto = new File(getExternalFilesDir(null), "temp.jpg");
            imageUri = FileProvider.getUriForFile(this, getPackageName() + ".provider", foto);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
        } else {
            Toast.makeText(this, "No se encontró una aplicación de cámara", Toast.LENGTH_SHORT).show();
        }
    }
    private void abrirGaleria() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, REQUEST_GALLERY);
    }

    private void mostrarSelectorFecha() {
        final Calendar calendario = Calendar.getInstance();
        int año = calendario.get(Calendar.YEAR);
        int mes = calendario.get(Calendar.MONTH);
        int dia = calendario.get(Calendar.DAY_OF_MONTH);
        DatePickerDialog dialog = new DatePickerDialog(this,
                (view, year, month, dayOfMonth) -> {
                    String fechaSeleccionada = dayOfMonth + "/" + (month + 1) + "/" + year;
                    etFecha.setText(fechaSeleccionada);
                }, año, mes, dia);
        dialog.show();
    }
    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_CAMERA) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                abrirCamara();
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
        }
        else if (requestCode == REQUEST_GALLERY && resultCode == RESULT_OK && data != null) {
            imageUri = data.getData();
            imageView.setImageURI(imageUri);
        }
    }

    private void guardarPublicacion() {
        EditText et_description=findViewById(R.id.et_description);
        String descripcion = et_description.getText().toString().trim();
        String tipo = spinnerTipo.getSelectedItem().toString();
        String fecha = etFecha.getText().toString();
        if (descripcion.isEmpty() || imageUri == null || tipo.isEmpty() || fecha.isEmpty()) {
            Toast.makeText(this, "Complete todos los campos", Toast.LENGTH_SHORT).show();
        }
        else{
            Toast.makeText(this, "Reclamos guardado correctamente", Toast.LENGTH_SHORT).show();
        }
        Post post = new Post(descripcion, tipo, fecha, imageUri.toString());
        PostRepository repository = new PostRepository(this);
        long id = repository.insertarPost(post);

        if (id > 0) {
            Toast.makeText(this, "Reclamo guardado correctamente", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Error al guardar el reclamo", Toast.LENGTH_SHORT).show();
        }
}
}
