package com.example.javamobileapplication;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import com.bumptech.glide.Glide;
import com.google.android.gms.common.SignInButton;
import com.google.firebase.auth.FirebaseAuth;
import java.util.Objects;
import com.google.android.gms.auth.api.signin.*;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.*;
import com.google.firebase.firestore.FirebaseFirestore;
import timber.log.Timber;

public class LoginActivity extends MenuActivity {

    private static final int RC_SIGN_IN = 100;
    private EditText et_userEmail, et_password_hint;
    private FirebaseAuth myAuth;
    private GoogleSignInClient mGoogleSignInClient;
    private ImageView iv_profilePhoto;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        et_userEmail = findViewById(R.id.et_userEmail);
        et_password_hint = findViewById(R.id.et_password_hint);
        iv_profilePhoto = findViewById(R.id.iv_profilePhoto);
        Button btn_register = findViewById(R.id.btn_register);
        btn_register.setOnClickListener(v -> startActivity(new Intent(this, RegisterActivity.class)));
        Button btn_login = findViewById(R.id.btn_loginUser);
        btn_login.setOnClickListener(v -> loginUser());
        SignInButton btn_google = findViewById(R.id.btn_google);
        TextView textView = (TextView) btn_google.getChildAt(0);
        textView.setText(getString(R.string.btn_loginGoogle_title));
        btn_google.setOnClickListener(v -> signInWithGoogle());
        myAuth = FirebaseAuth.getInstance();
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
        loadProfileImageIfExists();
        LocaleHelper.loadLocale(this);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return false;
    }

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
                        FirebaseUser user = myAuth.getCurrentUser();
                        if (user != null) {
                            FirebaseFirestore db = FirebaseFirestore.getInstance();
                            db.collection("users").document(user.getUid()).get()
                                    .addOnSuccessListener(document -> {
                                        if (document.exists()) {
                                            String photoUrl = document.getString("imageUri");
                                            saveProfileImageLocally(photoUrl);
                                        }
                                        Toast.makeText(this, "Inicio exitoso", Toast.LENGTH_SHORT).show();
                                        startActivity(new Intent(this, PostActivity.class));
                                        finish();
                                    })
                                    .addOnFailureListener(e -> {
                                        Toast.makeText(this, "Error al obtener foto de perfil", Toast.LENGTH_SHORT).show();
                                        startActivity(new Intent(this, PostActivity.class));
                                        finish();
                                    });
                        }
                    } else {
                        Toast.makeText(this, "Error al iniciar sesión: " +
                                Objects.requireNonNull(task.getException()).getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
    }

    // 🔹 Login con Google
    private void signInWithGoogle() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }


    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                if (account != null) {
                    firebaseAuthWithGoogle(account);
                }
            } catch (ApiException e) {
                Timber.tag("GoogleSignIn").e(e, "Error al obtener cuenta de Google");
            }
        }
    }

    private void firebaseAuthWithGoogle(GoogleSignInAccount account) {
        AuthCredential credential = GoogleAuthProvider.getCredential(account.getIdToken(), null);
        myAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser firebaseUser = myAuth.getCurrentUser();
                        if (firebaseUser != null) {
                            String email = firebaseUser.getEmail();
                            String photoUrl = (firebaseUser.getPhotoUrl() != null)
                                    ? firebaseUser.getPhotoUrl().toString()
                                    : null;
                            saveGoogleUserToFirebase(email, photoUrl);
                            if (photoUrl != null) saveProfileImageLocally(photoUrl);
                            startActivity(new Intent(this, PostActivity.class));
                            finish();
                        }
                    } else {
                        Toast.makeText(this, "Error en la autenticación con Google", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    private void saveGoogleUserToFirebase(String email, String photoUrl) {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        String userId = Objects.requireNonNull(FirebaseAuth.getInstance().getCurrentUser()).getUid();
        User user = new User(email, photoUrl);
        db.collection("users")
                .document(userId)
                .set(user)
                .addOnSuccessListener(aVoid -> Timber.tag("Firestore").d("Usuario guardado/actualizado"))
                .addOnFailureListener(e -> Timber.tag("Firestore").w(e, "Error al guardar usuario"));
    }

    private void saveProfileImageLocally(String imageUri) {
        SharedPreferences prefs = getSharedPreferences("UserPrefs", MODE_PRIVATE);
        prefs.edit().putString("imageUri", imageUri).apply();
        Toast.makeText(this, "Imagen guardada", Toast.LENGTH_SHORT).show();
    }

    private void loadProfileImageIfExists() {
        SharedPreferences prefs = getSharedPreferences("UserPrefs", MODE_PRIVATE);
        String savedUri = prefs.getString("imageUri", null);
        if (savedUri != null) {
            Uri uri = Uri.parse(savedUri);
            ImageView ivProfilePhoto = findViewById(R.id.iv_profilePhoto);
            Glide.with(this)
                    .load(uri)
                    .circleCrop()
                    .placeholder(R.drawable.user)
                    .into(ivProfilePhoto);
            Toast.makeText(this, "hay imagen", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "No hay imagen", Toast.LENGTH_SHORT).show();
            iv_profilePhoto.setImageResource(R.drawable.user);
        }
    }
}
