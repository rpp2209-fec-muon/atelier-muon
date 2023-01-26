import { render, screen, cleanup } from "@testing-library/react";
import React from 'react';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup();
})


test('Test our update style function', () => {

  var testArg = {
    target: {
      value: '/71697'
    }
  }

  var test1 = ProductOverview.updateStyle(testArg)

  expect().toBe(true)
})