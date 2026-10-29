import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';

import { useDebouncedValue } from '../src/hooks/useDebouncedValue';

let currentValue = '';
let renderer: ReturnType<typeof TestRenderer.create> | undefined;

function TestComponent({ value }: { value: string }) {
  currentValue = useDebouncedValue(value);

  return null;
}

beforeEach(() => {
  jest.useFakeTimers();
  currentValue = '';
});

afterEach(() => {
  act(() => {
    renderer?.unmount();
  });

  renderer = undefined;
  jest.clearAllTimers();
  jest.useRealTimers();
});

test('espera 400 ms antes de actualizar el valor', () => {
  act(() => {
    renderer = TestRenderer.create(<TestComponent value="" />);
  });

  act(() => {
    renderer!.update(<TestComponent value="Batman" />);
  });

  expect(currentValue).toBe('');

  act(() => {
    jest.advanceTimersByTime(399);
  });

  expect(currentValue).toBe('');

  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(currentValue).toBe('Batman');
});

test('reinicia la espera cuando el usuario sigue escribiendo', () => {
  act(() => {
    renderer = TestRenderer.create(<TestComponent value="" />);
  });

  act(() => {
    renderer!.update(<TestComponent value="Bat" />);
  });

  act(() => {
    jest.advanceTimersByTime(300);
  });

  act(() => {
    renderer!.update(<TestComponent value="Batman" />);
  });

  act(() => {
    jest.advanceTimersByTime(100);
  });

  expect(currentValue).toBe('');

  act(() => {
    jest.advanceTimersByTime(300);
  });

  expect(currentValue).toBe('Batman');
});