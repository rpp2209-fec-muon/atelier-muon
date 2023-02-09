// import react-testing methods
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react';
import * as React from 'react';


// Importing the jest testing library
import '@testing-library/jest-dom';
import Cards from "../client/src/components/Related Products/components/Cards.jsx";
import RelatedProducts from "../client/src/components/Related Products/RelatedProducts.jsx";
import Comparison from "../client/src/components/Related Products/components/Comparison.jsx";
import Features from "../client/src/components/Related Products/components/Features.jsx";
import Left from "../client/src/components/Related Products/components/Left.jsx";
import Right from "../client/src/components/Related Products/components/Right.jsx";
import AddOutfit from "../client/src/components/Related Products/components/AddOutfit.jsx";
import Price from  "../client/src/components/Global/Price.jsx";
import Star from  "../client/src/components/Global/Star.jsx";

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

describe("List Behavior" , () => {

  test("Left Behavior", async () => {
    render(<Left />);
    const linkElement = screen.getByTestId("rp-left");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Right Behavior", async () => {
    render(<Right />);
    const linkElement = screen.getByTestId("rp-right");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Right Behavior show", async () => {
    render(<Right show={true}/>);
    const linkElement = screen.getByTestId("rp-right");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Add Outfit Behavior", async () => {
    render(<AddOutfit />);
    const linkElement = screen.getByTestId("rp-add");
    await expect(linkElement).toBeInTheDocument();

  });
});

describe("Comparison Modal" , () => {

  test("Comparison", async () => {
    render(<Comparison o_product={{name: "test1", default_price: "100", features: [
      {
          "feature": "Fabric",
          "value": "Canvas"
      },
      {
          "feature": "Buttons",
          "value": "Brass"
      }
      ]}} c_product={{name: "test2", default_price: "200", features: [
      {
          "feature": "Fabric",
          "value": "Canvas"
      },
      {
          "feature": "Buttons",
          "value": "Brass"
      }
      ]}}/>);
    const linkElement = screen.getByText("test1");
    await expect(linkElement).toBeInTheDocument();
  });
});

describe("Global Test" , () => {

  test("Price", async () => {
    render(<Price original_price={"1000"} sale_price={null}/>);
    const linkElement = screen.getByText("$1000");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Price with sale", async () => {
    render(<Price riginal_price={"1000"} sale_price={"900"}/>);
    const linkElement = screen.getByText("$900");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Star with 3.5", async () => {
    render(<Star ratings={3.5}/>);
    const linkElement = screen.getByTestId("g-star");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Star with 3.76", async () => {
    render(<Star ratings={3.76}/>);
    const linkElement = screen.getByTestId("g-star");
    await expect(linkElement).toBeInTheDocument();
  });

  test("Star with 3.26", async () => {
    render(<Star ratings={3.26}/>);
    const linkElement = screen.getByTestId("g-star");
    await expect(linkElement).toBeInTheDocument();
  });

});