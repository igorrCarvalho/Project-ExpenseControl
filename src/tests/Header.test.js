import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockInitialState from './helpers/mockInitialState';
import Wallet from '../pages/Wallet';
import App from '../App';

describe('Testa se o Header funciona corretamente', () => {
  it('Ao fazer o login, o Header mostra o email e câmbio', () => {
    renderWithRouterAndRedux(<App />);

    const trueEmail = 'igor@teste.com';
    const truePassword = '123456';

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, trueEmail);
    userEvent.type(passwordInput, truePassword);
    userEvent.click(loginBtn);

    const emailHeader = screen.getByRole('heading', { level: 3, name: /igor@teste.com/i });
    const totalHeader = screen.getByRole('heading', { level: 3, name: /0.00/i });
    const cambHeader = screen.getByRole('heading', { level: 3, name: /câmbio: brl/i });

    expect(emailHeader).toBeInTheDocument();
    expect(totalHeader).toBeInTheDocument();
    expect(cambHeader).toBeInTheDocument();
  });

  it('O valor correto é renderizado no Header', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockInitialState });

    const total = screen.getByRole('heading', { level: 3, name: /731.65/i });
    expect(total).toBeInTheDocument();
  });
});
