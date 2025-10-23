package com.example.javamobileapplication;

import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.multidex.BuildConfig;
import androidx.preference.PreferenceManager;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import org.osmdroid.config.Configuration;
import org.osmdroid.tileprovider.tilesource.TileSourceFactory;
import org.osmdroid.util.GeoPoint;
import org.osmdroid.views.MapView;
import org.osmdroid.views.overlay.Marker;
import java.io.IOException;
import java.util.List;
import java.util.Locale;

import timber.log.Timber;

public class MapActivity extends MenuActivity {

    private MapView mapView;
    private EditText etSearch;
    private Marker currentMarker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration.getInstance().load(getApplicationContext(),
                PreferenceManager.getDefaultSharedPreferences(getApplicationContext()));
        Configuration.getInstance().setUserAgentValue(BuildConfig.APPLICATION_ID);
        setContentView(R.layout.map_activity);
        mapView = findViewById(R.id.map);
        etSearch = findViewById(R.id.et_search);
        Button btnSearch = findViewById(R.id.btn_search);
        mapView.setTileSource(TileSourceFactory.MAPNIK);
        mapView.setBuiltInZoomControls(true);
        mapView.getController().setZoom(14);
        mapView.getController().setCenter(new GeoPoint(-34.7636, -58.2126));
        btnSearch.setOnClickListener(v -> searchLocation());
        addMarkers();
    }

    private void searchLocation() {
        String locationName = etSearch.getText().toString();
        if (locationName.isEmpty()) {
            Toast.makeText(this, "Ingrese una dirección", Toast.LENGTH_SHORT).show();
            return;
        }
        Geocoder geocoder = new Geocoder(this, Locale.getDefault());
        try {
            List<Address> addresses = geocoder.getFromLocationName(locationName, 1);
            if (addresses != null && !addresses.isEmpty()) {
                Address location = addresses.get(0);
                double latitude = location.getLatitude();
                double longitude = location.getLongitude();
                GeoPoint point = new GeoPoint(latitude, longitude);
                mapView.getController().setZoom(16);
                mapView.getController().animateTo(point);
                if (currentMarker != null) {
                    mapView.getOverlays().remove(currentMarker);
                }
                currentMarker = new Marker(mapView);
                currentMarker.setPosition(point);
                currentMarker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM);
                currentMarker.setTitle(location.getAddressLine(0));
                currentMarker.setSnippet("Latitud: " + latitude + ", Longitud: " + longitude);
                mapView.getOverlays().add(currentMarker);
                mapView.invalidate();
                Toast.makeText(this, "Ubicación encontrada", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Dirección no encontrada", Toast.LENGTH_SHORT).show();
            }
        } catch (IOException e) {
            Toast.makeText(this, "Error al buscar dirección", Toast.LENGTH_SHORT).show();
        }
    }

    private void addMarkers() {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        db.collection("posts")
                .get()
                .addOnSuccessListener(queryDocumentSnapshots -> {
                    mapView.getOverlays().clear();
                    for (QueryDocumentSnapshot document : queryDocumentSnapshots) {
                        Post complaint = document.toObject(Post.class);
                        Marker marker = new Marker(mapView);
                        marker.setPosition(new GeoPoint(complaint.getLatitude(), complaint.getLongitude()));
                        marker.setTitle(complaint.getCategory() + " - " + complaint.getAddress());
                        marker.setSnippet("Fecha: " + complaint.getDate());
                        switch (complaint.getCategory().toLowerCase()) {
                            case "bache":
                                marker.setIcon(getResources().getDrawable(R.drawable.marker_green));
                                break;
                            case "basura acumulada":
                                marker.setIcon(getResources().getDrawable(R.drawable.marker_yellow));
                                break;
                            case "iluminación":
                                marker.setIcon(getResources().getDrawable(R.drawable.marker_red));
                                break;
                            default:
                                marker.setIcon(getResources().getDrawable(R.drawable.marker_blue));
                                break;
                        }

                        mapView.getOverlays().add(marker);
                    }
                    mapView.invalidate();
                })
                .addOnFailureListener(e -> {
                    Timber.tag("Firestore").e(e, "Error al cargar los posts");
                    Toast.makeText(this, "Error al cargar marcadores", Toast.LENGTH_SHORT).show();
                });
    }
}