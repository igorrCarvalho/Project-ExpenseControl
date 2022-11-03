import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
            { expenses.map((obj, ind) => {
              const ask = obj.exchangeRates[obj.currency];
              const name = obj.exchangeRates[obj.currency];
              const brlValue = Number(obj.value) * Number(ask.ask);
              return (
                <tr key={ ind }>
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
                    <button type="button">Excluir</button>
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
});

Table.propTypes = {
  expenses: PropTypes.shape([]).isRequired,
};

export default connect(mapStateToProps)(Table);
