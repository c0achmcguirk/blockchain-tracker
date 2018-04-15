const express = require('express');

// Libraries for HomeLNK
const PropertyLogic = require('../../libs/propertyLogic');

const app = express();
const port = process.env.PORT || 5000;

const propertyLogic = new PropertyLogic;

app.get('/api/properties/:propertyId', (req, res) => {
  let propertyId = req.params.propertyId;
  propertyLogic.getPropertyById(propertyId).then((response) => {
    res.send({ express: response });
  });
});

/**
 * Return a property by lat and lon
 * @param {string} lat Passed on the query string, the latititude
 * @param {string} lon Passed on the query string, the longitude
 * @returns {Object} a single property, or undefined.
 */
app.get('/api/properties', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  propertyLogic.getPropertyByCoordinate(lat, lon).then((response) => {
    res.send({ property: response });
  });
});

app.post('/api/properties/:propertyId/makeOffer', (req, res) => {
  let propertyId = req.params.propertyId;
  let offererName = req.query.offerer_name;
  propertyLogic.makeOffer(propertyId, offererName).then((response) => {
    res.send({ property: response });
  });
});

app.post('/api/offer/:offerId/accept', (req, res) => {
  let offerId = req.params.offerId;
  propertyLogic.acceptOffer(propertyId).then((response) => {
    res.send({ property: response });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
