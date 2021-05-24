import {
  SET_COMBOS,
  SET_CURRENT_AFFAIRS,
  SET_DAILY_LECTURES,
  SET_DAILY_TESTS,
  SET_LECTURES,
  SET_OFFERS,
  SET_RECENTS,
  SET_SUBJECTS,
  SET_TESTS,
  SET_USER_COMBOS,
  SET_VOCABS,
} from '../actions/main';

const initialState = {
  search_text: '',
  search_resulst: [],
  notifications: [],
  subjects: [],
  categories: [],
  tests: [],
  current_affairs: [],
  offers: [],
  transactions: [],
  balance: 0,
  user_combos: [],
  combos: [],
  results: [],
  result: {},
  lectures: [],
  faq: [],
  controls: {},
  ebooks: [],
  vocabs: [],
  recents: [],
  chapters: [],
  daily: {
    tests: [],
    lectures: [],
  },
};

const mainReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_OFFERS:
      return {...state, offers: action.offers};
    case SET_SUBJECTS:
      return {...state, subjects: action.subjects};
    case SET_DAILY_TESTS:
      return {...state, daily: {...state.daily, tests: action.tests}};
    case SET_DAILY_LECTURES:
      return {...state, daily: {...state.daily, lectures: action.lectures}};
    case SET_LECTURES:
      return {...state, lectures: action.lectures};
    case SET_VOCABS:
      return {...state, vocabs: action.vocabs};
    case SET_CURRENT_AFFAIRS:
      return {...state, current_affairs: action.current_affairs};
    case SET_COMBOS:
      return {...state, combos: action.combos};
    case SET_USER_COMBOS:
      return {...state, user_combos: action.user_combos};
    case SET_RECENTS:
      return {...state, recents: action.recents};
    case SET_TESTS:
      return {...state, tests: action.tests};
    default:
      return state;
  }
};

export default mainReducer;
