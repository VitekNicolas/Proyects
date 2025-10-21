package com.example.javamobileapplication;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class PostListActivity extends MenuActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_list);
        RecyclerView recyclerView = findViewById(R.id.recyclerViewPosts);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        PostRepository repository = new PostRepository(this);
        List<Post> posts = repository.getLastTenPosts();
        if (posts.isEmpty()) {
            Toast.makeText(this, "No hay publicaciones", Toast.LENGTH_SHORT).show();
        }
        PostAdapter adapter = new PostAdapter(posts, post -> {
            Intent intent = new Intent(this, PostDetailActivity.class);
            intent.putExtra("post", post); // ✅ pasamos el objeto completo
            startActivity(intent);
        });
        recyclerView.setAdapter(adapter);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
    }
}
