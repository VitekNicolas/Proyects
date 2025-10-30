package com.example.javamobileapplication;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.core.content.FileProvider;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.Menu;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.Objects;
import timber.log.Timber;

public class RegisterActivity extends MenuActivity {

    private ActivityResultLauncher<Intent> galleryLauncher;
    private ActivityResultLauncher<Intent> cameraLauncher;
    private EditText et_email, et_password, et_repeatPassword;
    private FirebaseAuth myAuth;
    private Uri imageUri;
    private static final int REQUEST_GALLERY = 100;
    private static final int REQUEST_CAMERA = 101;
    private static final int REQUEST_IMAGE_CAPTURE = 101;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.register_activity);
        myAuth = FirebaseAuth.getInstance();
        et_email = findViewById(R.id.et_userEmail);
        et_password = findViewById(R.id.et_password_hint);
        et_repeatPassword = findViewById(R.id.et_passwordRepeat_hint);
        ImageView profilePhoto = findViewById(R.id.iv_profile_photo);
        Button btn_register = findViewById(R.id.btn_registerUser);
        btn_register.setOnClickListener(v -> registerUser());
        Button btn_add_photo = findViewById(R.id.btn_add_photo);
        btn_add_photo.setOnClickListener(v -> abrirSelectorImagen());
        Button btnDelete = findViewById(R.id.btn_remove_photo);
        btnDelete.setOnClickListener(v->deleteImage(profilePhoto));
        setActivityResult(profilePhoto);
    }

    private void setActivityResult(ImageView imageView) {
        galleryLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                        Uri sourceUri = result.getData().getData();
                        if (sourceUri != null) {
                            Timber.tag("RegisterActivity").d("Uri authority: %s", sourceUri.getAuthority());
                            try {
                                getContentResolver().takePersistableUriPermission(
                                        sourceUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);

                                InputStream inputStream = getContentResolver().openInputStream(sourceUri);
                                File file = new File(getFilesDir(), "imagen_" + System.currentTimeMillis() + ".jpg");
                                OutputStream outputStream = null;
                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                    outputStream = Files.newOutputStream(file.toPath());
                                }

                                byte[] buffer = new byte[1024];
                                int length;
                                while ((length = inputStream.read(buffer)) > 0) {
                                    outputStream.write(buffer, 0, length);
                                }

                                inputStream.close();
                                outputStream.close();

                                imageUri = Uri.fromFile(file); // ✅ URI segura para Glide
                                imageView.setImageURI(imageUri);

                            } catch (SecurityException se) {
                                Toast.makeText(imageView.getContext(), "No se puede acceder a la imagen seleccionada", Toast.LENGTH_SHORT).show();
                                Timber.e(se, "Se produjo un error");
                            } catch (IOException e) {
                                Toast.makeText(imageView.getContext(), "Error al cargar imagen", Toast.LENGTH_SHORT).show();
                                Timber.e(e, "Se produjo un error");
                            }
                        }
                    }
                }
        );

        cameraLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    if (result.getResultCode() == RESULT_OK && imageUri != null) {
                        imageView.setImageURI(imageUri);
                    }
                }
        );
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return false;
    }

    private void deleteImage(ImageView imageView) {
        imageView.setImageResource(R.drawable.user);
    }

    private void abrirSelectorImagen() {
        String[] opciones = {"Galería", "Cámara"};
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Seleccionar imagen desde:")
                .setItems(opciones, (dialog, which) -> {
                    if (which == 0) {
                        openImageGallery();
                    } else {
                        openCamera();
                    }
                });
        builder.show();
    }

    private void openImageGallery() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.setType("image/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        galleryLauncher.launch(intent);
    }

    private void openCamera() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (intent.resolveActivity(getPackageManager()) != null) {
            File photo = new File(getExternalFilesDir(null), "temp_user_photo.jpg");
            imageUri = FileProvider.getUriForFile(this, getPackageName() + ".provider", photo);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            cameraLauncher.launch(intent);
        }
    }


//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        ImageView imageView = findViewById(R.id.iv_profile_photo);
//        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
//            imageView.setImageURI(imageUri);
//        } else if (requestCode == REQUEST_GALLERY && resultCode == RESULT_OK && data != null) {
//            Uri sourceUri = data.getData();
//            assert sourceUri != null;
//            Timber.tag("RegisterActivity").d("Uri authority: %s", sourceUri.getAuthority());
//            try {
//                getContentResolver().takePersistableUriPermission(sourceUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
//                InputStream inputStream = getContentResolver().openInputStream(sourceUri);
//                File file = new File(getFilesDir(), "imagen_" + System.currentTimeMillis() + ".jpg");
//                OutputStream outputStream = null;
//                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//                    outputStream = Files.newOutputStream(file.toPath());
//                }
//                byte[] buffer = new byte[1024];
//                int length;
//                while (true) {
//                    assert inputStream != null;
//                    if (!((length = inputStream.read(buffer)) > 0)) break;
//                    assert outputStream != null;
//                    outputStream.write(buffer, 0, length);
//                }
//                inputStream.close();
//                assert outputStream != null;
//                outputStream.close();
//                imageUri = Uri.fromFile(file);
//                imageView.setImageURI(imageUri);
//            } catch (SecurityException se) {
//                Toast.makeText(this, "No se puede acceder a la imagen seleccionada", Toast.LENGTH_SHORT).show();
//                Timber.e(se,"Se produjo un error");
//            } catch (IOException e) {
//                Toast.makeText(this, "Error al cargar imagen", Toast.LENGTH_SHORT).show();
//                Timber.e(e,"Se produjo un error");
//            }
//        }
//    }

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
        if (imageUri == null) {
            Toast.makeText(this, "Seleccione una imagen de perfil", Toast.LENGTH_SHORT).show();
            return;
        }
        myAuth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser firebaseUser = myAuth.getCurrentUser();
                        assert firebaseUser != null;
                        String userId = firebaseUser.getUid();
                        FirebaseApp.initializeApp(this);
                        saveUserToFirestore(userId,email, imageUri.toString());
                        startActivity(new Intent(this, LoginActivity.class));
                    } else {
                        Toast.makeText(this,
                                "Error al registrar: " + Objects.requireNonNull(task.getException()).getMessage(),
                                Toast.LENGTH_LONG).show();
                    }
                });
    }

    private void saveUserToFirestore(String uid, String email, String imageUrl) {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        User user = new User(email, imageUrl);
        db.collection("users")
                .document(uid)
                .set(user)
                .addOnSuccessListener(aVoid -> Toast.makeText(this, "Usuario registrado correctamente", Toast.LENGTH_SHORT).show())
                .addOnFailureListener(e -> Toast.makeText(this, "Error al guardar usuario: " + e.getMessage(), Toast.LENGTH_LONG).show());
    }
}