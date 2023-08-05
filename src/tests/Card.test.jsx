import {render} from "@testing-library/react";
import Card from "../components/Card.jsx";
import React from 'react';

const card = {
    "cardId": "EX1_298",
    "dbfId": 374,
    "name": "Ragnaros the Firelord",
    "cardSet": "Hall of Fame",
    "type": "Minion",
    "faction": "Neutral",
    "rarity": "Legendary",
    "cost": 8,
    "attack": 8,
    "health": 8,
    "text": "Can't attack. At the end of your turn, deal 8 damage to a random enemy.",
    "flavor": "Ragnaros was summoned by the Dark Iron dwarves, who were eventually enslaved by the Firelord.  Summoning Ragnaros often doesn\u2019t work out the way you want it to.",
    "artist": "Greg Staples",
    "collectible": true,
    "elite": true,
    "race": "Elemental",
    "playerClass": "Neutral",
    "howToGetDiamond": "Obtained by owning 36 Classic Legendary cards.",
    "img": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/a8753e3e6c27c511c89766263c54c7b918e9dff54c3ebcf5189834a404cb8d6b.png",
    "imgGold": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/bce9883ebf22f8f6847a080a84825bcb077b0152684806b2eca5da693b27c3dc.png",
    "locale": "enUS"
}

describe('Card', () => {
    it('renders', () => {
        const {getByRole} = render(<Card card={card}/>)

        expect(getByRole('img').alt).toEqual(card.name)
    })
})