package com.example.javamobileapplication;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;
import com.bumptech.glide.Glide;
import com.google.android.gms.common.SignInButton;
import com.google.firebase.auth.FirebaseAuth;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Objects;
import com.google.android.gms.auth.api.signin.*;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.*;

import timber.log.Timber;

public class LoginActivity extends AppCompatActivity {

    private static final int RC_SIGN_IN = 100;
    private EditText et_userEmail, et_password_hint;
    private FirebaseAuth myAuth;
    private SharedPreferences preferences;
    private GoogleSignInClient mGoogleSignInClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Objects.requireNonNull(getSupportActionBar()).setTitle("");
        et_userEmail=findViewById(R.id.et_userEmail);
        et_password_hint=findViewById(R.id.et_password_hint);
        Button btn_register = findViewById(R.id.btn_register);
        btn_register.setOnClickListener(registerListener);
        Button btn_login = findViewById(R.id.btn_loginUser);
        btn_login.setOnClickListener(v->loginUser());
        SignInButton btn_google = findViewById(R.id.btn_google);
        btn_google.setOnClickListener(v -> signInWithGoogle());
        myAuth = FirebaseAuth.getInstance();
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
        FirebaseUser user = myAuth.getCurrentUser();
        mostrarImagenGuardada(user);
    }


    private final View.OnClickListener registerListener = v -> {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    };

    private void loginUser() {
        String email = et_userEmail.getText().toString().trim();
        String password = et_password_hint.getText().toString().trim();
        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Debe ingresar un email y una contraseña", Toast.LENGTH_SHORT).show();
            return;
        }
        myAuth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        Toast.makeText(this, "Inicio exitoso", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(this, PostActivity.class));
                        finish();
                    } else {
                        Toast.makeText(this, "Error al iniciar sesión: " +
                                Objects.requireNonNull(task.getException()).getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
    }
    private void signInWithGoogle() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                firebaseAuthWithGoogle(account.getIdToken());
            } catch (ApiException e) {
                Toast.makeText(this, "Error al iniciar con Google", Toast.LENGTH_SHORT).show();
            }
        }
    }
    private void firebaseAuthWithGoogle(String idToken) {
        AuthCredential credential = GoogleAuthProvider.getCredential(idToken, null);
        myAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, task -> {
                    if (task.isSuccessful()) {
                        Toast.makeText(this, "Inicio exitoso", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(this, PostActivity.class));
                        finish();
                    } else {
                        Toast.makeText(this, "Error en la autenticación con Google", Toast.LENGTH_SHORT).show();
                    }
                });
    }
    private void mostrarImagenGuardada(FirebaseUser user) {
        preferences = getSharedPreferences("UserPrefs", Context.MODE_PRIVATE);
        String imagenBase64 = preferences.getString("profile_image", null);
        ImageView imgUserProfile = findViewById(R.id.iv_profilePhoto);
        if (imagenBase64 != null) {
            byte[] bytes = Base64.decode(imagenBase64, Base64.DEFAULT);
            Glide.with(this)
                    .asBitmap()
                    .load(bytes)
                    .circleCrop()
                    .placeholder(R.drawable.user)
                    .into(imgUserProfile);
        } else if (user.getPhotoUrl() != null) {
            Uri photoUrl = user.getPhotoUrl();
            Glide.with(this)
                    .load(photoUrl)
                    .circleCrop()
                    .placeholder(R.drawable.user)
                    .into(imgUserProfile);
            new Thread(() -> {
                try {
                    InputStream in = new URL(photoUrl.toString()).openStream();
                    Bitmap bitmap = BitmapFactory.decodeStream(in);
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 90, baos);
                    String imagen64 = Base64.encodeToString(baos.toByteArray(), Base64.DEFAULT);
                    preferences.edit().putString("profile_image", imagen64).apply();
                } catch (Exception e) {
                    Timber.e(e,"Error al procesar");
                }
            }).start();
        } else {
            imgUserProfile.setImageResource(R.drawable.user);
        }
    }
}