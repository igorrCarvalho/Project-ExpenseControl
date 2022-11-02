import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div id="tableHeader">
        <th className="tableTitles">Descrição</th>
        <th className="tableTitles">Tag</th>
        <th className="tableTitles">Método de pagamento</th>
        <th className="tableTitles">Valor</th>
        <th className="tableTitles">Moeda</th>
        <th className="tableTitles">Câmbio utilizado</th>
        <th className="tableTitles">Valor convertido</th>
        <th className="tableTitles">Moeda de conversão</th>
        <th className="tableTitles">Editar/Excluir</th>
      </div>
    );
  }
}

export default Table;
