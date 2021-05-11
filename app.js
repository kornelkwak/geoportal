const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }); 
  
  
  //Adding layer control
  
  const sights = L.layerGroup();
  const tracks = L.layerGroup();
  
  const map = L.map('map', {
      center: [50.061988, 19.937405],
      zoom: 11,
      layers: [openStreetMap, sights, tracks],
      maxBounds: [[49.514008, 18.994588],[50.543599, 21.200952]],
      maxZoom: 18,
      minZoom: 8
  });

const baseLayers = {
    "OpenStreetMap": openStreetMap
};

const overlays = {
    "zabytki": sights,
    "trasy": tracks
};

const panel = L.control.layers(baseLayers, overlays).addTo(map);

// Adding address searching plugin 

L.control.search({
    url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
    propertyName: 'display_name',
    jsonpParam: 'json_callback',		
    propertyLoc: ['lat','lon'],
    initial: false,
    autoCollapse: false,
    autoType: false,
    minLength: 2,
    zoom: 20,
    container: "search-container",
    textPlaceholder: "Wyszukaj adres..."
    
})
.addTo(map);


// Creating custom icons

const sightIcon = L.Icon.extend({
    options: {
        iconSize:     [36, 40],
        iconAnchor:   [18, 20],
        popupAnchor:  [0, -10]
    }
});
 
const greenIcon = new sightIcon({iconUrl: './src/img/marker_icon_dostepne.png'});
const redIcon = new sightIcon({iconUrl: './src/img/marker_icon_niedostepne.png'});

// Adding markers from sights.json

    $.getJSON("./src/json/sights.json", data => {
        data.rows.forEach(sight => {
            const lat = sight.latitude_0;
            const lon = sight.longitude_0;
            const title = sight.obiekt;
            let info = sight.opis;
            if (info === null || info === 'brak') {
                info = 'brak opisu';
            }

            if (lat !== null & lon !== null & isNaN(lat) === false & isNaN(lon) === false) {
                    
                L.marker([lat, lon], {icon: sight.dostepnosc === 'niedostępny' ? redIcon : greenIcon}).addTo(sights)
                 .bindPopup(`<h3>${title}</h3><br/>${info}`);
            }  
        });
      });

// Adding polylines from tracks.json

    $.getJSON("./src/json/tracks.json", data => {
        
        data.posts.forEach(function(track){
            
            const coordinates_string = track.custom_fields.line_data;
            const title = track.title;
            let info = track.excerpt;
            if (info === null || info === 'brak') {
                info = 'brak opisu';
            }
            
            if (coordinates_string !== undefined) {
                const coordinates = coordinates_string[0].split(';');
                const coordinates_array =  coordinates.map(function(latlon) {
                    if (latlon !== undefined || latlon !== 0) {
                        return latlon.split(',');
                    }   
                });
        
                const tracks_array = [];
                coordinates_array.forEach(coordinate => {
                    const lat = coordinate[0];
                    const lon = coordinate[1];
                    if (lat !== null & lon !== null & isNaN(lat) === false & isNaN(lon) === false) {
                        tracks_array.push(coordinate);
                    }
                })
                    L.polyline(tracks_array).addTo(tracks)
                     .bindPopup(`<h3>${title}</h3><br/>${info}`);       
            }    
      });
    });

const startViewButton = document.querySelector(".startViewBtn");

startViewButton.addEventListener("click", () => {
    map.setView([50.061988, 19.937405], 11);
});

var customControl =  L.Control.extend({        
    options: {
      position: 'topleft'
    }, 

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

        container.style.backgroundColor = 'white';     
        container.style.backgroundImage = "url(http://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
        container.style.backgroundSize = "30px 30px";
        container.style.width = '30px';
        container.style.height = '30px';

        container.onclick = function(){
          console.log('buttonClicked');
        }

        return container;
      }
    });