const map =  mymap = L.map('mapid').setView([50.061988, 19.937405], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

// Adding markers from sights.json

    $.getJSON( "src/json/sights.json", function(data) {
        data.rows.forEach(function(sight){
            const lat = sight.latitude_0;
            const lon = sight.longitude_0;
            const title = sight.obiekt;
            let info = sight.opis;
            if (info === null || info === 'brak') {
                info = 'brak opisu';
            }
            
            if (lat !== null & lon !== null & isNaN(lat) === false & isNaN(lon) === false) {
                L.marker([lat, lon]).addTo(map)
                 .bindPopup(`<h3>${title}</h3><br/>${info}`)
            }  
        });
      });

// Adding polylines from tracks.json

    $.getJSON( "src/json/tracks.json", function(data) {
        
        data.posts.forEach(function(track){
            
            const coordinates_string = track.custom_fields.line_data;
            const title = track.title;
            const info = track.excerpt;
            
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

                    L.polyline(tracks_array).addTo(map)
                     .bindPopup(`<h3>${title}</h3><br/>${info}`)       
            }    
      });
    });