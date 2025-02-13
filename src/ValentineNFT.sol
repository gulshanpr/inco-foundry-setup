// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {GatewayCaller} from "fhevm/gateway/GatewayCaller.sol";
import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract ValentineNFT is GatewayCaller, ERC721URIStorage {
    uint256 private _nextTokenId;
    mapping(uint256 tokenId => ebytes256 secretMessagee)
        private _secretMessages;

    constructor() ERC721("ConfidentialValentine", "CNFT") {}

    function mint(
        address player,
        string memory _tokenURI
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(player, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        return tokenId;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireOwned(tokenId);

        string memory metadataURI = super.tokenURI(tokenId);
        ebytes256 secretMessagee = _secretMessages[tokenId];

        string memory encodedSecret = Base64.encode(abi.encode(secretMessagee));

        return
            string.concat(
                "{",
                '"metadata_uri": "',
                metadataURI,
                '", ',
                '"secret_message": "',
                encodedSecret,
                '"',
                "}"
            );
    }

    function setSecretMessage(
        uint256 tokenId,
        ebytes256 secretMessagee
    ) public {
        _requireOwned(tokenId);
        _secretMessages[tokenId] = secretMessagee;
    }
}
