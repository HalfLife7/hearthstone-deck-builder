import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import DeckMenu from "../components/DeckMenu.jsx";
import {DeckContext} from "../context/DeckContext.jsx";

const MockDeckProvider = ({children, deckState = []}) => {
    const dispatch = jest.fn();

    return (
        <DeckContext.Provider value={[deckState, dispatch]}>
            {children}
        </DeckContext.Provider>
    )
}

describe('DeckMenu', () => {
    it('renders all the cards', async () => {
        const deckState = [
            {
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
            },
            {
                "cardId": "EX1_190",
                "dbfId": 54840,
                "name": "High Inquisitor Whitemane",
                "cardSet": "Legacy",
                "type": "Minion",
                "rarity": "Legendary",
                "cost": 6,
                "attack": 5,
                "health": 7,
                "text": "<b>Battlecry:</b> Summon all friendly minions that died_this turn.",
                "flavor": "No one told her that champions want to sleep in.",
                "artist": "James Ryman",
                "collectible": true,
                "elite": true,
                "playerClass": "Neutral",
                "howToGet": "Not available in packs, must be crafted.",
                "howToGetGold": "Not available in packs, must be crafted.",
                "img": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/5e924d00ef1e968cde24ca60e7e174df2322128490690e4ca266e3c306085283.png",
                "imgGold": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/69ac69f1967a911978f226311bbfe4e2da607eba864ca553ad8462d6407fc294.png",
                "locale": "enUS",
                "mechanics": [
                    {
                        "name": "Battlecry"
                    }
                ]
            },
        ]

        render(
            <MockDeckProvider deckState={deckState}>
                <DeckMenu/>
            </MockDeckProvider>
        );

        await waitFor(() => {
            expect(screen.getAllByRole('img', {name: 'Mana Cost'}).length).toEqual(2);
        })
    })
})