import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postQuestion ,getCurrentQuestion } from '../../actions/quizActions';


const initialState = {
  question: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  answer: ''
};

const EditQuestion = ({
  quiz: { questions, loading,get },
  getCurrentQuestion,
  postQuestion,
  match,
  history
}) => {
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    if (questions && get ) getCurrentQuestion(match.params.id);
    if (!loading && questions && !get) {
      const questionData = { ...initialState };
      for (const key in questions) {
        if (key in questionData) questionData[key] = questions[key];
      }
      setFormData(questionData);
    }
  }, [loading, getCurrentQuestion, questions,get,  match.params.id,]);

  const {
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  answer
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    postQuestion(questions._id, formData, history);
  };


  return (
    <Fragment>
    <div className="container">
      <h1>Edit Question</h1>
      <form
        className="form"
        onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Question"
            name="question"
            value={question}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Option 1"
            name="optionA"
            value={optionA}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Option 2"
            name="optionB"
            value={optionB}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Option 3"
            name="optionC"
            value={optionC}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Option 4"
            name="optionD"
            value={optionD}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Answer"
            name="answer"
            value={answer}
            onChange={onChange}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link
          className="btn btn-light my-1"
          to="/dashboard/admin"
          style={{ marginLeft: '10px' }}>
          Go Back
        </Link>
      </form>
    </div>
  </Fragment>
  );
};

EditQuestion.propTypes = {
  postQuestion: PropTypes.func.isRequired,
  getCurrentQuestion: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default connect(mapStateToProps, {  getCurrentQuestion, postQuestion })(
  EditQuestion
);
