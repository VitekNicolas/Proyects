package com.example.javamobileapplication;

import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.widget.Toolbar;
import androidx.multidex.BuildConfig;
import androidx.preference.PreferenceManager;
import org.osmdroid.config.Configuration;
import org.osmdroid.tileprovider.tilesource.TileSourceFactory;
import org.osmdroid.util.GeoPoint;
import org.osmdroid.views.MapView;
import org.osmdroid.views.overlay.Marker;
import java.io.IOException;
import java.util.List;
import java.util.Locale;

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
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        DatabaseHelper dbHelper = new DatabaseHelper(this);
        List<Post> reclamos = dbHelper.getAllReclamos();
        for (Post r : reclamos) {
            Marker marker = new Marker(mapView);
            marker.setPosition(new GeoPoint(r.getLatitud(), r.getLongitud()));
            marker.setTitle(r.getTipo() + " - " + r.getDireccion());
            marker.setSnippet("Fecha: " + r.getFecha());
            switch (r.getTipo().toLowerCase()) {
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
                Address address = addresses.get(0);
                double lat = address.getLatitude();
                double lon = address.getLongitude();
                GeoPoint point = new GeoPoint(lat, lon);
                mapView.getController().setZoom(16);
                mapView.getController().animateTo(point);
                if (currentMarker != null) {
                    mapView.getOverlays().remove(currentMarker);
                }
                currentMarker = new Marker(mapView);
                currentMarker.setPosition(point);
                currentMarker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM);
                currentMarker.setTitle(address.getAddressLine(0));
                currentMarker.setSnippet("Lat: " + lat + ", Lon: " + lon);
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
}