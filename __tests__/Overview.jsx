import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from 'react';
import ProductOverview from '../client/src/components/Product Overview/Product Overview.jsx';
import ImageGallery from '../client/src/components/Product Overview/Overview Components/Image Gallery.jsx';
import ProductInfo from '../client/src/components/Product Overview/Overview Components/Product Information.jsx';
import StyleSelector from '../client/src/components/Product Overview/Overview Components/Style Selector.jsx';
import AddToCart from '../client/src/components/Product Overview/Overview Components/Add Cart.jsx';
import axios from 'axios';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup();
})

describe('Does our Product Overview Component Render Out?', () => {

  test('does our axios getProducts call work?', () => {

    var props = {
      product_id: '/71697'
    }

    axios
      .get('/products', { params: { type: '', product_id: props.product_id, params: {} }})
      .then((data) => {
        expect(data.data.id).toBe(71697);
        expect(data.data.campus).toBe('hr-rpp');
      })
  })

  test('does our axios getRatings call work?', () => {

    var props = {
        product_id: '/71697'
    }

    var int_product_id = parseInt(props.product_id.slice(1));
    console.log(int_product_id);

    axios
    .get('/reviews', { params: { type: '/meta', params: {
      product_id: int_product_id
    }}})
    .then((data) => {
      var ratingInfo = (data.data);
      expect(JSON.stringify(data.data)).toBe(JSON.stringify(exampleReviewsData));
    })
    .catch(err => console.log(err));
  })

  test('does our rating translation work?', () => {

    function ratingTranslate(ratings, callback) {
        for (var i = 1; i <= 5; i ++) {
          if (ratings[i] === undefined) {
            ratings[i] = 0;
          }
        }
        var total = ratings[1] * 1 + ratings[2] * 2 + ratings[3] * 3 + ratings[4] * 4 + ratings[5] * 5;
        var totalRate = ratings[1] * 1 + ratings[2] * 1 + ratings[3] * 1 + ratings[4] * 1 + ratings[5] * 1;
        var rating =  total / totalRate;
        // setRating(rating);
        // setReviews(total)
        callback(totalRate);
    }

    ratingTranslate(exampleReviewsData.ratings, (data) => {
        expect(data).toBe(305);
    } );

  })

  test('does Image Gallery render?', async () => {
    render(<ImageGallery key={'1'} style={exampleStyleData[0]} id={'/71697'} currPhoto={exampleStyleData[0].photos[0].thumbnail_url} update={() => { return null }}/>);
    const linkElement1 = screen.getByTestId('gallery-main');
    const linkElement2 = screen.getByTestId('gallery-thumbnails');
    await expect(linkElement1).toBeInTheDocument();
    await expect(linkElement2).toBeInTheDocument();

  })

  test('does Product Info render?', async () => {
    render(<ProductInfo key={'2'} product={[exampleProductData]} star={3.7} price={'140.00'} reviews={305}/>);

    const linkElement1 = screen.getByTestId('overview-product-info')
    const linkElement2 = screen.getByTestId('overview-slogan');

    await expect(linkElement1).toBeInTheDocument();
  })

  test('does Style Selector render?', async () => {
    render(<StyleSelector key={'3'} check={[true, false, false, false, false, false]} style={exampleStyleData[0]} styles={exampleStyleData} update={() => { return null}}/>);
    const linkElement1 = screen.getByTestId('overview-style-heading');
    const linkElement2 = screen.getByTestId('overview-mapped-styles');
    await expect(linkElement1).toBeInTheDocument();
    await expect(linkElement2).toBeInTheDocument();
  })

  test('does Add To Cart render? without chosenSize/Quant?', async () => {
    render(<AddToCart key={'4'} product={[exampleProductData]} styles={exampleStyleData[0]} skus={[]} quantity={[]} update={() => {return null}} chosenSize={''} chosenQuantity={'-'} update2={() => {return null}} chosenSKU={0}/>);

    const linkElement3 = screen.getByTestId('overview-cart-select3');
    const linkElement4 = screen.getByTestId('overview-cart-select4');
    const linkElement5 = screen.getByTestId('overview-cart-button');

    await expect(linkElement3).toBeInTheDocument();
    await expect(linkElement4).toBeInTheDocument();
    await expect(linkElement5).toBeInTheDocument();

  })

  test('does Add To Cart render? with chosenSize/Quant?', async () => {
    render(<AddToCart key={'4'} product={[exampleProductData]} styles={exampleStyleData[0]} skus={[exampleStyleData[0]['skus']]} quantity={[1, 2, 3, 4, 5]} update={() => {return null}} chosenSize={'M'} chosenQuantity={'1'} update2={() => {return null}} chosenSKU={0}/>);

    const linkElement1 = screen.getByTestId('overview-cart-select1');
    const linkElement2 = screen.getByTestId('overview-cart-select2');
    const linkElement3 = screen.getByTestId('overview-cart-button');

    await expect(linkElement1).toBeInTheDocument();
    await expect(linkElement2).toBeInTheDocument();
    await expect(linkElement3).toBeInTheDocument();

  })





})

var exampleReviewsData = {
    "product_id": "71697",
    "ratings": {
        "1": "52",
        "2": "22",
        "3": "39",
        "4": "44",
        "5": "148"
    },
    "recommended": {
        "false": "73",
        "true": "232"
    },
    "characteristics": {
        "Fit": {
            "id": 240582,
            "value": "3.4739336492890995"
        },
        "Length": {
            "id": 240583,
            "value": "3.0791666666666667"
        },
        "Comfort": {
            "id": 240584,
            "value": "3.3662551440329218"
        },
        "Quality": {
            "id": 240585,
            "value": "3.6092436974789916"
        }
    }
}

var exampleProductData = {
  "id": 71697,
  "campus": "hr-rpp",
  "name": "Camo Onesie",
  "slogan": "Blend in to your crowd",
  "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  "category": "Jackets",
  "default_price": "140.00",
  "created_at": "2022-05-11T19:38:15.373Z",
  "updated_at": "2022-05-11T19:38:15.373Z",
  "features": [
      {
          "feature": "Fabric",
          "value": "Canvas"
      },
      {
          "feature": "Buttons",
          "value": "Brass"
      }
  ]
}

var exampleStyleData = [
  {
      "style_id": 444218,
      "name": "Forest Green & Black",
      "original_price": "140.00",
      "sale_price": null,
      "default?": true,
      "photos": [
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          }
      ],
      "skus": {
          "2580526": {
              "quantity": 8,
              "size": "XS"
          },
          "2580527": {
              "quantity": 16,
              "size": "S"
          },
          "2580528": {
              "quantity": 17,
              "size": "M"
          },
          "2580529": {
              "quantity": 10,
              "size": "L"
          },
          "2580530": {
              "quantity": 15,
              "size": "XL"
          },
          "2580531": {
              "quantity": 4,
              "size": "XL"
          }
      }
  },
  {
      "style_id": 444219,
      "name": "Desert Brown & Tan",
      "original_price": "140.00",
      "sale_price": null,
      "default?": false,
      "photos": [
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80"
          }
      ],
      "skus": {
          "2580532": {
              "quantity": 8,
              "size": "XS"
          },
          "2580533": {
              "quantity": 16,
              "size": "S"
          },
          "2580534": {
              "quantity": 17,
              "size": "M"
          },
          "2580535": {
              "quantity": 10,
              "size": "L"
          },
          "2580536": {
              "quantity": 15,
              "size": "XL"
          },
          "2580537": {
              "quantity": 6,
              "size": "XXL"
          }
      }
  },
  {
      "style_id": 444220,
      "name": "Ocean Blue & Grey",
      "original_price": "140.00",
      "sale_price": "100.00",
      "default?": false,
      "photos": [
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1557760257-b02421ae77fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1557760257-b02421ae77fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=938&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1556268652-ad74ebb8f1e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1556268652-ad74ebb8f1e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1557394976-32cc983558ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1557394976-32cc983558ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          }
      ],
      "skus": {
          "2580538": {
              "quantity": 8,
              "size": "XS"
          },
          "2580539": {
              "quantity": 16,
              "size": "S"
          },
          "2580540": {
              "quantity": 17,
              "size": "M"
          },
          "2580541": {
              "quantity": 10,
              "size": "L"
          },
          "2580542": {
              "quantity": 15,
              "size": "XL"
          },
          "2580543": {
              "quantity": 6,
              "size": "XXL"
          }
      }
  },
  {
      "style_id": 444221,
      "name": "Digital Red & Black",
      "original_price": "140.00",
      "sale_price": null,
      "default?": false,
      "photos": [
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60",
              "url": "https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          }
      ],
      "skus": {
          "2580544": {
              "quantity": 8,
              "size": "XS"
          },
          "2580545": {
              "quantity": 16,
              "size": "S"
          },
          "2580546": {
              "quantity": 17,
              "size": "M"
          },
          "2580547": {
              "quantity": 10,
              "size": "L"
          },
          "2580548": {
              "quantity": 15,
              "size": "XL"
          },
          "2580549": {
              "quantity": 6,
              "size": "XXL"
          }
      }
  },
  {
      "style_id": 444222,
      "name": "Sky Blue & White",
      "original_price": "140.00",
      "sale_price": "100.00",
      "default?": false,
      "photos": [
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          }
      ],
      "skus": {
          "2580550": {
              "quantity": 8,
              "size": "XS"
          },
          "2580551": {
              "quantity": 16,
              "size": "S"
          },
          "2580552": {
              "quantity": 17,
              "size": "M"
          },
          "2580553": {
              "quantity": 10,
              "size": "L"
          },
          "2580554": {
              "quantity": 15,
              "size": "XL"
          },
          "2580555": {
              "quantity": 6,
              "size": "XXL"
          }
      }
  },
  {
      "style_id": 444223,
      "name": "Dark Grey & Black",
      "original_price": "170.00",
      "sale_price": null,
      "default?": false,
      "photos": [
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
          }
      ],
      "skus": {
          "2580556": {
              "quantity": 8,
              "size": "XS"
          },
          "2580557": {
              "quantity": 16,
              "size": "S"
          },
          "2580558": {
              "quantity": 17,
              "size": "M"
          },
          "2580559": {
              "quantity": 10,
              "size": "L"
          },
          "2580560": {
              "quantity": 15,
              "size": "XL"
          },
          "2580561": {
              "quantity": 6,
              "size": "XXL"
          }
      }
  }
]