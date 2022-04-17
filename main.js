// # A basic forward geocoding request
// # Find Los Angeles

// $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF1eDZ6cmkwMGFjM2NxZ3Q0b2N2NjJmIn0.XQ51f2cXnca-fUGPVJIl_g"

// # Find a town called 'Chester' in a specific region
// # Add the proximity parameter with local coordinates
// # This ensures the town of Chester, New Jersey is in the results

// $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF1eDZ6cmkwMGFjM2NxZ3Q0b2N2NjJmIn0.XQ51f2cXnca-fUGPVJIl_g"

// # Specify types=country to search only for countries named Georgia
// # Results will exclude the American state of Georgia

// $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/georgia.json?types=country&access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF1eDZ6cmkwMGFjM2NxZ3Q0b2N2NjJmIn0.XQ51f2cXnca-fUGPVJIl_g"

// # Search for "Starbucks" in Washington, D.C.
// # Use a bounding box to limit results to within the district

// $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/starbucks.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF1eDZ6cmkwMGFjM2NxZ3Q0b2N2NjJmIn0.XQ51f2cXnca-fUGPVJIl_g"

// # Limit the results to two results using the limit option
// # Even though there are many possible matches
// # for "Washington", this query will only return two results.

// $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?limit=2&access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF1eDZ6cmkwMGFjM2NxZ3Q0b2N2NjJmIn0.XQ51f2cXnca-fUGPVJIl_g"

// # Search for the Place feature "Kaaleng" in the Ilemi Triangle. Specifying the cn worldview will return the country value South Sudan. Not including leaving the worldview parameter would default to the us worldview and return the country value Kenya.

// $ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/Kaaleng.json?worldview=cn&access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF1eDZ6cmkwMGFjM2NxZ3Q0b2N2NjJmIn0.XQ51f2cXnca-fUGPVJIl_g"

let SatNumber = document.querySelector('#norad');

let SatNum = SatNumber.value;

let AdressSat = document.querySelector('#address');

let whole = document.querySelector('#body1');

let search = document.querySelector('#search');


function randomColor()
{
     color='rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';

     return color;
}
let red = randomColor()
// let base 
//  = `https://api.mapbox.com/geocoding/v5/mapbox.places/.json?
  //access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF1eDZ6cmkwMGF
  //jM2NxZ3Q0b2N2NjJmIn0.XQ51f2cXnca-fUGPVJIl_g`;

let keyHolder = document.querySelector('#API');
let key = keyHolder.value;


async function StartUpLink(){
   const httpResponseData = await fetch (encodeURI(`https://api.mapbox.com/geocoding/v5/mapbox.places/${AdressSat.value}.json?access_token=${keyHolder.value}`));

//pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF3dGJ2aXEydmFrM2RtdGpoOHExMTRnIn0.SYGDZVC-d6I5zoVBM90TPw
   
  
const DataMap = await httpResponseData.json();
console.log(DataMap);
let latitude = DataMap.features[0].center[1];
let longitude = DataMap.features[0].center[0];
const httpResponseSat = await fetch(encodeURI(`https://satellites.fly.dev/passes/${SatNumber.value}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`));
const DataSat = await httpResponseSat.json()
console.log(DataSat);
console.log(longitude);
console.log(latitude);
let displayDate = DataSat[0].rise.utc_datetime;


let outPutData = $(`<div id = "box1"><p id = "bodyTp" class = "allPs">The Satalite ID of: ${SatNumber.value} will be over the ${AdressSat.value}: The rise of the satellite when 
it first comes over the horizon is at ${DataSat[0].rise.utc_datetime} 
and its visibilty 
will be ${DataSat[0].rise.visible}.The satellites culmination or when the satellite will 
peak on the horizon will be ${DataSat[0].culmination.utc_datetime} from this position the satellite
visibilty will be ${DataSat[0].culmination.visible}.The next and final phase of the satellites orbit 
of the position of ${AdressSat.value} will be the "Set". The set is when the satellites is right 
below the horizion, the set will occure at ${DataSat[0].set.utc_datetime} and from this position the
satellities visibilty will be ${DataSat[0].set.visible}.</p><ul id = "listOfData">
<li class = "pointsOfData">$${SatNumber.value}</li><li.style.color = "red">${AdressSat.value}</li class = "R"><li>Rise:${DataSat[0].rise.utc_datetime}</li><li>Is Visibile:${DataSat[0].rise.visible}</li>
<li>Culmination:${DataSat[0].culmination.utc_datetime}</li><li>Satellite visibilty:${DataSat[0].culmination.visible}</li><li>Set:${DataSat[0].set.utc_datetime}</li><li>Satellite visibilty:${DataSat[0].set.visible}</li>
</ul></div>`);



$(`#body1`).append(outPutData);

};


search.addEventListener('click',StartUpLink);