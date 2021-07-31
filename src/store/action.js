export const GET_ALL_WALLETS = 'GET_ALL_WALLETS';
export const GET_WALLETS = 'GET_WALLETS';
export const GET_NEWS = 'GET_NEWS';
export const GET_RATES = 'GET_RATES';
export const GET_ALL_RATES = 'GET_ALL_RATES';
export const USER_HISTORY = 'USER_HISTORY';
export const SET_CURRENT_RATE = 'SET_CURRENT_RATE';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const USER_DATA = 'USER_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_CURRENCY_RECVISIT = 'SET_CURRENCY_RECVISIT';
export const CARD_PAY_WEB = 'CARD_PAY_WEB';
export const GET_OPERATIONS = 'GET_OPERATIONS';
export const BUY_DEFAULT = 'BUY_DEFAULT';
export const WITHDRAW_DEFAULT = 'WITHDRAW_DEFAULT';
export const SELL_DEFAULT = 'SELL_DEFAULT';
export const NEWS_DATA = 'NEWS_DATA';
export const REPLENISH_DATA = 'REPLENISH_DATA';
export const REPLENISH_COMPONENT_DATA = 'REPLENISH_COMPONENT_DATA';
export const FIAT_KURSES = 'FIAT_KURSES';
export const GET_OPERATIONS_FILTERED = 'GET_OPERATIONS_FILTERED';
export const CHECKS_DATA = 'CHECKS_DATA';
export const FAQ_DATA = 'FAQ_DATA';
export const SELL_RATES = 'SELL_RATES';
export const WITHDRAW_RATES = 'WITHDRAW_RATES';
export const GET_FAQ = 'GET_FAQ';
export const CONFIRM_BUY_DATA = 'CONFIRM_BUY_DATA';
export const CONFIRM_SELL_DATA = 'CONFIRM_SELL_DATA';
export const CONFIRM_WITHDRAW_DATA = 'CONFIRM_WITHDRAW_DATA';
export const ADDWALLET_READ = 'ADDWALLET_READ';

export function getFAQ(data) {
  return {
    type: GET_FAQ,
    payload: data,
  };
}
// ----------------------------
export function ChekData(data) {
  return {
    type: CHECKS_DATA,
    payload: data,
  };
}
// ----------------------------
export function FiatKurs(data) {
  return {
    type: FIAT_KURSES,
    payload: data,
  };
}
// ----------------------------
export function ReplenishComponentData(data) {
  return {
    type: REPLENISH_COMPONENT_DATA,
    payload: data,
  };
}
// ----------------------------
export function ReplenishData(data) {
  return {
    type: REPLENISH_DATA,
    payload: data,
  };
}
// ----------------------------
export function ConfirmBuy(data) {
  return {
    type: CONFIRM_BUY_DATA,
    payload: data,
  };
}
// ----------------------------
export function ConfirmSell(data) {
  return {
    type: CONFIRM_SELL_DATA,
    payload: data,
  };
}
// ----------------------------
export function ConfirmWithdraw(data) {
  return {
    type: CONFIRM_WITHDRAW_DATA,
    payload: data,
  };
}
// ----------------------------
export function SellDef(data) {
  return {
    type: SELL_DEFAULT,
    payload: data,
  };
}
// ----------------------------
export function AddwalletRead(data) {
  return {
    type: ADDWALLET_READ,
    payload: data,
  };
}
// ----------------------------
export function getOperationsFiltered(data) {
  return {
    type: GET_OPERATIONS_FILTERED,
    payload: data,
  };
}
// ----------------------------
export function getOperations(data) {
  return {
    type: GET_OPERATIONS,
    payload: data,
  };
}
// ----------------------------
export function FaqData(data) {
  return {
    type: FAQ_DATA,
    payload: data,
  };
}
// ----------------------------
export function SellRates(data) {
  return {
    type: SELL_RATES,
    payload: data,
  };
}
// ----------------------------
export function WithdrawRates(data) {
  return {
    type: WITHDRAW_RATES,
    payload: data,
  };
}
// ----------------------------
export function WithdrawDef(data) {
  return {
    type: WITHDRAW_DEFAULT,
    payload: data,
  };
}
// ----------------------------
export function setCurrencyRecvisit(data) {
  return {
    type: SET_CURRENCY_RECVISIT,
    payload: data,
  };
}
// ----------------------------
export function getAllWallets(data) {
  return {
    type: GET_ALL_WALLETS,
    payload: data,
  };
}
// ----------------------------
export function getWallets(data) {
  return {
    type: GET_WALLETS,
    payload: data,
  };
}
// ----------------------------
export function saveRates(data) {
  return {
    type: GET_RATES,
    payload: data,
  };
}
// ----------------------------
export function saveAllRates(data) {
  return {
    type: GET_ALL_RATES,
    payload: data,
  };
}
// ----------------------------
export function setCurrentRate(data) {
  return {
    type: SET_CURRENT_RATE,
    payload: data,
  };
}
// ----------------------------
export function saveToken(data) {
  return {
    type: SAVE_TOKEN,
    payload: data,
  };
}
// ----------------------------
export function saveUserData(data) {
  return {
    type: USER_DATA,
    payload: data,
  };
}
// ----------------------------
export function setUserHistory(data) {
  return {
    type: USER_HISTORY,
    payload: data,
  };
}
// ----------------------------
export function setLoading(data) {
  return {
    type: SET_LOADING,
    payload: data,
  };
}
// ----------------------------
export function cardpayweb(data) {
  return {
    type: CARD_PAY_WEB,
    payload: data,
  };
}
// ----------------------------
export function BuyDefault(data) {
  return {
    type: BUY_DEFAULT,
    payload: data,
  };
}
// ----------------------------
export function NewsData(data) {
  return {
    type: NEWS_DATA,
    payload: data,
  };
}
