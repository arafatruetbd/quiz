import axios from 'axios';
import {
  LOAD_QUIZ,
  GET_ERRORS,
  SET_QUIZ_LOADING,
  END_FREE_QUIZ,
  CLEAR_QUIZ_STATS,
  NO_QUESTION_FOUND,
  EDIT_QUIZ,
} from '../actions/types';

export const fetchQuiz = () => (dispatch) => {
  axios
    .get('/api/quiz/all')
    .then((res) =>
      dispatch({
        type: LOAD_QUIZ,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: NO_QUESTION_FOUND,
      })
    );
};

export const getFreeQuestions = () => (dispatch) => {
  dispatch(setQuizLoading());
  axios
    .get('/api/quiz/getFreeQuiz')
    .then((res) =>
      dispatch({
        type: LOAD_QUIZ,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.error(err);
    });
};

export const addQuestion = (formData, history) => (dispatch) => {
  axios
    .post('/api/quiz/add', formData)
    .then((res) =>
      dispatch({
        type: LOAD_QUIZ,
        payload: res.data,
      })
    )
    .then(history.push('/dashboard/admin'))

    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getCurrentQuestion = (id) => (dispatch) => {
  axios
    .get(`/api/quiz/edit/${id}`)
    .then((res) =>
      dispatch({
        type: EDIT_QUIZ,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const postQuestion = (id, formData, history) => (dispatch) => {
  axios
    .post(`/api/quiz/edit/${id}`, formData)
    .then((res) =>
      dispatch({
        type: LOAD_QUIZ,
        payload: res.data,
      })
    )
    .then(history.push('/dashboard/admin'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteQuestion = (id) => (dispatch) => {
  axios
    .delete(`/api/quiz/${id}`)
    .then((res) =>
      dispatch({
        type: LOAD_QUIZ,
        payload: res.data,
      })
    )
    .catch(() =>
      dispatch({
        type: NO_QUESTION_FOUND,
      })
    );
};



export const updateRank = (quizRank) => (dispatch) => {
  console.log(quizRank);
  axios
    .post('/api/quiz/rank', quizRank)
    .then()
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const endFreeQuiz = (quizData, history) => (dispatch) => {
  dispatch({
    type: END_FREE_QUIZ,
    payload: quizData,
  });
  history.push('/play/quizSummary');
};

export const clearQuizStats = () => (dispatch) =>
  dispatch({
    type: CLEAR_QUIZ_STATS,
    payload: {},
  });

export const setQuizLoading = () => {
  return {
    type: SET_QUIZ_LOADING,
  };
};
