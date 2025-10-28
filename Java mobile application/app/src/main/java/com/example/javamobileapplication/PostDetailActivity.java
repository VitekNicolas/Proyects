package com.example.javamobileapplication;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;
import com.google.firebase.firestore.FirebaseFirestore;
import java.io.InputStream;
import java.io.OutputStream;

public class PostDetailActivity extends MenuActivity {

    private static final int REQUEST_CODE_SAVE_IMAGE = 3001;
    private InputStream pendingImageStream;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.post_detail_activity);
        Post post = (Post) getIntent().getSerializableExtra("post");
        getPostData(post);
        ImageButton ibLocate=findViewById(R.id.btn_location);
        ibLocate.setOnClickListener(v-> {
            assert post != null;
            locatePostInMap(post);
        });
        ImageButton ibDownload=findViewById(R.id.btn_download);
        ibDownload.setOnClickListener(v-> {
            assert post != null;
            downloadPostImage(post);
        });
        ImageButton ibDelete=findViewById(R.id.btn_delete);
        ibDelete.setOnClickListener(v->{
            assert post != null;
            deletePost(post);
        });
    }

    private void getPostData(Post post){
        if (post != null) {
            TextView tvAddress = findViewById(R.id.tv_address);
            TextView tvCategory = findViewById(R.id.tv_category);
            TextView tvDate = findViewById(R.id.tv_date);
            ImageView imgPreview = findViewById(R.id.iv_image);
            TextView tvStatus = findViewById(R.id.tv_status);
            TextView tvId=findViewById(R.id.tv_id);
            tvAddress.setText(post.getAddress());
            tvCategory.setText(post.getCategory());
            tvDate.setText(post.getDate());
            tvCategory.setText(post.getCategory());
            tvStatus.setText(post.getStatus());
            tvId.setText(post.getId());
            switch (post.getStatus().toLowerCase()) {
                case "pendiente":
                    tvStatus.setTextColor(ContextCompat.getColor(this, R.color.status_pendiente));
                    break;
                case "aprobado":
                    tvStatus.setTextColor(ContextCompat.getColor(this, R.color.status_aprobado));
                    break;
                case "rechazado":
                    tvStatus.setTextColor(ContextCompat.getColor(this, R.color.status_rechazado));
                    break;
                default:
                    tvStatus.setTextColor(ContextCompat.getColor(this, R.color.black));
                    break;
            }
            if (post.getImageUri() != null) {
                imgPreview.setImageURI(Uri.parse(post.getImageUri()));
            }
        }
    }

    private void deletePost(Post post){
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        String postId = post.getId(); // currentPost es el Post que estás mostrando en la actividad
        if (postId == null || postId.isEmpty()) {
            Toast.makeText(this, "ID del reclamo no válido", Toast.LENGTH_SHORT).show();
            return;
        }
        db.collection("posts").document(postId)
                .delete()
                .addOnSuccessListener(aVoid -> {
                    Toast.makeText(this, "Reclamo eliminado correctamente", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(PostDetailActivity.this, PostListActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(intent);
                    finish();
                })
                .addOnFailureListener(e -> {
                    Toast.makeText(this, "Error al eliminar el reclamo: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                });
    }

    private void downloadPostImage(Post post){
        try {
            Uri imageUri = Uri.parse(post.getImageUri());
            InputStream inputStream = this.getContentResolver().openInputStream(imageUri);
            if (inputStream == null) {
                Toast.makeText(this, "No se pudo abrir la imagen", Toast.LENGTH_SHORT).show();
                return;
            }
            String fileName = "post_" + System.currentTimeMillis() + ".jpg";
            Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            intent.setType("image/jpeg");
            intent.putExtra(Intent.EXTRA_TITLE, fileName);
            startActivityForResult(intent, 3001);
            setPendingImageStream(inputStream);
        } catch (Exception e) {
            Toast.makeText(this, "Error al iniciar descarga: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void locatePostInMap(Post post){
        Intent intent = new Intent(this, MapActivity.class);
        intent.putExtra("latitude", post.getLatitude());
        intent.putExtra("longitude", post.getLongitude());
        intent.putExtra("address", post.getAddress());
        this.startActivity(intent);
    }

    public void setPendingImageStream(InputStream stream) {
        this.pendingImageStream = stream;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_SAVE_IMAGE && resultCode == RESULT_OK && data != null) {
            Uri uri = data.getData();
            if (uri != null && pendingImageStream != null) {
                saveImageToUri(uri, pendingImageStream);
            }
        }
    }

    private void saveImageToUri(Uri destinationUri, InputStream inputStream) {
        new Thread(() -> {
            try (OutputStream outputStream = getContentResolver().openOutputStream(destinationUri)) {
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    assert outputStream != null;
                    outputStream.write(buffer, 0, bytesRead);
                }
                runOnUiThread(this::showDownloadNotification);
            } catch (Exception e) {
                runOnUiThread(() ->
                        Toast.makeText(this, "Error al guardar imagen: " + e.getMessage(), Toast.LENGTH_SHORT).show()
                );
            }
        }).start();
    }

    private void showDownloadNotification() {
        NotificationManagerCompat manager = NotificationManagerCompat.from(this);
        String channelId = "download_channel";
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    channelId, "Descargas", NotificationManager.IMPORTANCE_DEFAULT);
            manager.createNotificationChannel(channel);
        }
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, channelId)
                .setSmallIcon(R.drawable.ic_download)
                .setContentTitle("Descarga completada")
                .setContentText("La imagen del reclamo se guardó correctamente")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setAutoCancel(true);
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU ||
                checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
            manager.notify((int) System.currentTimeMillis(), builder.build());
        }
    }
}