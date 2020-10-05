import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/quizActions';

const AddQuestion = ({ addQuestion, history }) => {
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    answer: '',
  });

  const { question, optionA, optionB, optionC, optionD, answer } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="container">
        <h1>Add a Question</h1>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            addQuestion(formData, history);
          }}>
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

AddQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
};

export default connect(null, { addQuestion })(AddQuestion);
