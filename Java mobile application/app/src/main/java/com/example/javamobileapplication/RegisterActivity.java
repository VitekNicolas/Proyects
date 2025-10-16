package com.example.javamobileapplication;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.google.firebase.auth.FirebaseAuth;

import java.util.Objects;

public class RegisterActivity extends AppCompatActivity {

    private EditText et_email, et_password, et_repeatPassword;
    private FirebaseAuth myAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.register_activity);
        myAuth = FirebaseAuth.getInstance();
        et_email = findViewById(R.id.et_userEmail);
        et_password = findViewById(R.id.et_userPassword);
        et_repeatPassword = findViewById(R.id.et_userPasswordRepeat);
        Button btn_register = findViewById(R.id.btn_registerUser);
        btn_register.setOnClickListener(v -> registerUser());
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
                        finish(); // Cierra esta Activity y vuelve al login
                    } else {
                        Toast.makeText(this, "Error al registrar: " + Objects.requireNonNull(task.getException()).getMessage(), Toast.LENGTH_LONG).show();
                    }
                });
    }
}
