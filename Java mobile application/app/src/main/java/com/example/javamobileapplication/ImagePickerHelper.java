package com.example.javamobileapplication;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.widget.ImageView;
import android.widget.Toast;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import android.util.Log;

public class ImagePickerHelper {

    private final Activity activity;
    private final ImageView imageView;
    private Uri imageUri;
    private ActivityResultLauncher<Intent> galleryLauncher;
    private ActivityResultLauncher<Intent> cameraLauncher;

    public ImagePickerHelper(Activity activity, ImageView imageView) {
        this.activity = activity;
        this.imageView = imageView;
        initLaunchers();
    }

    private void initLaunchers() {
        galleryLauncher = ((AppCompatActivity) activity)
                .registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                        result -> {
                            if (result.getResultCode() == Activity.RESULT_OK && result.getData() != null) {
                                Uri sourceUri = result.getData().getData();
                                if (sourceUri != null) handleGalleryImage(sourceUri);
                            }
                        });

        cameraLauncher = ((AppCompatActivity) activity)
                .registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                        result -> {
                            if (result.getResultCode() == Activity.RESULT_OK && imageUri != null) {
                                imageView.setImageURI(imageUri);
                            }
                        });
    }

    public void showImageSourceDialog() {
        String[] options = {"Galería", "Cámara"};
        new AlertDialog.Builder(activity)
                .setTitle("Seleccionar imagen desde:")
                .setItems(options, (dialog, which) -> {
                    if (which == 0) openImageGallery();
                    else openCamera();
                })
                .show();
    }

    public Uri getImageUri() {
        return imageUri;
    }

    private void openImageGallery() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.setType("image/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        galleryLauncher.launch(intent);
    }

    private void openCamera() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (intent.resolveActivity(activity.getPackageManager()) != null) {
            File photo = new File(activity.getExternalFilesDir(null),
                    "temp_" + System.currentTimeMillis() + ".jpg");
            imageUri = androidx.core.content.FileProvider.getUriForFile(activity,
                    activity.getPackageName() + ".provider", photo);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            cameraLauncher.launch(intent);
        } else {
            Toast.makeText(activity, "No se encontró una aplicación de cámara", Toast.LENGTH_SHORT).show();
        }
    }

    private void handleGalleryImage(Uri sourceUri) {
        try {
            activity.getContentResolver().takePersistableUriPermission(
                    sourceUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
            InputStream inputStream = activity.getContentResolver().openInputStream(sourceUri);
            File file = new File(activity.getFilesDir(), "imagen_" + System.currentTimeMillis() + ".jpg");
            OutputStream outputStream = null;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                outputStream = Files.newOutputStream(file.toPath());
            }
            byte[] buffer = new byte[1024];
            int length;
            while (true) {
                assert inputStream != null;
                if (!((length = inputStream.read(buffer)) > 0)) break;
                assert outputStream != null;
                outputStream.write(buffer, 0, length);
            }
            inputStream.close();
            assert outputStream != null;
            outputStream.close();
            imageUri = Uri.fromFile(file);
            imageView.setImageURI(imageUri);
        } catch (Exception e) {
            Toast.makeText(activity, "Error al cargar imagen", Toast.LENGTH_SHORT).show();
            Log.e("ImagePickerHelper", "Error procesando imagen", e);
        }
    }
}
