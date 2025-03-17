// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "fhevm/lib/TFHE.sol";

contract PrivateNFT is ERC721URIStorage {
    euint32 private hiddenRandomNumber = TFHE.randEuint32();

    string constant BASEURI = "https://example.com/"; // point to an IPFS image link

    mapping(uint256 => ebytes256) public notes;

    constructor() ERC721("PrivateNFT", "PNFT") {}

    function mint(address to, uint256 tokenId, string memory uri) public {
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721URIStorage) returns (string memory) {
        // change the hiddenRandomNumber to actual cipher text of msg.
        require(
            TFHE.isSenderAllowed(hiddenRandomNumber),
            "The caller is not authorized to access the hidden random number."
        );

        ebytes256 message = notes[tokenId];
        string memory returnedURI = super.tokenURI(tokenId);
        return
            string(
                abi.encodePacked(
                    '{"uri":"',
                    returnedURI,
                    '","note":"',
                    message,
                    '"}'
                )
            );
    }

    // everytime you update the note, cipher text will also be changed so do not forget to change the
    // allow the address to access the
    function setNote() public {}

    // everytime you update the note, cipher text will also be changed so do not forget to change the
    // allow the address to access the
    function updateNote() public {}
}
