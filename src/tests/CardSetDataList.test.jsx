import React from "react";
import {render, waitFor, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import CardSetDataList from "../components/CardSetDataList.jsx";

const cardSetNames = [
    "ashes_of_outland",
    "basic",
    "battlegrounds",
    "blackrock_mountain",
    "classic",
    "core",
    "credits",
    "debug",
    "demo"
];
describe('CardSetDataList', () => {
    it('displays all the card sets when the input is clicked', async () => {
        const user = userEvent.setup();
        render(<CardSetDataList items={cardSetNames}/>)

        await user.click(screen.getByRole('textbox', {name: "Select or search for a card set"}))

        cardSetNames.map((setName) => {
            expect(screen.getByText(setName.split("_").join(" "))).toBeInTheDocument()
        })

    })

    it('hides the dropdown when you click away from the input element', async () => {
        const user = userEvent.setup();
        render(<CardSetDataList items={cardSetNames}/>)

        await user.click(screen.getByRole('textbox', {name: "Select or search for a card set"}))

        cardSetNames.map((setName) => {
            expect(screen.getByText(setName.split("_").join(" "))).toBeInTheDocument()
        })

        document.activeElement.blur();

        await waitFor(() => {
            cardSetNames.map((setName) => {
                expect(screen.queryByText(setName.split("_").join(" "))).not.toBeInTheDocument()
            })
        })
    })

    it('sets the value of the input to be the suggestion clicked', async () => {
        const user = userEvent.setup();
        render(<CardSetDataList items={cardSetNames} onChange={jest.fn()}/>)

        const input = screen.getByRole('textbox', {name: "Select or search for a card set"})
        await user.click(input)

        cardSetNames.map((setName) => {
            expect(screen.getByText(setName.split("_").join(" "))).toBeInTheDocument()
        })

        await user.click(screen.getByText(cardSetNames[0].split("_").join(" ")))

        expect(input.value).toEqual(cardSetNames[0].replace(/_/g," "))
    })

    it('shows suggestions that contain the text entered into the input', async () => {
        const user = userEvent.setup();
        render(<CardSetDataList items={cardSetNames}/>)

        const input = screen.getByRole('textbox', {name: "Select or search for a card set"})
        await user.type(input, "ba")

        const expectedSetNames = ["basic", "battlegrounds"]
        cardSetNames.map((setName) => {
            if (expectedSetNames.includes(setName)) {
                return expect(screen.getByText(setName.split("_").join(" "))).toBeInTheDocument()
            }

            return expect(screen.queryByText(setName.split("_").join(" "))).not.toBeInTheDocument()
        })
    })

    it('shows suggestions that contain the multiple words entered into the input', async () => {
        const user = userEvent.setup();
        render(<CardSetDataList items={cardSetNames}/>)

        const input = screen.getByRole('textbox', {name: "Select or search for a card set"})
        await user.type(input, "Ashes of")

        const expectedSetNames = ["ashes_of_outland"]
        cardSetNames.map((setName) => {

            if (expectedSetNames.includes(setName)) {
                return expect(screen.getByText(setName.split("_").join(" "))).toBeInTheDocument()
            }

            expect(screen.queryByText(setName.split("_").join(" "))).not.toBeInTheDocument()
        })
    })
})