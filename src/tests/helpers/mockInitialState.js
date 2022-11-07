import mockData from './mockData';

const mockInitialState = {
  user: {
    email: 'igor@teste.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '100',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Alimentação',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '50',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Lazer',
        description: 'Lazer',
        exchangeRates: mockData,
      },
    ],
    total: 731.65,
    editor: false,
    idToEdit: 0,
    isFetching: false,
  },
};

export default mockInitialState;
