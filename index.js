// Adicionando o mapa e seu "tiles"
const myMap = L.map("issMap").setView([0, 0], 2);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(myMap);

// Fazendo um icone
const issIcon = L.icon({
  iconUrl: "assets\img.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const issZoomedIcon = L.icon({
  iconUrl: "assets\img.png",
  iconSize: [100, 64],
  iconAnchor: [50, 32],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(myMap);

// Tornando o icone resposivo
myMap.on('zoomend', () => {
  const currentZoom = myMap.getZoom();
  if (currentZoom >= 4){
    marker.setIcon(issZoomedIcon);
  } else {
    marker.setIcon(issIcon)
  }
})

// Pegando a posição 
document.getElementById("latitude").textContent = 'Getting data';
document.getElementById("longitude").textContent = 'Getting data';
document.getElementById("velocity").textContent = 'Getting data';

const issURL = "https://api.wheretheiss.at/v1/satellites/25544";
setInterval( async function getIss() {
  const response = await fetch(issURL);
  data = await response.json();
  const { latitude, longitude, velocity } = data;

  marker.setLatLng([latitude, longitude]);
  myMap.setView([latitude, longitude], 3);

  document.getElementById("latitude").textContent = latitude;
  document.getElementById("longitude").textContent = longitude;
  document.getElementById("velocity").textContent = velocity.toFixed(2);

  console.log([latitude, longitude]);
}, 5000)