import React, {useState} from 'react'

export const Confirmation = ({ confirmCallback, cancelCallback }) => {

    return (
        <div>
            <button aria-label={'Confirm'} onClick={confirmCallback}>Confirm</button>
            <button aria-label={'Cancel'} onClick={cancelCallback}>Cancel</button>
        </div>
    )
}