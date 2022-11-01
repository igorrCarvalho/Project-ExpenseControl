import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUrl } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      payment: 'dinheiro',
      value: '',
      currencieSelect: 'USD',
      tag: 'alimentacao',
      desc: '',
    };
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUrl());
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao de credito">Cartão de crédito</option>
              <option value="cartao de debito">Cartão de débito</option>
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
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
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
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (global) => ({
  currencies: global.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
