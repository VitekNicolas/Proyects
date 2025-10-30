package com.example.javamobileapplication;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.widget.SearchView;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import timber.log.Timber;

public class PostListActivity extends MenuActivity {

    private RecyclerView recyclerView;
    private FirebaseFirestore db;
    private FirebaseAuth auth;
    private static final String CHANNEL_ID = "post_status_channel";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_list);
        recyclerView = findViewById(R.id.recyclerViewPosts);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        db = FirebaseFirestore.getInstance();
        auth = FirebaseAuth.getInstance();
        checkUserRole();
        createNotificationChannel();
        requestNotificationPermission();
        listenToPostStatusChanges();
    }

    private void checkUserRole() {
        FirebaseUser user = auth.getCurrentUser();
        if (user == null) return;
        db.collection("users").document(user.getUid())
                .get()
                .addOnSuccessListener(documentSnapshot -> {
                    String role = documentSnapshot.getString("role");
                    boolean isAdmin = "admin".equals(role);
                    loadPosts(isAdmin);
                })
                .addOnFailureListener(e -> Timber.tag("Firestore").e(e, "Error al obtener rol"));
    }

    private void loadPosts(boolean isAdmin) {
        FirebaseUser user = auth.getCurrentUser();
        if (user == null) return;
        Query query;
        if (isAdmin) {
            query = db.collection("posts");
        } else {
            query = db.collection("posts")
                    .whereEqualTo("userId", user.getUid())
                    .whereIn("status", Arrays.asList("aprobado", "rechazado"));
        }
        query.get().addOnSuccessListener(querySnapshot -> {
            List<Post> posts = new ArrayList<>();
            for (DocumentSnapshot doc : querySnapshot.getDocuments()) {
                Post post = doc.toObject(Post.class);
                if (post != null) posts.add(post);
            }
            PostAdapter adapter = new PostAdapter(posts, post -> {
                Intent intent = new Intent(this, PostDetailActivity.class);
                intent.putExtra("post", post);
                startActivity(intent);
            }, isAdmin);
            recyclerView.setAdapter(adapter);
            SearchView searchView = findViewById(R.id.search_post);
            searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
                @Override
                public boolean onQueryTextSubmit(String query) {
                    adapter.getFilter().filter(query);
                    return false;
                }

                @Override
                public boolean onQueryTextChange(String newText) {
                    adapter.getFilter().filter(newText);
                    return true;
                }
            });
        });
    }


    private void showStatusNotification(String category, String status) {
        String message = status.equals("aprobado")
                ? "Tu reclamo de tipo \"" + category + "\" fue APROBADO"
                : "Tu reclamo de tipo \"" + category + "\" fue RECHAZADO";
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "post_status_channel")
                .setSmallIcon(R.drawable.ic_notification)
                .setContentTitle("Actualización de tu reclamo")
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true);
        NotificationManagerCompat manager = NotificationManagerCompat.from(this);
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU ||
                checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
            manager.notify((int) System.currentTimeMillis(), builder.build());
        }
    }

    private void listenToPostStatusChanges() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user == null) return;
        db.collection("posts")
                .whereEqualTo("userId", user.getUid())
                .addSnapshotListener((querySnapshot, error) -> {
                    if (error != null || querySnapshot == null) return;
                    for (DocumentChange change : querySnapshot.getDocumentChanges()) {
                        DocumentSnapshot doc = change.getDocument();
                        Post post = doc.toObject(Post.class);
                        if (change.getType() == DocumentChange.Type.MODIFIED) {
                            String newStatus = post.getStatus();
                            if ((newStatus.equals("aprobado") || newStatus.equals("rechazado")) && !post.isNotified()) {
                                showStatusNotification(post.getCategory(), newStatus);
                                doc.getReference().update("notified", true);
                            }
                        }
                    }
                });
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Actualización de reclamos";
            String description = "Notifica cambios en el estado de tus reclamos";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void requestNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{android.Manifest.permission.POST_NOTIFICATIONS}, 1);
            }
        }
    }
}