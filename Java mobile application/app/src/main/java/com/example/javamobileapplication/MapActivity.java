package com.example.javamobileapplication;

import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
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

public class MapActivity extends AppCompatActivity {

    private MapView mapView;
    private EditText etSearch;
    private Marker currentMarker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Configuración inicial de osmdroid
        Configuration.getInstance().load(getApplicationContext(),
                PreferenceManager.getDefaultSharedPreferences(getApplicationContext()));
        Configuration.getInstance().setUserAgentValue(BuildConfig.APPLICATION_ID);
        setContentView(R.layout.map_activity);
        // Referencias a vistas
        mapView = findViewById(R.id.map);
        etSearch = findViewById(R.id.et_search);
        Button btnSearch = findViewById(R.id.btn_search);
        // Configuración del mapa
        mapView.setTileSource(TileSourceFactory.MAPNIK);
        mapView.setBuiltInZoomControls(true);
        mapView.getController().setZoom(14);
        mapView.getController().setCenter(new GeoPoint(-34.7636, -58.2126));
        // Evento de búsqueda
        btnSearch.setOnClickListener(v -> searchLocation());
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
                // Mover el mapa
                mapView.getController().setZoom(16);
                mapView.getController().animateTo(point);
                // Si ya hay un marcador anterior, lo eliminamos
                if (currentMarker != null) {
                    mapView.getOverlays().remove(currentMarker);
                }
                // Crear nuevo marcador
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
            e.printStackTrace();
        }
    }
}
