package com.example.javamobileapplication;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import java.util.ArrayList;
import java.util.List;
import timber.log.Timber;

public class PostListActivity extends MenuActivity {

    private PostAdapter adapter;
    private final List<Post> postList = new ArrayList<>();
    private FirebaseFirestore db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_list);
        RecyclerView recyclerView = findViewById(R.id.recyclerViewPosts);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new PostAdapter(postList, post -> {
            Intent intent = new Intent(this, PostDetailActivity.class);
            intent.putExtra("post", post);
            startActivity(intent);
        });
        recyclerView.setAdapter(adapter);
        db = FirebaseFirestore.getInstance();
        loadPostsFromFirestore();
    }

    private void loadPostsFromFirestore() {
        db.collection("posts")
                .orderBy("date", Query.Direction.DESCENDING) // 🔽 más recientes primero
                .get()
                .addOnSuccessListener(querySnapshot -> {
                    List<Post> newPosts = new ArrayList<>();
                    for (QueryDocumentSnapshot document : querySnapshot) {
                        Post post = document.toObject(Post.class);
                        newPosts.add(post);
                    }

                    if (newPosts.isEmpty()) {
                        Toast.makeText(this, "No hay publicaciones", Toast.LENGTH_SHORT).show();
                    }

                    postList.clear();
                    postList.addAll(newPosts);
                    adapter.notifyDataSetChanged();
                })
                .addOnFailureListener(e -> {
                    Toast.makeText(this, "Error al cargar publicaciones", Toast.LENGTH_SHORT).show();
                    Timber.e(e,"Se produjo un error");
                });
    }
}
