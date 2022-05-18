# **AVOXI CODING CHALLENGE - MAY 2022**

## CHALLENGE
Build an HTTP-based API that (INPUT) receives an IP address and a white list of countries and (OUTPUT) returns an indicator if the IP address is within the white listed countries. 

## SOLUTION
API built using node.js, express and IP data from MaxMind https://dev.maxmind.com/geoip/geoip2/geolite2/.

## INSTRUCTIONS
1. Run `npm install` to install dependencies
1. Copy `.env.example` to `.env`
1. Replace LICENSE_KEY with your [MaxMind license key](https://www.maxmind.com/en/accounts/current/license-key).
1. Run `npm start` to start server (requires internet connection)
1. Run `npm test` to run tests
1. Web page will return either approved or blocked.

### NOTES
I chose the list of whitelisted countries based on the places that AVOVI currently does business. 

### FUTURE
Should someone be notified when an IP not on the whitelist is entered?
Should access be immediately blocked and how?
