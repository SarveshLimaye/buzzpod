//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Podcasts.sol";

contract CreatePodcast {
    Podcasts[] public _podcasts;
    uint256 constant maxLimit = 20;

    event PodcastCreated(Podcasts indexed newpodcast, address indexed owner);

    function podcastscount() public view returns (uint256) {
        return _podcasts.length;
    }

    function createPodcast(
        string memory name,
        string memory description,
        string memory imageURL,
        string memory speakers,
        address payable createdBy,
        string memory date,
        uint256 totalListeners,
        string memory podcastLink
    ) public {
        Podcasts newPodcast = new Podcasts(
            name,
            description,
            imageURL,
            speakers,
            createdBy,
            date,
            totalListeners,
            podcastLink
        );
        _podcasts.push(newPodcast);
        emit PodcastCreated(newPodcast, createdBy);
    }

    function podcasts(
        uint256 limit,
        uint256 offset
    ) public view returns (Podcasts[] memory coll) {
        //logic for pagination
        require(offset <= podcastscount(), "offset out of bounds");
        // start our size as difference between total count and offset
        uint256 size = podcastscount() - offset;
        // size should be the smaller of the count or the limit
        size = size < limit ? size : limit;
        // size should not exceed the maxLimit
        size = size < maxLimit ? size : maxLimit;
        // build our collection to return based off of limit and offest
        coll = new Podcasts[](size);
        for (uint256 i = 0; i < size; i++) {
            coll[i] = _podcasts[offset + i];
        }
        return coll;
    }
}
