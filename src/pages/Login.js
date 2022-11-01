import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      btnDisabled: true,
      password: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.entryClick = this.entryClick.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateBoth = this.validateBoth.bind(this);
  }

  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    }, () => this.validateBoth());
  }

  validateEmail() {
    const { email } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
    return (regex.test(email));
  }

  validatePassword() {
    const { password } = this.state;
    const maxLen = 6;
    return (password.length >= maxLen);
  }

  validateBoth() {
    const password = this.validatePassword();
    const email = this.validateEmail();
    console.log(password, email);
    if (password && email) {
      return this.setState({
        btnDisabled: false,
      });
    }
    this.setState({
      btnDisabled: true,
    });
  }

  entryClick() {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  }

  render() {
    const { email, btnDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            name="email"
            type="text"
            id="email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            name="password"
            data-testid="password-input"
            type="password"
            id="senha"
            onChange={ this.handleInput }
          />
        </label>
        <button
          onClick={ this.entryClick }
          type="button"
          disabled={ btnDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
