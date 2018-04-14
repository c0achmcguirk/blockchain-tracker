pragma solidity ^0.4.21;

//contract Property {
  ////struct Coordinate {
    ////int128 x;
    ////int128 y;
  ////}

  //address public owner;
  //int128 public t_x;
  //int128 public t_y;
  //int128 public b_x;
  //int128 public b_y;

  //function Property(
    //address _owner,
    //int128 _t_x,
    //int128 _t_y,
    //int128 _b_x,
    //int128 _b_y
  //) public {

    //owner = _owner;
    //t_x = _t_x;
    //t_y = _t_y;
    //b_x = _b_x;
    //b_y = _b_y;
  //}

  //function coordinates() public returns (Coordinate[]) {
    //[ Coordinate(t_x, t_y), Coordinate(b_x, b_y) ];
  //}
//}

//contract PropertyManager {
  //address public properties;

  //event PropertyAdded();
//}

contract PropertyManager {
  struct Property {
    address owner;
  }

  Property[] public properties;

  function addProperty(
    address owner,
    int128 top_x,
    int128 top_y,
    int128 bottom_x,
    int128 bottom_y
  ) returns (uint64 _property_id) {
  }
}
