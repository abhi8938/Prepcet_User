import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
  user: {},
  subject: [{}, {}],
  alert: {
    type: '',
    message: '',
    show: false,
  },
  subscription: {},
  broadcast: {},
  notes: {ann: [{type: 'HIGHLIGHT'}, {type: 'BOOKMARK'}]},
  notifications: [],
  resources: {},
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'SET-USER':
      return {...state, user: action.payload};
    case 'SET-SUBJECT':
      return {...state, subject: action.payload};
    case 'SET-ALERT':
      return {...state, alert: action.payload};
    case 'SET-SUBSCRIPTION':
      return {...state, subscription: action.payload};
    case 'SET-BROADCAST':
      return {...state, broadcast: action.payload};
    case 'SET-NOTES':
      return {...state, notes: action.payload};
    case 'SET-NOTIFICATIONS':
      return {...state, notifications: action.payload};
    case 'SET-RESOURCES':
      return {...state, resources: action.payload};
    default:
      throw new Error();
  }
}

const Global = createContext({});
const Dispatcher = createContext(({}) => {});

export function useGlobalState() {
  return useContext(Global);
}

export function useDispatcher() {
  return useContext(Dispatcher);
}

export const GlobalState = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Global.Provider value={state}>
      <Dispatcher.Provider value={dispatch}>{children}</Dispatcher.Provider>
    </Global.Provider>
  );
};
