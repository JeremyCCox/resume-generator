import styled from "styled-components";
import {useEffect, useRef} from "react";

const MapZone = styled.div`
  height: 90vh;
`
function MapDisplay(){

    const mapRef = useRef();
    let map;
    let labels;
    console.log(labels)
    useEffect(()=>{
        if(mapRef && mapRef.current){
            console.log("Content Loaded")

            const apiKey = "AAPK32a42f389c19427797b066aae489e1051fCSRLZe461fHqMhXOmahERtRv77LiehtVjik54LU5ubiFV_G87C9Y5C5JAGHWpz"
            const basemapEnum = "arcgis/streets"
            // // Create a map instance and set the initial view coordinates and zoom level
            //
            if(map !== undefined){
                map.remove();
                labels = {}
            }
            map = L.map('map',{
                minZoom:2,
            })
            map.setView([55, -115.5], 16); // Set start location for map

            // let AlbertaBasemapLayer = new FeatureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/layers/0"
            // })

            const labelClass = {
                // autocasts as new LabelClass()
                symbol: {
                    type:"text",
                    color:"black",
                    font: {
                        // autocast as new Font()
                        family: "Playfair Display",
                        size: 12,
                        weight: "bold"
                    },
                },
                labelPlacement: "above-center",
                labelExpressionInfo: {
                    expression: "'$feature.M;'"
                }
            };

            L.esri.Vector.vectorBasemapLayer(basemapEnum, { apiKey: apiKey }).addTo(map);
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/0",
            //     labelingInfo:labelClass,
            //     labelsVisible:true,
            // }).addTo(map)
            let layer0 = L.esri.featureLayer({
                url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/0",
                // labelingInfo:labelClass,
                // labelsVisible:true,
                maxZoom:12,
                minZoom:10,
            })
            layer0.addTo(map)
            // layer0.bindPopup((layer)=>{
            //     return L.Util.template(
            //         "<p>T{TWP} R{RGE} W{M}M</p>",
            //         layer.feature.properties
            //     )
            // })

            layer0.on("createfeature",(e)=>{
                const id = e.feature.id;
                const feature = layer0.getFeature(id);
                // const center = {lat:(feature._bounds._northEast.lat + feature._bounds._southWest.lat)/2,lng:(feature._bounds._northEast.lng + feature._bounds._southWest.lng)/2};
                const center = {lat:feature._bounds._northEast.lat,lng:feature._bounds._northEast.lng};
                labels[id] = L.marker(center, {
                    icon: L.divIcon({
                        iconSize: null,
                        className: "label",
                        html: "<div>" + "Township" + e.feature.properties.TWP + "</br>" + "Meridian" + e.feature.properties.M + "</br>" + "Range" + e.feature.properties.RGE + "</br>" + "</div>"
                    })
                }).addTo(map);
            });
            layer0.on("addfeature",(e)=>{
                const label = labels[e.feature.id];
                if(label){
                    label.addTo(map);
                }
            })
            layer0.on("removefeature", (e)=> {
                const label = labels[e.feature.id];
                if(label) {
                    map.removeLayer(label);
                }
            });

            // layer0.query(params).then((res)=>{
            //     console.log(res)
            // })
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/1"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/2"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/3"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/4"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/5",
            //     labelingInfo:labelClass,
            // }).addTo(map)
            let layer6labels = {}
            let layer6 = L.esri.featureLayer({
                url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/6",
                labelingInfo:labelClass,
                maxZoom:16,
                minZoom:13,
            })
            layer6.addTo(map)
            // layer6.on('click',(e)=>{
            //     console.log(e)
            // })
            layer6.on("createfeature",(e)=>{
                const id = e.feature.id;
                const feature = layer6.getFeature(id);
                console.log(e)
                // const center = {lat:(feature._bounds._northEast.lat + feature._bounds._southWest.lat)/2,lng:(feature._bounds._northEast.lng + feature._bounds._southWest.lng)/2};
                const center = {lat:feature._bounds._northEast.lat,lng:feature._bounds._northEast.lng};
                labels[id] = L.marker(center, {
                    icon: L.divIcon({
                        iconSize: null,
                        className: "label",
                        html: "<div>" + "Township" + e.feature.properties.TWP + "</br>" + "Meridian" + e.feature.properties.M + "</br>" + "Range" + e.feature.properties.RGE + "</br>" + "</div>"
                    })
                }).addTo(map);
            });
            // layer6.on('click',(e)=>{
            //     console.log(e)
            // })
            // layer6.on("addfeature",(e)=>{
            //     const label = layer6labels[e.feature.id];
            //     if(label){
            //         label.addTo(map);
            //     }
            // })
            layer6.on("removefeature", (e)=> {
                const label = labels[e.feature.id];
                if(label) {
                    map.removeLayer(label);
                }
            });
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/7"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/8"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/9"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/10"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/11"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/12"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/13"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/14"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/15"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/16"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/17"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/18"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/19"
            // }).addTo(map)
            // L.esri.featureLayer({
            //     url: "https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer/20"
            // }).addTo(map)


            // map.add(AlbertaBasemapLayer)
            // const featureLayer = new FeatureLayer({layers:AlbertaBasemapLayers,apiKey:apiKey})
            // L.esri.FeatureLayer({url:"https://geospatial.alberta.ca/titan/rest/services/base/alberta_township_system/MapServer"}).addTo(map)
            // map = L.map('map').setView([51, -114.5], 13);

            // featureLayer.addTo(map)
            // map.setView([34.027, -118.805], 13); // latitude, longitude, zoom level, scale: 72223.819286
            // Add a tile layer to the map from OpenStreetMap
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // }).addTo(map);
            // L.tileLayer('https://www.arcgis.com/apps/mapviewer/index.html?layers=9296039dac90404aa0d56d2acc078596',{
            //     attribution:'&copy; <a href="https://www.esri.com/en-us/legal/terms/data-attributions">ESRI</a> contributors'
            // }).addTo(map)

            // Create a marker with popup and add it to the map
            // let marker = L.marker([51, -114.014]).addTo(map);
            // marker.bindPopup("Hello, I'm a marker!").openPopup();
            // let facLocations = [[52.788880,-112.949005],[ 52.970701, -112.840282],[52.34387154754731, -113.77485968204856]]
            // for(let facLoc of facLocations){
            //     // let newMarker = L.marker(facLoc);
            //     // newMarker.addTo(map)
            //     // newMarker.bindPopup("Facility Marker!").openPopup();
            // }
        }

    },[])
    const query = ()=>{

    }
    const handleClick=(e)=>{
        console.log(e)
        // let newMarker = L.marker(e.latlng).addTo(map);
        // newMarker.bindPopup("I am a new marker").openPopup();
    }

    return(
        <div>
            <MapZone ref={mapRef} id={"map"}></MapZone>
        </div>
    )
}export default MapDisplay;