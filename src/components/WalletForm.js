import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUrl, saveData, endEdit } from '../redux/actions/index';
import fetchApi from '../redux/services/fetchApi';

const INITIAL_STATE = {
  payment: 'Dinheiro',
  value: '',
  currencieSelect: 'USD',
  tag: 'Alimentação',
  desc: '',
};

class WalletForm extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;

    this.btnSaveClick = this.btnSaveClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUrl());
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleValue(value, ask) {
    const { total } = this.props;
    let totalValue = total;
    const brlValue = Number(value) * Number(ask);
    totalValue += brlValue;
    return Number(totalValue.toFixed(2));
  }

  async handleSaveEdit() {
    const { payment, value, currencieSelect, tag, desc } = this.state;
    const { dispatch, expenses, idToEdit } = this.props;
    const arrWithoutEdit = expenses.filter((obj) => obj.id !== idToEdit);
    const objEdited = {
      id: idToEdit,
      method: payment,
      value,
      currency: currencieSelect,
      tag,
      description: desc,
      exchangeRates: await fetchApi(),
    };
    const newExpenses = [...arrWithoutEdit, objEdited];
    const sortNewExpenses = newExpenses.sort((a, b) => a.id - b.id);
    let newValue = 0;
    sortNewExpenses.forEach((obj) => {
      const cur = obj.currency;
      const val = obj.value;
      const curObj = obj.exchangeRates[cur];
      const { ask } = curObj;
      const newVal = Number((Number(val) * Number(ask)).toFixed(2));
      newValue += Number(newVal.toFixed(2));
    });
    dispatch(endEdit(sortNewExpenses, newValue));
    this.setState({ ...INITIAL_STATE });
  }

  async btnSaveClick() {
    const { payment, value, currencieSelect, tag, desc } = this.state;
    const { expenses, dispatch } = this.props;
    const moedas = await fetchApi();
    const teste = moedas[currencieSelect];
    const saveDispense = {
      id: expenses.length > 0 ? expenses.length : 0,
      method: payment,
      value,
      currency: currencieSelect,
      tag,
      description: desc,
      exchangeRates: moedas,
    };
    const saveArr = [...expenses, saveDispense];
    dispatch(saveData(saveArr, this.handleValue(value, teste.ask)));
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { desc, tag, payment, currencieSelect, value } = this.state;
    const { currencies, editor, idToEdit } = this.props;
    return (
      <div className="formDiv">
        <form>
          <label htmlFor="value">
            Valor
            <input
              id="value"
              name="value"
              value={ value }
              data-testid="value-input"
              type="number"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              onChange={ this.handleInput }
              value={ currencieSelect }
              name="currencieSelect"
              id="moeda"
              data-testid="currency-input"
            >
              { currencies.map((key, index) => (
                <option value={ key } key={ index }>{key}</option>
              )) }
            </select>
          </label>
          <label htmlFor="payment">
            Forma de pagamento
            <select
              name="payment"
              id="payment"
              value={ payment }
              onChange={ this.handleInput }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              value={ tag }
              name="tag"
              id="tag"
              onChange={ this.handleInput }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="desc">
            Descrição
            <textarea
              onChange={ this.handleInput }
              value={ desc }
              name="desc"
              id="desc"
              data-testid="description-input"
            />
          </label>
          { editor
            ? (
              <button
                onClick={ this.handleSaveEdit }
                type="button"
                name={ idToEdit }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                onClick={ this.btnSaveClick }
                type="button"
              >
                Adicionar despesa
              </button>
            ) }
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  idToEdit: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape([]).isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  total: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (global) => ({
  idToEdit: global.wallet.idToEdit,
  editor: global.wallet.editor,
  currencies: global.wallet.currencies,
  expenses: global.wallet.expenses,
  total: global.wallet.total,
});

export default connect(mapStateToProps)(WalletForm);
