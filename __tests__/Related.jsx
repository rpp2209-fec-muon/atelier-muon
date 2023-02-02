// import react-testing methods
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react';
import * as React from 'react';


// Importing the jest testing library
import '@testing-library/jest-dom';
import Cards from "../client/src/components/Related Products/components/Cards.jsx";
import RelatedProducts from "../client/src/components/Related Products/RelatedProducts.jsx";

// afterEach function runs after each test suite is executed
afterEach(() => {cleanup();})

// Integration Test
describe("RelatedProducts Component" , () => {

  test("RelatedProducts Rendering", async () => {
      render(<RelatedProducts product_id={'/71697'} key={'/71697'}/>);
      const linkElement = screen.getByTestId("rp-related");
      await expect(linkElement).toBeInTheDocument();
  });
});

// Unit test
describe("Cards Component" , () => {

  test("Card Rendering", async () => {
    render(<Cards product_id={71697} key={71697}/>);
    const linkElement = screen.getByTestId("rp-card");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Product Category", async () => {
    render(<Cards product_id={71697} key={71697}/>);
    const linkElement = screen.getByTestId("rp-card-category");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Product Name", async () => {
    render(<Cards product_id={71697} key={71697}/>);
    const linkElement = screen.getByTestId("rp-card-name");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Product Price", async () => {
    render(<Cards product_id={71697} key={71697}/>);
    const linkElement = screen.getByTestId("rp-card-price");
    await expect(linkElement).toBeInTheDocument();
  });
});

xdescribe("Action button" , () => {

  test("Related action", async () => {

  });

  test("Outfit action", async () => {

  });
});

describe("List Behavior" , () => {

  xtest("Navigating Behavior", async () => {

  });

  xtest("Left Behavior", async () => {

  });

  xtest("Right Behavior", async () => {

  });

  xtest("Add Outfit Behavior", async () => {

  });
});

xdescribe("Comparison Modal" , () => {

  test("", async () => {

  });
});

