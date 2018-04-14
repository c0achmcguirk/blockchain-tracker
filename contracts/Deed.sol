pragma solidity ^0.4.21;

contract PropertyManager {
  struct Property {
    address owner;
    int128 top_x;
    int128 top_y;
    int128 bottom_x;
    int128 bottom_y;
  }

  enum OfferStatus { Open, Withdrawn, Rejected, Accepted }

  struct Offer {
    address offerer;
    uint256 property_id;
    OfferStatus status;
  }

  Property[] public properties;
  Offer[] public offers;

  // -- Actions --

  function addProperty(
    int128 top_x,
    int128 top_y,
    int128 bottom_x,
    int128 bottom_y
  ) public returns (uint256 _property_id) {
    _property_id = properties.length++;
    Property storage p = properties[_property_id];
    p.owner = msg.sender;
    p.top_x = top_x;
    p.top_y = top_y;
    p.bottom_x = bottom_x;
    p.bottom_y = bottom_y;

    emit PropertyAdded(_property_id, p.owner, p.top_x, p.top_y, p.bottom_x, p.bottom_y);
  }

  function makeOffer(
    uint256 property_id
  ) public returns (uint256 _offer_id) {
    requireProperty(property_id);

    _offer_id = offers.length++;
    Offer storage o = offers[_offer_id];
    o.offerer = msg.sender;
    o.property_id = property_id;
    o.status = OfferStatus.Open;

    emit OfferMade(_offer_id, o.offerer, o.property_id);
  }

  function withdrawOffer(
    uint256 offer_id
  ) public {
    requireOpen(offer_id);
    Offer storage o = offers[offer_id];

    o.status = OfferStatus.Withdrawn;

    emit OfferWithdrawn(offer_id, o.property_id);
  }

  function acceptOffer(
    uint256 offer_id
  ) public {
    requireOpen(offer_id);
    Offer storage o = offers[offer_id];

    requireOwner(o.property_id);
    Property storage p = properties[o.property_id];

    p.owner = o.offerer;
    o.status = OfferStatus.Accepted;

    emit OfferAccepted(offer_id, o.property_id);
  }

  function rejectOffer(
    uint256 offer_id
  ) public {
    requireOpen(offer_id);
    Offer storage o = offers[offer_id];

    requireOwner(o.property_id);
    //Property storage p = properties[o.property_id];

    o.status = OfferStatus.Rejected;

    emit OfferRejected(offer_id, o.property_id);
  }

  //function getProperty(
    //uint256 property_id
  //) public returns (Property p) {
    //p = properties[property_id];
  //}

  // -- Requirements --

  function requireProperty(
    uint256 property_id
  ) internal view {
    require(property_id <= properties.length);
  }

  function requireOffer(
    uint256 offer_id
  ) internal view {
    require(offer_id <= offers.length);
  }

  function requireOwner(
    uint256 property_id
  ) internal view {
    requireProperty(property_id);

    Property storage p = properties[property_id];

    require(p.owner == msg.sender);
  }

  function requireOfferer(
    uint256 offer_id
  ) internal view {
    requireOffer(offer_id);

    Offer storage o = offers[offer_id];

    require(o.offerer == msg.sender);
  }

  function requireOpen(
    uint256 offer_id
  ) internal view {
    requireOffer(offer_id);

    Offer storage o = offers[offer_id];

    require(o.status == OfferStatus.Open);
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

  event OfferAccepted(
    uint256 indexed offer_id,
    uint256 indexed property_id
  );

  event OfferWithdrawn(
    uint256 indexed offer_id,
    uint256 indexed property_id
  );

  event OfferRejected(
    uint256 indexed offer_id,
    uint256 indexed property_id
  );
}
