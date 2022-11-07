import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';

describe('Testa se o formulário de adicionar despesa funciona corretamente', () => {
  it('Os inputs aparecem corretamente na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByLabelText(/valor/i);
    const currencyInput = screen.getByLabelText(/moeda/i);
    const method = screen.getByLabelText(/forma de pagamento/i);
    const tag = screen.getByLabelText(/tag/i);
    const desc = screen.getByLabelText(/descrição/i);
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(addExpenseBtn).toBeInTheDocument();
  });

  it('As informações do topo da tabela aparecem corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const descTitle = screen.getByTestId('desc-title');
    const tagTitle = screen.getByTestId('tag-title');
    const methodTitle = screen.getByTestId('methodTitle');
    const valueTitle = screen.getByTestId('value-title');
    const currencyTitle = screen.getByTestId('currencyTitle');
    const cambioTitle = screen.getByTestId('cambioTitle');
    const convertTitle = screen.getByTestId('convertTitle');
    const moedaTitle = screen.getByTestId('moedaTitle');
    const btnTitle = screen.getByTestId('btnTitle');

    expect(descTitle).toBeInTheDocument();
    expect(tagTitle).toBeInTheDocument();
    expect(methodTitle).toBeInTheDocument();
    expect(valueTitle).toBeInTheDocument();
    expect(currencyTitle).toBeInTheDocument();
    expect(cambioTitle).toBeInTheDocument();
    expect(convertTitle).toBeInTheDocument();
    expect(moedaTitle).toBeInTheDocument();
    expect(btnTitle).toBeInTheDocument();
  });

  it('É possível adicionar uma despesa clicando no botão de adicionar', async () => {
    renderWithRouterAndRedux(<App />);

    const trueEmail = 'igor@teste.com';
    const truePassword = '123456';

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, trueEmail);
    userEvent.type(passwordInput, truePassword);
    userEvent.click(loginBtn);

    const valueInput = screen.getByLabelText(/valor/i);
    const desc = screen.getByLabelText(/descrição/i);
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '5');
    userEvent.type(desc, 'cinco dólares');
    userEvent.click(addExpenseBtn);

    const valueExpense = await screen.findByText(/5.00/i);
    const descExpense = await screen.findByText(/cinco dólares/i);

    expect(descExpense).toBeInTheDocument();
    expect(valueExpense).toBeInTheDocument();
  });
});
