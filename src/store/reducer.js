import {
  CARD_PAY_WEB,
  GET_ALL_WALLETS,
  GET_RATES,
  GET_WALLETS,
  SAVE_TOKEN,
  SET_CURRENCY_RECVISIT,
  SET_CURRENT_RATE,
  SET_LOADING,
  USER_DATA,
  GET_ALL_RATES,
  USER_HISTORY,
  GET_OPERATIONS,
  BUY_DEFAULT,
  NEWS_DATA,
  FAQ_DATA,
  WITHDRAW_DEFAULT,
  SELL_RATES,
  GET_OPERATIONS_FILTERED,
  GET_FAQ,
  CONFIRM_BUY_DATA,
  SELL_DEFAULT,
  CHECKS_DATA,
  REPLENISH_DATA,
  REPLENISH_COMPONENT_DATA,
  ADDWALLET_READ,
  CONFIRM_SELL_DATA,
  CONFIRM_WITHDRAW_DATA,
  FIAT_KURSES,
} from './action';

const initialState = {
  isLoading: false,
  wallets: '',
  allWallets: '',
  rates: '',
  allRates: '',
  currentRate: '',
  currencyRecvisit: '',
  news: '',
  faq: '',
  token: '',
  userData: '',
  CardPayWeb: '',
  UserHistory: '',
  operations: '',
  filteredOperationsHistory: '',
  BuyDefault: '',
  WithdrawDefault: '',
  NewsData: '',
  checks: '',
  faqData: '',
  sellRates: '',
  questions: '',
  confirmBuy: '',
  confirmSell: '',
  confirmWithdraw: '',
  sellDef: '',
  withdrawDef: '',
  replenishData: '',
  addwalletRead: true,
  replenishComponentData: '',
  fiatKurse: '',
};

export default function appReducer(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    // ------------------
    case GET_FAQ: {
      return {
        ...state,
        questions: payload,
      };
    }
    // ------------------
    case FIAT_KURSES: {
      return {
        ...state,
        fiatKurse: payload,
      };
    }
    // ------------------
    case WITHDRAW_DEFAULT: {
      return {
        ...state,
        withdrawDef: payload,
      };
    }
    // ------------------
    case REPLENISH_COMPONENT_DATA: {
      return {
        ...state,
        replenishComponentData: payload,
      };
    }
    // ------------------
    case SELL_DEFAULT: {
      return {
        ...state,
        sellDef: payload,
      };
    }
    // ------------------
    case CHECKS_DATA: {
      return {
        ...state,
        checks: payload,
      };
    }
    // ------------------
    case CONFIRM_BUY_DATA: {
      return {
        ...state,
        confirmBuy: payload,
      };
    }
    // ------------------
    case CONFIRM_SELL_DATA: {
      return {
        ...state,
        confirmSell: payload,
      };
    }
    // ------------------
    case CONFIRM_WITHDRAW_DATA: {
      return {
        ...state,
        confirmWithdraw: payload,
      };
    }
    // ------------------
    case GET_OPERATIONS_FILTERED: {
      return {
        ...state,
        filteredOperationsHistory: payload,
      };
    }
    // ------------------
    case GET_OPERATIONS: {
      return {
        ...state,
        operations: payload,
      };
    }
    // ------------------
    case SELL_RATES: {
      return {
        ...state,
        sellRates: payload,
      };
    }
    // ------------------
    case WITHDRAW_DEFAULT: {
      return {
        ...state,
        WithdrawDefault: payload,
      };
    }
    // ------------------
    case FAQ_DATA: {
      return {
        ...state,
        faqData: payload,
      };
    }
    // ------------------
    case ADDWALLET_READ: {
      return {
        ...state,
        addwalletRead: payload,
      };
    }
    // ------------------
    case REPLENISH_DATA: {
      return {
        ...state,
        replenishData: payload,
      };
    }
    // ------------------
    case SET_CURRENCY_RECVISIT: {
      return {
        ...state,
        currencyRecvisit: payload,
      };
    }
    // ------------------
    case GET_ALL_WALLETS: {
      return {
        ...state,
        allWallets: payload,
      };
    }
    // ------------------
    case GET_WALLETS: {
      return {
        ...state,
        wallets: payload,
      };
    }
    // ------------------
    case GET_RATES: {
      return {
        ...state,
        rates: payload,
      };
    }
    // ------------------
    case GET_ALL_RATES: {
      return {
        ...state,
        allRates: payload,
      };
    }
    // ------------------
    case SET_CURRENT_RATE: {
      return {
        ...state,
        currentRate: payload,
      };
    }
    // ------------------
    case SAVE_TOKEN: {
      return {
        ...state,
        token: payload,
      };
    }
    // ------------------
    case USER_DATA: {
      return {
        ...state,
        userData: payload,
      };
    }
    // ------------------
    case SET_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    // ------------------
    case CARD_PAY_WEB: {
      return {
        ...state,
        CardPayWeb: payload,
      };
    }
    // ------------------
    case USER_HISTORY: {
      return {
        ...state,
        UserHistory: payload,
      };
    }
    // ------------------
    case BUY_DEFAULT: {
      return {
        ...state,
        BuyDefault: payload,
      };
    }
    // ------------------
    case NEWS_DATA: {
      return {
        ...state,
        NewsData: payload,
      };
    }
    // ------------------
    default: {
      return state;
    }
  }
}
