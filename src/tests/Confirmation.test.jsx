import React from 'react'
import {ConfirmationModal} from "../components/ConfirmationModal.jsx";
import {fireEvent, screen, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
describe('Confirmation', () => {
    it('calls the confirm callback function passed in when you confirm', async () => {
        const mockCallback = jest.fn()
        render(<ConfirmationModal confirmCallback={mockCallback} />)

        const confirmButton = await screen.findByRole('button', { name: 'Confirm'});
        await userEvent.click(confirmButton);

        expect(mockCallback).toHaveBeenCalled();
    })

    it('calls the cancel callback function passed in when you cancel', async () => {
        const mockCallback = jest.fn()
        render(<ConfirmationModal cancelCallback={mockCallback} />)

        const cancelButton = await screen.findByRole('button', { name: 'Cancel'});
        await userEvent.click(cancelButton);

        expect(mockCallback).toHaveBeenCalled();
    })
})