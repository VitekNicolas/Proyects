package com.example.javamobileapplication;

import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.List;

import timber.log.Timber;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.PostViewHolder> {

    private final List<Post> postList;
    private final OnPostClickListener listener;
    private final boolean isAdmin; // ✅ nuevo campo

    public interface OnPostClickListener {
        void onPostClick(Post post);
    }

    public PostAdapter(List<Post> postList, OnPostClickListener listener, boolean isAdmin) {
        this.postList = postList;
        this.listener = listener;
        this.isAdmin = isAdmin;
    }

    @NonNull
    @Override
    public PostViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_post, parent, false);
        return new PostViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PostViewHolder holder, int position) {
        Post post = postList.get(position);
        holder.bind(post, listener, isAdmin);
    }

    @Override
    public int getItemCount() {
        return postList.size();
    }

    public static class PostViewHolder extends RecyclerView.ViewHolder {
        TextView tvAddress, tvDate;
        ImageView imgThumbnail, btnAprobar, btnRechazar;

        public PostViewHolder(@NonNull View itemView) {
            super(itemView);
            tvAddress = itemView.findViewById(R.id.tvAddress);
            tvDate = itemView.findViewById(R.id.tv_fecha);
            imgThumbnail = itemView.findViewById(R.id.iv_preview);
            btnAprobar = itemView.findViewById(R.id.btn_check);
            btnRechazar = itemView.findViewById(R.id.btn_delete);
        }

        public void bind(Post post, OnPostClickListener listener, boolean isAdmin) {
            FirebaseFirestore db = FirebaseFirestore.getInstance();
            tvAddress.setText(post.getAddress());
            tvDate.setText(post.getDate());
            Glide.with(itemView.getContext())
                    .load(Uri.parse(post.getImageUri()))
                    .into(imgThumbnail);
            if (isAdmin) {
                btnAprobar.setVisibility(View.VISIBLE);
                btnRechazar.setVisibility(View.VISIBLE);
            } else {
                btnAprobar.setVisibility(View.GONE);
                btnRechazar.setVisibility(View.GONE);
            }
            itemView.setOnClickListener(v -> listener.onPostClick(post));
            btnAprobar.setOnClickListener(v -> {
                db.collection("posts").document(post.getId())
                        .update("status", "approved")
                        .addOnSuccessListener(aVoid ->
                                Toast.makeText(itemView.getContext(), "Post aprobado", Toast.LENGTH_SHORT).show())
                        .addOnFailureListener(e ->
                                Timber.tag("Firestore").e(e, "Error al aprobar post"));
            });
            btnRechazar.setOnClickListener(v -> {
                db.collection("posts").document(post.getId())
                        .update("status", "rejected")
                        .addOnSuccessListener(aVoid ->
                                Toast.makeText(itemView.getContext(), "Post rechazado", Toast.LENGTH_SHORT).show())
                        .addOnFailureListener(e ->
                                Toast.makeText(itemView.getContext(), "Error al rechazar post", Toast.LENGTH_SHORT).show());
            });
        }
    }
}