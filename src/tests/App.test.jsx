import App from "../App.jsx";
import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'

describe('App', () => {
    xit('renders', () => {
        render(<App/>)
        expect(screen.getByText('Hello World!')).toBeInTheDocument()
    })
})