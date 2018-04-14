pragma solidity ^0.4.21;

contract PropertyManager {
  struct Property {
    address owner;
    int128 top_x;
    int128 top_y;
    int128 bottom_x;
    int128 bottom_y;
  }

  struct Offer {
    address offerer;
    uint256 property_id;
  }

  Property[] public properties;
  Offer[] public offers;

  // -- Actions --

  // TODO: take offerer/owner from `msg`?

  function addProperty(
    address owner,
    int128 top_x,
    int128 top_y,
    int128 bottom_x,
    int128 bottom_y
  ) public returns (uint256 _property_id) {
    _property_id = properties.length++;
    Property storage p = properties[_property_id];
    p.owner = owner;
    p.top_x = top_x;
    p.top_y = top_y;
    p.bottom_x = bottom_x;
    p.bottom_y = bottom_y;

    emit PropertyAdded(_property_id, owner, top_x, top_y, bottom_x, bottom_y);
  }

  function makeOffer(
    address offerer,
    uint256 property_id
  ) public returns (uint256 _offer_id) {
    // TODO: require valid property
    _offer_id = offers.length++;
    Offer storage o = offers[_offer_id];
    o.offerer = offerer;
    o.property_id = property_id;

    emit OfferMade(_offer_id, offerer, property_id);
  }

  // -- Events --

  event PropertyAdded(
    uint256 indexed property_id,
    address owner,
    int128 top_x,
    int128 top_y,
    int128 bottom_x,
    int128 bottom_y
  );

  event OfferMade(
    uint256 indexed offer_id,
    address offerer,
    uint256 indexed property_id
  );
}
