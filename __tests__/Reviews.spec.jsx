import * as React from 'react';
import { render, screen, cleanup} from '@testing-library/react';
import Reviews from '../client/src/components/Reviews/Reviews.jsx';
import App from '../client/src/App.jsx';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
})

describe('Reviews', () => {
  it('renders Reviews component', async () => {
    render(<Reviews product_id={'/71697'}/>);
    expect(await screen.findByTestId('reviews-parent-div')).toBeInTheDocument();
  })
})