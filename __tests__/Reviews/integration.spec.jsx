import * as React from 'react';
import { render, screen, cleanup, waitFor} from '@testing-library/react';
import Reviews from '../../client/src/components/Reviews/Reviews.jsx';
import App from '../../client/src/App.jsx';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
})

describe('Reviews', () => {
  it('renders Reviews component', () => {
    render(<Reviews product_id={'/71697'}/>);
    expect(screen.getByTestId('reviews-parent-div')).toBeInTheDocument();
  })
})

describe('Ratings Breakdown', () => {
  it('renders the Ratings Breakdown component', async () => {
    render(<Reviews product_id={'/71697'}/>);
    // expect(screen.queryByTestId('ratings-parent-div')).toBeNull();

    // screen.debug();

    await waitFor(() => {
      screen.debug();
      expect(screen.getByTestId('ratings-parent-div')).toBeInTheDocument()}, {
      timeout: 2000
    });

    // screen.debug();
  })
})