import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteQuestion } from '../../actions/quizActions';
import PropTypes from 'prop-types';

const Education = ({ question, index, deleteQuestion }) => {
  return (
    <Fragment>
      <table className="table">
        {index === 0 ? (
          <thead>
            <tr>
              <th>Question</th>
              <th className="hide-sm">Option 1</th>
              <th className="hide-sm">Option 2</th>
              <th className="hide-sm">Option 3</th>
              <th className="hide-sm">Option 4</th>
              <th className="hide-sm">Answer</th>
              <th />
              <th />
            </tr>
          </thead>
        ) : (
          ''
        )}

        <tbody>
          <tr>
            <td>{question.question}</td>
            <td>{question.optionA}</td>
            <td>{question.optionB}</td>
            <td>{question.optionC}</td>
            <td>{question.optionD}</td>
            <td>{question.answer}</td>
            <td>
              <Link
                to={`/dashboard/admin/edit/${question._id}`}
                className="btn btn-light">
                Edit Question
              </Link>
            </td>
            <td>
              <button
                onClick={() => deleteQuestion(question._id)}
                className="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  deleteQuestion: PropTypes.func.isRequired,
};

export default connect(null, { deleteQuestion })(Education);
