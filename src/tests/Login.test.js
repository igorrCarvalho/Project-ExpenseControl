import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa se a página de login funciona corretamente', () => {
  it('Os elementos de login aparecem na tela corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('se forem digitados dados incorretos o botão de entrar não é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const falseEmail = 'igor@te';
    const falsePassword = '1234';

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, falseEmail);
    userEvent.type(passwordInput, falsePassword);
    expect(loginBtn).toHaveAttribute('disabled');
  });

  it('Se forem digitados dados corretos o botão de entrar é ativado', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const trueEmail = 'igor@teste.com';
    const truePassword = '123456';

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, trueEmail);
    userEvent.type(passwordInput, truePassword);

    expect(loginBtn).not.toHaveAttribute('disabled');

    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/carteira');
  });

  it('O botão de entrar é renderizado desativado', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toHaveAttribute('disabled');
    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/');
  });
});
