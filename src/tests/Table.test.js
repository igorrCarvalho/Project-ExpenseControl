import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockInitialState from './helpers/mockInitialState';

describe('Testa o funcionamento da tabela de despesas', () => {
  it('Ao clicar no botão de excluir uma despesa é excluída', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockInitialState });

    const deleteBtns = await screen.findAllByTestId('delete-btn');
    expect(deleteBtns).toHaveLength(2);

    userEvent.click(deleteBtns[0]);

    const deleteBtn = await screen.findAllByTestId('delete-btn');
    expect(deleteBtn).toHaveLength(1);
  });

  it('É possível editar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockInitialState });

    const editBtns = await screen.findAllByTestId('edit-btn');
    userEvent.click(editBtns[0]);

    const editSaveBtn = await screen.findByRole('button', { name: /editar despesa/i });
    expect(editSaveBtn).toBeInTheDocument();

    const valueInput = screen.getByLabelText(/valor/i);
    const desc = screen.getByLabelText(/descrição/i);

    userEvent.type(valueInput, '5');
    userEvent.type(desc, 'cinco dol');
    userEvent.click(editSaveBtn);

    const editedVal = await screen.findByText(/5.00/i);
    const editedDesc = await screen.findByText(/cinco dol/i);

    expect(editedVal).toBeInTheDocument();
    expect(editedDesc).toBeInTheDocument();
  });
});
