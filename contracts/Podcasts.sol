//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Podcasts is Ownable {
    string public name;
    string public description;
    string public imageURL;
    string public speakers;
    address payable createdBy;
    string public date;
    uint256 public totalListeners;
    string public podcastLink;

    constructor(
        string memory _name,
        string memory _description,
        string memory _imageURL,
        string memory _speakers,
        address payable _createdBy,
        string memory _date,
        uint256 _totalListeners,
        string memory _podcastLink
    ) {
        name = _name;
        description = _description;
        imageURL = _imageURL;
        speakers = _speakers;
        createdBy = _createdBy;
        date = _date;
        totalListeners = _totalListeners;
        podcastLink = _podcastLink;
    }
}