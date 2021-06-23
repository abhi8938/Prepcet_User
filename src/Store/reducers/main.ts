import {
  SET_CATEGORY,
  SET_CHAPTERS,
  SET_COMBOS,
  SET_CURRENT_AFFAIRS,
  SET_DAILY_LECTURES,
  SET_DAILY_TESTS,
  SET_LECTURES,
  SET_MOCK_TESTS,
  SET_NOTIFICATIONS,
  SET_OFFERS,
  SET_RECENTS,
  SET_SELECTED_CATEGORY,
  SET_SUBJECTS,
  SET_SUBJECT_QUIZZES,
  SET_SUBJECT_TESTS,
  SET_USER_COMBOS,
  SET_VOCABS,
} from '../actions/main';

import {SET_QUIZZES} from './../actions/main';

const initialState = {
  search_text: '',
  search_results: [],
  notifications: [],
  subjects: [],
  categories: [],
  selected_category: '',
  mock_tests: [],
  subject_tests: [],
  subject_quizzes: [],
  quizzes: [],
  current_affairs: [],
  offers: [],
  transactions: [],
  balance: 0,
  user_combos: [],
  combos: [],
  reports: [],
  result: {},
  lectures: [], //daily
  faq: [],
  controls: {},
  ebooks: [],
  vocabs: [],
  recents: [],
  chapters: [],
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
      return {...state, current_affairs: action.affairs};
    case SET_COMBOS:
      return {...state, combos: action.combos};
    case SET_USER_COMBOS:
      return {...state, user_combos: action.user_combos};
    case SET_RECENTS:
      return {...state, recents: action.recents};
    case SET_MOCK_TESTS:
      return {...state, mock_tests: action.mock_tests};
    case SET_CATEGORY:
      return {...state, categories: action.categories};
    case SET_SELECTED_CATEGORY:
      return {...state, selected_category: action.category};
    case SET_NOTIFICATIONS:
      return {...state, notifications: action.notifications};
    case SET_CHAPTERS:
      return {...state, chapters: action.chapters};
    case SET_SUBJECT_TESTS:
      return {...state, subject_tests: action.tests};
    case SET_SUBJECT_QUIZZES:
      return {...state, subject_quizzes: action.quizzes};
    case SET_QUIZZES:
      return {...state, quizzes: action.quizzes};
    default:
      return state;
  }
};

export default mainReducer;
