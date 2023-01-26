// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import React from 'react';

// Importing the jest testing library
import '@testing-library/jest-dom'
import Cards from "../client/src/components/Related Products/components/Cards.jsx";
import RelatedProducts from "../client/src/components/Related Products/RelatedProducts.jsx";

// afterEach function runs after each test suite is executed
afterEach(() => {
})

describe("RelatedProducts Component" , () => {

  test("RelatedProducts Rendering", async () => {
      render(<RelatedProducts product_id={'/71697'} key={'/71697'}/>);
      const linkElement = screen.getByTestId("rp-related");
      await expect(linkElement).toBeInTheDocument();
  })
})

describe("Cards Component" , () => {

    test("Card Rendering", async () => {
        render(<Cards product_id={71697} key={71697}/>);
        const linkElement = screen.getByTestId("rp-card");
        await expect(linkElement).toBeInTheDocument();
    })
})
