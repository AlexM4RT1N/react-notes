import { CHANGE_VALUES_NOTE, CHANGE_OPENNESS_FORM } from './types';

const initialState = {
  values: { 
    title: '', 
    content: '',
  },
  isOpen: false,  
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VALUES_NOTE:
      return { ...state, values: action.payload };
    case CHANGE_OPENNESS_FORM:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};

export default formReducer;