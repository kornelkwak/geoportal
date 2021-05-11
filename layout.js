const headerBar = document.querySelector(".search-container");
const leafletTopLeft = document.querySelectorAll(".leaflet-top.leaflet-left");
const leafletTopRight = document.querySelector(".leaflet-top.leaflet-right");
const layerControlPanel = document.querySelector(".layer-control"); 
const baseLayerControlPanel = document.querySelector(".base-layer-control"); 
const layers = document.querySelectorAll(".leaflet-control-layers-overlays");
const tileSelector = document.querySelectorAll(".leaflet-control-layers-base");
const sideControlTrigger = document.querySelector(".side-control-trigger");
const sideControl = document.querySelector(".side-control-panel");

// Creating custom controls outside the map

const createCustomControl = (oldParent,newParent) => {
    $(document).ready( () => {      
        while (oldParent[0].childNodes.length > 0) {
            newParent.appendChild(oldParent[0].childNodes[0]);
        }
    });
}

createCustomControl(leafletTopLeft, leafletTopRight);
createCustomControl(tileSelector, baseLayerControlPanel);
createCustomControl(layers, layerControlPanel);

//Side control trigger action

const btnArrowLeft = document.querySelector(".fa-arrow-left");
const btnArrowRight = document.querySelector(".fa-arrow-right");

sideControlTrigger.addEventListener('click', () => {
        
    sideControl.classList.toggle("active");
    if (sideControl.classList.contains("active")) {
        btnArrowRight.style.display = "none";
        btnArrowLeft.style.display = "block";
        
    } else {
        btnArrowRight.style.display = "block";
        btnArrowLeft.style.display = "none";
    }
});

