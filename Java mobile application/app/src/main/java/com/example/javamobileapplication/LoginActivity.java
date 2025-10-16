package com.example.javamobileapplication;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.widget.Toolbar;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import java.util.Objects;


public class LoginActivity extends AppCompatActivity {
    private EditText et_userEmail, et_userPassword;
    private FirebaseAuth myAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        et_userEmail=findViewById(R.id.et_userEmail);
        et_userPassword=findViewById(R.id.et_userPassword);
        Button btn_register = findViewById(R.id.btn_register);
        btn_register.setOnClickListener(registerListener);
        Button btn_login = findViewById(R.id.btn_loginUser);
        btn_login.setOnClickListener(v->loginUser());
        myAuth = FirebaseAuth.getInstance();
    }
    private final View.OnClickListener registerListener = v -> {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    };

    private void loginUser() {
        String email = et_userEmail.getText().toString().trim();
        String password = et_userPassword.getText().toString().trim();
        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Debe ingresar un email y una contraseña", Toast.LENGTH_SHORT).show();
            return;
        }
        myAuth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        Toast.makeText(this, "Inicio exitoso", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(this, MapActivity.class));
                        finish();
                    } else {
                        Toast.makeText(this, "Error al iniciar sesión: " +
                                Objects.requireNonNull(task.getException()).getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
    }
}