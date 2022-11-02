import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUrl, saveData } from '../redux/actions/index';
import fetchApi from '../redux/services/fetchApi';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      payment: 'Dinheiro',
      value: '',
      currencieSelect: 'USD',
      tag: 'Alimentação',
      desc: '',
    };
    this.btnSaveClick = this.btnSaveClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleValue = this.handleValue.bind(this);
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
    this.setState({
      payment: 'Dinheiro',
      value: '',
      currencieSelect: 'USD',
      tag: 'Alimentação',
      desc: '',
    });
  }

  render() {
    const { desc, tag, payment, currencieSelect, value } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
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
          <button onClick={ this.btnSaveClick } type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({

  }).isRequired).isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (global) => ({
  currencies: global.wallet.currencies,
  expenses: global.wallet.expenses,
  total: global.wallet.total,
});

export default connect(mapStateToProps)(WalletForm);
