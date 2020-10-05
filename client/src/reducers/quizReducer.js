import {
  CLEAR_QUIZ_STATS,
  LOAD_QUIZ,
  SET_QUIZ_LOADING,
  END_FREE_QUIZ,
  NO_QUESTION_FOUND,
  EDIT_QUIZ
} from '../actions/types';

const initialState = {
  questions: null,
  type: null,
  quizStats: {},
  numberOfQuestions: 0,
  loading: false,
  get:true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUIZ:
      return {
        ...state,
        questions: action.payload,
        numberOfQuestions: action.payload.length,
        loading: false,
        get:true
      };
      case EDIT_QUIZ:
      return {
        ...state,
        questions: action.payload,
        numberOfQuestions: action.payload.length,
        loading: false,
        get: false
      };

    case END_FREE_QUIZ:
      return {
        ...state,
        questions: null,
        type: null,
        quizStats: action.payload,
        numberOfQuestions: 0,
      };
    case NO_QUESTION_FOUND:
      return {
        ...state,
        questions: null,
        type: null,
        numberOfQuestions: 0,
      };

    case CLEAR_QUIZ_STATS:
      return {
        ...state,
        quizStats: action.payload,
      };

    case SET_QUIZ_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
