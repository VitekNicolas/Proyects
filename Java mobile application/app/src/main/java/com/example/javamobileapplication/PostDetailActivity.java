package com.example.javamobileapplication;

import android.net.Uri;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

public class PostDetailActivity extends MenuActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.post_detail_activity);
        Post post = (Post) getIntent().getSerializableExtra("post");
        if (post != null) {
            TextView tvAddress = findViewById(R.id.tv_address);
            TextView tvCategory = findViewById(R.id.tv_category);
            TextView tvDate = findViewById(R.id.tv_date);
            ImageView imgPreview = findViewById(R.id.iv_image);
            tvAddress.setText(post.getAddress());
            tvCategory.setText(post.getCategory());
            tvDate.setText(post.getDate());
            if (post.getImageUri() != null) {
                imgPreview.setImageURI(Uri.parse(post.getImageUri()));
            }
        }
    }
}