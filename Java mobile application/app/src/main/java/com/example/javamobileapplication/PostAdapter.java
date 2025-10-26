package com.example.javamobileapplication;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
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
import java.io.InputStream;
import java.util.List;
import timber.log.Timber;
import org.osmdroid.util.GeoPoint;
import org.osmdroid.views.MapView;
import org.osmdroid.views.overlay.Marker;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.PostViewHolder> {

    private final List<Post> postList;
    private final OnPostClickListener listener;
    private final boolean isAdmin;

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
        ImageView imgThumbnail, btnAprobar, btnRechazar, btnDownload, btnLocation;

        public PostViewHolder(@NonNull View itemView) {
            super(itemView);
            tvAddress = itemView.findViewById(R.id.tvAddress);
            tvDate = itemView.findViewById(R.id.tv_fecha);
            imgThumbnail = itemView.findViewById(R.id.iv_preview);
            btnAprobar = itemView.findViewById(R.id.btn_check);
            btnRechazar = itemView.findViewById(R.id.btn_delete);
            btnDownload = itemView.findViewById(R.id.btn_download);
            btnLocation = itemView.findViewById(R.id.btn_location);
        }

        public void bind(Post post, OnPostClickListener listener, boolean isAdmin) {
            Context context = itemView.getContext();
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
            btnDownload.setOnClickListener(v -> {
                try {
                    Uri imageUri = Uri.parse(post.getImageUri());
                    InputStream inputStream = context.getContentResolver().openInputStream(imageUri);
                    if (inputStream == null) {
                        Toast.makeText(context, "No se pudo abrir la imagen", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    String fileName = "post_" + System.currentTimeMillis() + ".jpg";
                    Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.setType("image/jpeg");
                    intent.putExtra(Intent.EXTRA_TITLE, fileName);
                    ((Activity) context).startActivityForResult(intent, 3001);
                    ((PostListActivity) context).setPendingImageStream(inputStream);
                } catch (Exception e) {
                    Toast.makeText(context, "Error al iniciar descarga: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
            btnLocation.setOnClickListener(v -> {
                Intent intent = new Intent(itemView.getContext(), MapActivity.class);
                intent.putExtra("latitude", post.getLatitude());
                intent.putExtra("longitude", post.getLongitude());
                intent.putExtra("address", post.getAddress());
                itemView.getContext().startActivity(intent);
            });
        }
    }
}