package com.example.javamobileapplication;

import android.content.Context;
import android.graphics.Paint;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.google.firebase.firestore.FirebaseFirestore;
import java.util.ArrayList;
import java.util.List;
import timber.log.Timber;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.PostViewHolder> {

    private final List<Post> postList;
    private List<Post> filteredList;
    private final OnPostClickListener listener;
    private final boolean isAdmin;

    public interface OnPostClickListener {
        void onPostClick(Post post);
    }

    public PostAdapter(List<Post> postList, OnPostClickListener listener, boolean isAdmin) {
        this.postList = postList;
        this.listener = listener;
        this.isAdmin = isAdmin;
        this.filteredList = new ArrayList<>(postList);
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
        Post post = filteredList.get(position);
        holder.setStatusStyle(holder,position,this.filteredList);
        holder.bind(post, listener, isAdmin);
    }

    @Override
    public int getItemCount() {
        return filteredList.size();
    }

    public static class PostViewHolder extends RecyclerView.ViewHolder {
        TextView tvAddress, tvDate, tvStatus;
        ImageView imgThumbnail, btnAprobar, btnRechazar, btnDownload, btnLocation;

        public PostViewHolder(@NonNull View itemView) {
            super(itemView);
            tvAddress = itemView.findViewById(R.id.tvAddress);
            tvDate = itemView.findViewById(R.id.tv_fecha);
            tvStatus=itemView.findViewById(R.id.tv_status);
            imgThumbnail = itemView.findViewById(R.id.iv_preview);
            btnAprobar = itemView.findViewById(R.id.btn_check);
            btnRechazar = itemView.findViewById(R.id.btn_delete);
        }

        public void bind(Post post, OnPostClickListener listener, boolean isAdmin) {
            FirebaseFirestore db = FirebaseFirestore.getInstance();
            tvAddress.setText(post.getAddress());
            tvDate.setText(post.getDate());
            tvStatus.setText(post.getStatus());
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
                        .update("status", "aprobado")
                        .addOnSuccessListener(aVoid ->
                                Toast.makeText(itemView.getContext(), "Post aprobado", Toast.LENGTH_SHORT).show())
                        .addOnFailureListener(e ->
                                Timber.tag("Firestore").e(e, "Error al aprobar post"));
            });
            btnRechazar.setOnClickListener(v -> {
                db.collection("posts").document(post.getId())
                        .update("status", "rechazado")
                        .addOnSuccessListener(aVoid ->
                                Toast.makeText(itemView.getContext(), "Post rechazado", Toast.LENGTH_SHORT).show())
                        .addOnFailureListener(e ->
                                Toast.makeText(itemView.getContext(), "Error al rechazar post", Toast.LENGTH_SHORT).show());
            });
        }

        public void setStatusStyle(@NonNull PostViewHolder holder, int position, List<Post> postList){
            Context context = itemView.getContext();
            Post post = postList.get(position);
            holder.tvStatus.setText(post.getStatus());
            holder.tvStatus.setPaintFlags(holder.tvStatus.getPaintFlags() | Paint.UNDERLINE_TEXT_FLAG);
            switch (post.getStatus().toLowerCase()) {
                case "pendiente":
                    holder.tvStatus.setTextColor(ContextCompat.getColor(context, R.color.status_pendiente));
                    break;
                case "aprobado":
                    holder.tvStatus.setTextColor(ContextCompat.getColor(context, R.color.status_aprobado));
                    break;
                case "rechazado":
                    holder.tvStatus.setTextColor(ContextCompat.getColor(context, R.color.status_rechazado));
                    break;
                default:
                    holder.tvStatus.setTextColor(ContextCompat.getColor(context, R.color.black));
                    break;
            }
        }
    }

    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence constraint) {
                String query = constraint.toString().toLowerCase().trim();
                List<Post> filtered = new ArrayList<>();
                if (query.isEmpty()) {
                    filtered = new ArrayList<>(postList);
                } else {
                    for (Post post : postList) {
                        if ((post.getAddress() != null && post.getAddress().toLowerCase().contains(query)) ||
                                (post.getStatus() != null && post.getStatus().toLowerCase().contains(query)) ||
                                (post.getDate() != null && post.getDate().toLowerCase().contains(query)) ||
                                (post.getCategory() != null && post.getCategory().toLowerCase().contains(query)) ||
                                (post.getUserId() != null && post.getUserId().toLowerCase().contains(query))) {
                            filtered.add(post);
                        }
                    }
                }
                FilterResults results = new FilterResults();
                results.values = filtered;
                return results;
            }

            @Override
            protected void publishResults(CharSequence constraint, FilterResults results) {
                filteredList = (List<Post>) results.values;
                notifyDataSetChanged();
            }
        };
    }
}