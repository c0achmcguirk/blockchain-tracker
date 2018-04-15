pragma solidity ^0.4.21;

contract PropertyManager {
  struct Property {
    address owner;
    string owner_name;
    int128 left_lat;
    int128 right_lat;
    int128 top_long;
    int128 bottom_long;
    string street_address;
  }

  enum OfferStatus { Open, Withdrawn, Rejected, Accepted }

  struct Offer {
    address offerer;
    string offerer_name;
    uint256 price;
    uint256 property_id;
    OfferStatus status;
  }

  Property[] public properties;
  Offer[] public offers;

  // -- Actions --

  function addProperty(
    string owner_name,
    string street_address,
    int128 left_lat,
    int128 right_lat,
    int128 top_long,
    int128 bottom_long
  ) public returns (uint256 _property_id) {
    _property_id = properties.length++;
    Property storage p = properties[_property_id];
    p.owner = msg.sender;
    p.owner_name = owner_name;
    p.left_lat = left_lat;
    p.right_lat = right_lat;
    p.top_long = top_long;
    p.bottom_long = bottom_long;
    p.street_address = street_address;

    emit PropertyAdded(
      _property_id,
      p.owner,
      p.owner_name,
      p.left_lat,
      p.right_lat,
      p.top_long,
      p.bottom_long,
      p.street_address,
      now
    );
  }

  function makeOffer(
    uint256 property_id,
    string offerer_name,
    uint256 price
  ) public returns (uint256 _offer_id) {
    requireProperty(property_id);

    _offer_id = offers.length++;
    Offer storage o = offers[_offer_id];
    o.offerer = msg.sender;
    o.offerer_name = offerer_name;
    o.price = price;
    o.property_id = property_id;
    o.status = OfferStatus.Open;

    emit OfferMade(
      _offer_id,
      o.offerer,
      o.offerer_name,
      o.price,
      o.property_id,
      now
    );
  }

  function getOffer(
    uint256 offer_id
  ) public view returns (
    string offerer_name,
    uint256 price
  ) {
    Offer storage o = offers[offer_id];

    return(o.offerer_name, o.price);
  }

  function withdrawOffer(
    uint256 offer_id
  ) public {
    requireOpen(offer_id);
    Offer storage o = offers[offer_id];

    o.status = OfferStatus.Withdrawn;

    emit OfferWithdrawn(
      offer_id,
      o.property_id,
      now
    );
  }

  function acceptOffer(
    uint256 offer_id
  ) public {
    requireOpen(offer_id);
    Offer storage o = offers[offer_id];

    // requireOwner(o.property_id);
    Property storage p = properties[o.property_id];

    p.owner = o.offerer;
    p.owner_name = o.offerer_name;
    o.status = OfferStatus.Accepted;

    emit OfferAccepted(
      offer_id,
      o.property_id,
      o.offerer_name,
      o.price,
      now
    );
  }

  function rejectOffer(
    uint256 offer_id
  ) public {
    requireOpen(offer_id);
    Offer storage o = offers[offer_id];

    requireOwner(o.property_id);
    //Property storage p = properties[o.property_id];

    o.status = OfferStatus.Rejected;

    emit OfferRejected(
      offer_id,
      o.property_id,
      now
    );
  }

  function getProperty(
    uint256 _property_id
  ) public view returns (
    uint256 property_id,
    string owner_name,
    int128 left_lat,
    int128 right_lat,
    int128 top_long,
    int128 bottom_long,
    string street_address
  ) {
    requireProperty(_property_id);

    Property storage p = properties[_property_id];

    return (_property_id, p.owner_name, p.left_lat, p.right_lat, p.top_long, p.bottom_long, p.street_address);
  }

  function getPropertyAt(
    int128 lat,
    int128 long
  ) public view returns (
    uint256 property_id,
    string owner_name,
    int128 left_lat,
    int128 right_lat,
    int128 top_long,
    int128 bottom_long,
    string street_address
  ) {
    for (uint256 i = 0; i < properties.length; i++) {
      Property storage p = properties[i];

      if (p.left_lat > lat && lat > p.right_lat && p.bottom_long > long && long > p.top_long) {

        return (i, p.owner_name, p.left_lat, p.right_lat, p.top_long, p.bottom_long, p.street_address);
      }
    }
  }

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
    string owner_name,
    int128 left_lat,
    int128 right_lat,
    int128 top_long,
    int128 bottom_long,
    string street_address,
    uint timestamp
  );

  event OfferMade(
    uint256 indexed offer_id,
    address offerer,
    string offerer_name,
    uint256 indexed property_id,
    uint256 price,
    uint timestamp
  );

  event OfferAccepted(
    uint256 indexed offer_id,
    uint256 indexed property_id,
    string offerer_name,
    uint256 price,
    uint timestamp
  );

  event OfferWithdrawn(
    uint256 indexed offer_id,
    uint256 indexed property_id,
    uint timestamp
  );

  event OfferRejected(
    uint256 indexed offer_id,
    uint256 indexed property_id,
    uint timestamp
  );
}
