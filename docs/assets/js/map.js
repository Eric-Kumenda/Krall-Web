var map = L.map('map').setView([-1.406380, 36.774507], 19); // Paris -1.406367, 36.774539

 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



 //Clean, minimal tile layer from CARTO
  // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  //   attribution:
  //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  //   subdomains: 'abcd',
  //   maxZoom: 19
  // }).addTo(map);

  L.marker([-1.406367, 36.774539]).addTo(map)
    .bindPopup('The Krall Konsult')
    .openPopup();


