import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import Login from '../../pages/auth/login';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe('Login Component', () => {
  beforeEach(() => {
    // Mock the fetch function before each test
    (global.fetch as jest.Mock) = jest.fn();
  });

  it('Handles login and shows error on invalid credentials', async () => {
    // Mock the fetch function response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    } as Response);

    render(<Login />);

    // Fill in the form fields
    userEvent.type(screen.getByPlaceholderText('Username'), 'test');
    userEvent.type(screen.getByPlaceholderText('Password'), 'test');

    // Click the login button
    userEvent.click(screen.getByText('Log in'));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Check if the error message is displayed
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');

      // Ensure that the router is not redirected on failed login
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });

  it('Handles login and redirects on successful login', async () => {
    // Mock the fetch function response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'dummyToken' }),
    } as Response);

    render(<Login />);

    // Fill in the form fields
    userEvent.type(screen.getByPlaceholderText('Username'), 'kminchelle');
    userEvent.type(screen.getByPlaceholderText('Password'), '0lelplR');

    // Click the login button
    userEvent.click(screen.getByText('Log in'));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Check if the router is redirected to the home page
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });
});
