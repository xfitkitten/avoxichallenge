<bold>AVOXI CODING CHALLENGE - MAY 2022</bold>

CHALLENGE:  Build an HTTP-based API that (INPUT) receives an IP address and a white list of countries and (OUTPUT) returns an indicator if the IP address is within the white listed countries. 

SOLUTION:  API built using node.js, express and IP data from MaxMind https://dev.maxmind.com/geoip/geoip2/geolite2/.

INSTRUCTIONS:
1. Install node.js & npm (instructions here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Run npm install to install dependencies
3. Run node index.js to start server
4. Open a new browser window
5. Type in:  localhost:3000/avoxiip?ipaddress=73.39.162.189&whitelist=AU&whitelist=CA&whitelist=CN&whitelist=IN&whitelist=IT&whitelist=SG&whitelist=AE&whitelist=UK&whitelist=US
6. Enter
7. Web page will return either approved or blocked.

NOTES:  I chose the list of whitelisted countries based on the places that AVOVI currently does business. 

Any IP address can replace 73.39.162.189 in #5 to further test the API.

Further development is needed to address logging and error handling.

FUTURE: 
Should someone be notified when an IP not on the whitelist is entered? 
Should access be immediately blocked and how?


