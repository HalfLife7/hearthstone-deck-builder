import CardList from "../components/CardList.jsx";
import '@testing-library/jest-dom'
import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {useQuery} from "react-query";
import userEvent from "@testing-library/user-event";
import {DeckProvider} from "../context/DeckContext.jsx";

jest.mock('react-query', () => {
    return {
        useQuery: jest.fn()
    };
});

const mockData = {
    "Legacy": [
        {
            "cardId": "EX1_186",
            "dbfId": 54836,
            "name": "SI:7 Infiltrator",
            "cardSet": "Legacy",
            "type": "Minion",
            "rarity": "Rare",
            "cost": 4,
            "attack": 5,
            "health": 4,
            "text": "<b>Battlecry:</b> Destroy a random enemy <b>Secret</b>.",
            "flavor": "What will she destroy? It\u2019s a secret!",
            "artist": "Gonzalo Ordonez",
            "collectible": true,
            "playerClass": "Neutral",
            "howToGet": "Not available in packs, must be crafted.",
            "howToGetGold": "Not available in packs, must be crafted.",
            "img": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/933d865eceaeaf5aabd98427a25f9e55575f5f23a7deeeabcd65c4bd08dc281b.png",
            "imgGold": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/dc872fb9abebad448871e50b9ce6b9f4e3d44e405b5e8590240225ad119deda7.png",
            "locale": "enUS",
            "mechanics": [
                {
                    "name": "Battlecry"
                },
                {
                    "name": "Secret"
                }
            ]
        },
        {
            "cardId": "CS1_113",
            "dbfId": 8,
            "name": "Mind Control",
            "cardSet": "Legacy",
            "type": "Spell",
            "faction": "Neutral",
            "rarity": "Free",
            "cost": 10,
            "text": "Take control of an enemy minion.",
            "flavor": "Nominated as \"Spell Most Likely to Make Your Opponent Punch the Wall.\"",
            "artist": "Sean O\u2019Daniels",
            "collectible": true,
            "playerClass": "Priest",
            "spellSchool": "Shadow",
            "img": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/93487dc84f38632f652324d52a715adb06173cf3f9cde8df9c341aa72ac1cd6c.png",
            "imgGold": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/49608fa1a41e744132d0cd97c25f7fd6005fcde7728cd41f4b02667dc2f3f725.png",
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
}

describe('CardList', () => {
    it('renders loading state', () => {

        useQuery.mockReturnValue({isLoading: true, error: false, data: {}})

        render(<CardList/>);

        const loadingElement = screen.getByText('Loading...');

        expect(loadingElement).toBeInTheDocument();
    });

    it('renders error state', () => {
        const error = {message: 'Fake Error'}
        useQuery.mockReturnValue({isLoading: false, error, data: {}})

        render(<CardList/>);

        const errorElement = screen.getByText(`An error has occurred: ${error.message}`);

        expect(errorElement).toBeInTheDocument();
    });

    it('renders the cards', async () => {
        useQuery.mockReturnValue({isLoading: false, error: false, data: mockData})

        render(
            <DeckProvider>
                <CardList/>
            </DeckProvider>
        );

        const allImages = screen.queryAllByRole('img');

        await waitFor(() => {
            expect(allImages.length).toEqual(mockData["Legacy"].length)
        });
    });

    it('it adds the card to the deck when clicked', async () => {
        const user = userEvent.setup();
        useQuery.mockReturnValue({isLoading: false, error: false, data: mockData})

        render(
            <DeckProvider>
                <CardList/>
            </DeckProvider>
        );

        const allImages = screen.queryAllByRole('img');

        await waitFor(() => {
            expect(allImages.length).toEqual(mockData["Legacy"].length)
        });

        await user.click(allImages[0])

        expect(screen.getByText(mockData["Legacy"][0].name)).toBeInTheDocument();
    })

    it('selecting a new card set changes the cards displayed', async () => {
        const user = userEvent.setup();

        useQuery.mockReturnValue({isLoading: false, error: false, data: mockData})

        render(
            <DeckProvider>
                <CardList/>
            </DeckProvider>
        );

        const allImages = screen.queryAllByRole('img');

        await waitFor(() => {
            expect(allImages.length).toEqual(mockData["Legacy"].length)
        });

        const input = screen.getByRole('textbox', {name: "Select or search for a card set"})
        await user.type(input, "Descent Of Dragons")

        await waitFor(() => {
            expect(screen.getByRole('img', {alt: 'Dragonqueen Alexstrasza'})).toBeInTheDocument()
        })
    })
})