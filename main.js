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

let SatNumber = document.querySelector('#norad').value;
let addressQuery = document.querySelector('#address').value;
let search = document.querySelector('#search');
 let base 
  = `https://api.mapbox.com/geocoding/v5/mapbox.places/.json?
  access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF1eDZ6cmkwMGF
  jM2NxZ3Q0b2N2NjJmIn0.XQ51f2cXnca-fUGPVJIl_g`;

let keyHolder = document.querySelector('#api-key').value;

async function StartUpLink(){
   const httpResponseData = await fetch (
  
  encodeURI(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressQuery}.json?access_token=pk.eyJ1IjoiZGFuMjEwMSIsImEiOiJjbDF3dGJ2aXEydmFrM2RtdGpoOHExMTRnIn0.SYGDZVC-d6I5zoVBM90TPw`)

   
   );

const DataMap = await httpResponseData.json();
console.log(DataMap);
let latitude = DataMap.features[0].center[1];
let longitude = DataMap.features[0].center[0];
const httpResponseSat = await fetch(encodeURI(`https://satellites.fly.dev/passes/25544?lat=${latitude}&lon=${longitude}&limit=1
&days=15&visible_only=true`));
const DataSat = await httpResponseSat.json();
console.log(DataSat);
console.log(longitude);
console.log(latitude);
}

search.addEventListener('click',StartUpLink);