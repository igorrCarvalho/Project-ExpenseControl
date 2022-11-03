import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExchan } from '../redux/actions/index';

class Table extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete({ target }) {
    const { expenses, dispatch } = this.props;
    const { name } = target;
    const arrObj = expenses.filter((obj) => obj.id.toString() === name);
    const arrAsk = arrObj[0].exchangeRates[arrObj[0].currency];
    const treatedId = Number(name);
    const treatedValue = Number(arrObj[0].value);
    const treatedAsk = Number(arrAsk.ask);
    dispatch(deleteExchan(treatedId, treatedValue, treatedAsk));
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="tableDiv">
        <table>
          <thead>
            <th className="tableTitles">Descrição</th>
            <th className="tableTitles">Tag</th>
            <th className="tableTitles">Método de pagamento</th>
            <th className="tableTitles">Valor</th>
            <th className="tableTitles">Moeda</th>
            <th className="tableTitles">Câmbio utilizado</th>
            <th className="tableTitles">Valor convertido</th>
            <th className="tableTitles">Moeda de conversão</th>
            <th className="tableTitles">Editar/Excluir</th>
          </thead>
          <tbody>
            { expenses.map((obj) => {
              const ask = obj.exchangeRates[obj.currency];
              const name = obj.exchangeRates[obj.currency];
              const brlValue = Number(obj.value) * Number(ask.ask);
              return (
                <tr key={ obj.id }>
                  <td>{ obj.description }</td>
                  <td>{ obj.tag }</td>
                  <td>{ obj.method }</td>
                  <td>{ Number(obj.value).toFixed(2) }</td>
                  <td>{ name.name }</td>
                  <td>{ Number(ask.ask).toFixed(2) }</td>
                  <td>{ brlValue.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button
                      onClick={ this.handleDelete }
                      name={ obj.id }
                      data-testid="delete-btn"
                      type="button"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

Table.propTypes = {
  expenses: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
