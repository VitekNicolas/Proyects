package com.example.javamobileapplication;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import java.util.Objects;

public class RegisterActivity extends MenuActivity {

    private EditText et_email, et_password, et_repeatPassword;
    private FirebaseAuth myAuth;
    private ImageView profilePhoto;
    private ImagePickerHelper imagePickerHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.register_activity);
        myAuth = FirebaseAuth.getInstance();
        et_email = findViewById(R.id.et_userEmail);
        et_password = findViewById(R.id.et_password_hint);
        et_repeatPassword = findViewById(R.id.et_passwordRepeat_hint);
        profilePhoto = findViewById(R.id.iv_profile_photo);
        imagePickerHelper = new ImagePickerHelper(this, profilePhoto);
        Button btnAddPhoto = findViewById(R.id.btn_add_photo);
        btnAddPhoto.setOnClickListener(v -> imagePickerHelper.showImageSourceDialog());
        Button btnDelete = findViewById(R.id.btn_remove_photo);
        btnDelete.setOnClickListener(v -> profilePhoto.setImageResource(R.drawable.user));
        Button btnRegister = findViewById(R.id.btn_registerUser);
        btnRegister.setOnClickListener(v -> registerUser());
    }

    private void registerUser() {
        String email = et_email.getText().toString().trim();
        String password = et_password.getText().toString().trim();
        String repeatPassword = et_repeatPassword.getText().toString().trim();
        Uri imageUri = imagePickerHelper.getImageUri();

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
                        saveUserToFirestore(userId, email, imageUri.toString());
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