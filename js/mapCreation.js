var graphics = [];
var selectedColor;
var outerRingCoor;
let request = new XMLHttpRequest(); //start https request for json requests
url = "hospitalInfo.json"
request.open("GET", url, true);
request.setRequestHeader("Accept", "application/json"); //specifies the request is a json request
request.responseType = "json";

/*******************************************************************************
* function to encapsulate graph creation with the ability to access JSON objects
*******************************************************************************/
request.onload = function() 
{
  let hospitals = this.response;
  require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/widgets/Search"
  ], 
  
  /****************************************************
  * function to create point graphic objects in the map
  *****************************************************/
  function(Map, MapView,Graphic,Search)
  {
  
  
    var map = new Map(
    {
      basemap: "streets"
    });

    var view = new MapView(
    {
      container: "viewDiv",
      map: map,
      center: [-91.7756,37.9537], // center decides on where the map starts on load, currently points to MS&T
      zoom:12
    });
    
   var search = new Search({
      view: view
    });

      view.ui.add(search, "top-right");
  
     /***************************************
     * Loop to create multiple point graphics
     ***************************************/
    
    for(var i=0;i<hospitals.length;i++)
    {
      if(hospitals[i].staffedBeds > 131)  //change color based on 
      {
        selectedColor = [226,119,40];
      }
      else
      {
        selectedColor = [127,0,225];  
      }
      
      var dollarsPerDay = "N/A";
      if(hospitals[i].patientDays != 0 || hospitals[i].grossPateientRevenue)
      {
        dollarsPerDay = "$" + (hospitals[i].grossPateientRevenue / hospitals[i].patientDays).toFixed(2);
      }
      
      var averageDays = "N/A";
      if(hospitals[i].totalDischarges != 0 || hospitals[i].patientDays)
      {
        averageDays = (hospitals[i].patientDays / hospitals[i].totalDischarges).toFixed(2);
      }
      
      // First create a point geometry, specifying lattitude and 
      // Note: At this point the defined point has not shape, it's just information on a map
      var point = {
        type: "point", // autocasts as new Point()
        longitude: hospitals[i].long, 
        latitude: hospitals[i].lat
      };
      
      // Create point attributes to display on the tooltip
      var pointAtt = {
        Name: hospitals[i].hospitalName,
        Beds: hospitals[i].staffedBeds,
        Address: hospitals[i].address,
        Phone: hospitals[i].phoneNumber,
        Hours: hospitals[i].hoursInText,
        Average$: dollarsPerDay,
        AverageDays: averageDays 
        
        
      };

      // Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: selectedColor,
        size: 10,
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        attributes: pointAtt,
        popupTemplate: {
          title: "{Name}",
          content: [{ type: "fields",
          fieldInfos: [
            {fieldName: "Beds"},
            {fieldName: "Address"},
            {fieldName: "Phone"},
            {fieldName: "Hours"},
            {
              fieldName: "Average$",
              label: "Average Cost Per Visit"
            },
            {
              fieldName: "AverageDays",
              label: "Average Days Spent By Patient"
            }
          ]
        }]}
      });
    graphics.push(pointGraphic);
    
    /*****************End of Grahpics********************/
   
  }
  // Add the graphic to the view's default graphics view
  // If adding multiple graphics, use addMany and pass in the array of graphics.
  view.graphics.addMany(graphics);
});
}
request.send();
