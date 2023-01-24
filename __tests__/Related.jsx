import { render, screen, cleanup } from "@testing-library/react";
import React from 'react';

// Importing the jest testing library
import '@testing-library/jest-dom'
import Cards from "../client/src/components/Related Products/components/Cards.jsx";

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup();
})

describe("Cards Component" ,() => {

    // Test 1
    test("Card Rendering", () => {
        // render(<Cards product_id={'/71697'}/>);
        // const cards = screen.getByTestId("rp-card");
        // expect(cards).toBeInTheDocument();
    })
})