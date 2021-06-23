import Notificaiton from '../../Services/notification';
import {handleAlert} from './user';
import services from '../../Services/services';

export const SET_SUBSCRIPTION = 'SET_SUBSCRIPTION';
export const SEARCH = 'SET_SEARCH';
export const RESULTS_SEARCH = 'RESULTS_SEARCH';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_ALERT = 'SET_ALERT';
export const SET_SUBJECTS = 'SET_SUBJECTS'; //? includes chapters - create chapters state  seperately as well
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_MOCK_TESTS = 'SET_MOCK_TESTS';
export const SET_SUBJECT_TESTS = 'SET_SUBJECT_TESTS';
export const SET_CURRENT_AFFAIRS = 'SET_CURRENT_AFFAIRS';
export const SET_OFFERS = 'SET_OFFERS';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const SET_BALANCE = 'SET_BALANCE';
export const SET_PACKAGES = 'SET_PACKAGES';
export const SET_USER_COMBOS = 'SET_USER_COMBOS';
export const BUY = 'BUY';
export const BUY_COMBO = 'BUY_COMBO';
export const SET_COMBOS = 'SET_COMBOS';
export const GENERATE_RESULT = 'GENERATE_RESULT';
export const SET_RESULTS = 'SET_RESULTS';
export const SET_LECTURES = 'SET_LECTURES';
export const SET_VOCABS = 'SET_VOCABS';
export const SET_DAILY_TESTS = 'SET_DAILY_TESTS';
export const SET_DAILY_LECTURES = 'SET_DAILY_LECTURES';
export const SET_RECENTS = 'SET_RECENTS';
export const HANDLE_SUPPORT = 'HANDLE_SUPPORT';
export const SET_FAQ = 'SET_FAQ';
export const SET_CHAPTERS = 'SET_CHAPTERS';
export const SET_SUBJECT_QUIZZES = 'SET_SUBJECT_QUIZZES';
export const SET_QUIZZES = 'SET_QUIZZES';
const service = new services();
const notification_service = new Notificaiton();

export const getFaq = async (setdata: (data: any) => void) => {
  //....
};

export const set_offers = (offers: any) => {
  return {type: SET_OFFERS, offers};
};

export const set_subjects = (subjects: any) => {
  return {type: SET_SUBJECTS, subjects};
};

export const set_tests = (tests: any) => {
  return {type: SET_MOCK_TESTS, tests};
};

export const set_daily_tests = (tests: any) => {
  return {type: SET_DAILY_TESTS, tests};
};

export const set_daily_lectures = (lectures: any) => {
  return {type: SET_DAILY_LECTURES, lectures};
};

export const set_lectures = (lectures: any) => {
  return {type: SET_LECTURES, lectures};
};

export const set_vocabs = (vocabs: any) => {
  return {type: SET_VOCABS, vocabs};
};

export const set_affairs = (affairs: any) => {
  return {type: SET_CURRENT_AFFAIRS, affairs};
};

export const set_combos = (combos: any) => {
  return {type: SET_COMBOS, combos};
};

export const set_user_combos = (user_combos: any) => {
  return {type: SET_USER_COMBOS, user_combos};
};

export const set_user_recents = (recents: any) => {
  return {type: SET_RECENTS, recents};
};

export const set_categories = (categories: any) => {
  return {type: SET_CATEGORY, categories};
};

export const set_selected_category = (category: any) => {
  return {type: SET_SELECTED_CATEGORY, category};
};

export const set_notifications = (notifications: any) => {
  return {type: SET_NOTIFICATIONS, notifications};
};

export const set_chapters = (chapters: any) => {
  return {type: SET_CHAPTERS, chapters};
};

export const set_subject_tests = (tests: any) => {
  return {type: SET_MOCK_TESTS, tests};
};

export const set_subject_quizzes = (quizzes: any) => {
  return {type: SET_SUBJECT_QUIZZES, quizzes};
};

export const set_quizzes = (quizzes: any) => {
  return {type: SET_QUIZZES, quizzes};
};

export const getOffers = () => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_offers();
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_offers(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const getCategories = () => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_categories();
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_categories(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const getSubjects = (categoryId: string) => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_subjects(categoryId);
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_subjects(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const getTests = (categoryId: string) => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_tests(categoryId);
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_tests(response.data));
      // let daily = response.data.filter((item: any) => item.daily === true);
      // dispatch(set_daily_tests(daily));
    } catch (err) {
      throw err;
    }
  };
};

export const getSubjectTests = (subject: string) => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_subject_tests(subject);
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_subject_tests(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const getLectures = (categoryId: string) => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_lectures(categoryId);
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_lectures(response.data));
      let daily = response.data.filter((item: any) => item.daily === true);
      dispatch(set_daily_lectures(daily));
    } catch (err) {
      throw err;
    }
  };
};

export const getVocabs = () => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_vocabs();
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_vocabs(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const getAffairs = () => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_affairs();
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_affairs(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const get_combos = () => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_combos();
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_combos(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const get_user_combos = () => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_user_combos();
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_user_combos(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const getNotifications = () => {
  return async (dispatch: any) => {
    try {
      const notifications = await notification_service.getNotifications();
      if (notifications === null) return;
      dispatch(set_notifications(notifications));
    } catch (err) {
      throw err;
    }
  };
};

export const getChapters = (subject: string) => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_chapters(subject);
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_chapters(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const getSubjectQuizzes = (subject: string) => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_subject_quizzes(subject);
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_subject_quizzes(response.data));
    } catch (err) {
      throw err;
    }
  };
};

export const getQuizzes = (category: string) => {
  return async (dispatch: any) => {
    try {
      const response = await service.get_category_quizzes(category);
      if (response.status !== 200) {
        throw new Error(
          `${response.data === undefined ? response : response.data}`,
        );
      }
      dispatch(set_quizzes(response.data));
    } catch (err) {
      throw err;
    }
  };
};
