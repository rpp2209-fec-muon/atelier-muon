import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor} from '@testing-library/react';
import App from '../../client/src/App.jsx';
import Tile from '../../client/src/components/Reviews/Tile.jsx';
import List from '../../client/src/components/Reviews/List.jsx';
import Reviews from '../../client/src/components/Reviews/Reviews.jsx';
import RatingsBreakdown from '../../client/src/components/Reviews/RatingsBreakdown.jsx';
import ProductBreakdown from '../../client/src/components/Reviews/ProductBreakdown.jsx';


afterEach(() => {
  cleanup();
})

describe('Reviews Component', () => {
  it('renders Reviews component', () => {
    render(<Reviews product_id={'/71697'}/>);
    expect(screen.getByTestId('reviews-parent-div')).toBeInTheDocument();
  })
})

describe('Ratings Breakdown Component', () => {
  it('renders Ratings Breakdown component', () => {
    render(<RatingsBreakdown meta={{
      ratings: {1: '52', 2: '22', 3: '39', 4: '44', 5: '148'}
    }}/>)

    expect(screen.getByTestId('ratings-parent-div')).toBeInTheDocument();
  })
})

describe('Product Breakdown Component', () => {
  it('renders the Product Breakdown component', () => {
    render(<ProductBreakdown meta={{
      characteristics: {
      Fit: { id: 240582, value: '3.4739336492890995' },
      Length: { id: 240583, value: '3.0791666666666667' },
      Comfort: { id: 240584, value: '3.3662551440329218' },
      Quality: { id: 240585, value: '3.6092436974789916' }
      }
    }}/>)

    expect(screen.getByTestId('product-parent-div')).toBeInTheDocument();
  })
})

describe('List/Tile Components', () => {
  it('renders the List component', () => {
    render(<List list={[
      {
        review_id: 1278241,
        rating: 5,
        summary: 'gweGewgewgewag',
        recommend: false,
        response: null,
        body: 'awegaewgawegaewgaew',
        date: '2023-01-04T00:00:00.000Z',
        reviewer_name: 'gweagewagawe',
        helpfulness: 0,
        photos:[]
      },
      {
        review_id: 1278233,
        rating: 5,
        summary: 'fqwfqwfqwfqwf',
        recommend: false,
        response: null,
        body: 'fwqfqwfwqfqw',
        date: '2023-01-04T00:00:00.000Z',
        reviewer_name: 'blahblah',
        helpfulness: 0,
        photos:[]
      }
    ]}/>)
    expect(screen.getByTestId('list-parent-div')).toBeInTheDocument();
  })
})

describe('Tile Component', () => {
  it('renders the Tile component', () => {
    render(<Tile review={{
      review_id: 1278241,
      rating: 5,
      summary: 'gweGewgewgewag',
      recommend: false,
      response: null,
      body: 'awegaewgawegaewgaew',
      date: '2023-01-04T00:00:00.000Z',
      reviewer_name: 'gweagewagawe',
      helpfulness: 0,
      photos:[]
    }}/>)

    expect(screen.getByTestId('tile-instance')).toBeInTheDocument();
  })
})