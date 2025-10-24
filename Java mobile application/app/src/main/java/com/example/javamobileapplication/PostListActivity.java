package com.example.javamobileapplication;

import android.content.Intent;
import android.os.Bundle;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;

import java.util.ArrayList;
import java.util.List;
import timber.log.Timber;

public class PostListActivity extends MenuActivity {

    private RecyclerView recyclerView;
    private FirebaseFirestore db;
    private FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_list);
        recyclerView = findViewById(R.id.recyclerViewPosts);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        db = FirebaseFirestore.getInstance();
        auth = FirebaseAuth.getInstance();
        checkUserRole();
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
        Query query = db.collection("posts");
        if (isAdmin) {
            // 👑 El admin ve los pendientes
            query = query.whereEqualTo("status", "pending");
        }
        else{
            query = query
                    .whereEqualTo("userId", user.getUid())
                    .whereEqualTo("status", "approved");
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
        });
    }
}
