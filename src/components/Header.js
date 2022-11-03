import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">{ total.toFixed(2) }</h3>
        <h3 data-testid="header-currency-field">Câmbio: BRL</h3>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  total: globalState.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
