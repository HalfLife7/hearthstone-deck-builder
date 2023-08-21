import React, {useEffect, useRef} from 'react'

export const ConfirmationModal = ({ confirmCallback, cancelCallback }) => {
    return (
        <div className='absolute left-[45vw] top-[45vh] z-50 bg-white flex flex-col text-center p-6'>
            <span className={'font-semibold mb-6'}>Are you sure?</span>
            <div>
                <button aria-label={'Confirm'} onClick={confirmCallback} className={'p-4 m-2 border'}>Confirm</button>
                <button aria-label={'Cancel'} onClick={cancelCallback} className={'p-4 m-2 border'}>Cancel</button>
            </div>
        </div>
    )
}