// Initialize the map and set view (adjust coordinates as needed)
const map = L.map('map', {
    crs: L.CRS.Simple,  // Use Simple Coordinate Reference System (for images)
    minZoom: -2  // Allows zooming out
});

// Define image bounds (adjust based on your floor plan's dimensions)
const imageBounds = [[0, 0], [1000, 1500]];
L.imageOverlay('assets/cse first floor.png', imageBounds).addTo(map);

// Fit the image to screen
map.fitBounds(imageBounds);

// Example: Adding a marker (Room locations need to be mapped manually)
const roomMarkers = {
    ' CLASSROOM 101': [247,195],
    'MOBILE IOT LAB': [425,193],
    'LADIES TOILET': [510,195],
    'DEPARTMENT OFFICE': [248,311],
    'CYBERSECURITY LAB': [498,309]
};

// Add markers to the map
Object.entries(roomMarkers).forEach(([room, coords]) => {
    L.marker(coords).addTo(map).bindPopup(room);
});

// Function to draw a path between two rooms (example)
function drawPath(start, end) {
    const pathCoords = [roomMarkers[start], roomMarkers[end]];
    L.polyline(pathCoords, { color: 'red', weight: 5 }).addTo(map);
}

// Example: Draw path from SAP LAB to COMPUTER CENTRE LAB
drawPath('SAP LAB', 'COMPUTER CENTRE LAB');
