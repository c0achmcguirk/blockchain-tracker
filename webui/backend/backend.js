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

app.listen(port, () => console.log(`Listening on port ${port}`));
