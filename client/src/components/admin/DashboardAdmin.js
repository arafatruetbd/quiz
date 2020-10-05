import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../actions/quizActions';
import Question from './Question';
import DashboardActions from './DashboardActions';
import Loader from '../common/Loader';


const DashboardAdmin = ({
  fetchQuiz,
  quiz: { questions, loading, numberOfQuestions },
}) => {
  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  return (
    <Fragment>
      {loading === 0 ? (
        <Loader/>
      ) : (
        <Fragment>
          <DashboardActions />
          <h1 className="lead" style={{ textAlign: 'center' }}>
            <i /> Set and Edit Question
          </h1>
          <div className="container">
            {numberOfQuestions > 0 ? (
              questions.map((question,index) => (
                <Question key={question._id} question={question} index={index}/>
              ))
            ) : (
              <h1 style={{textAlign:'center'}}>No Question Found</h1>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

DashboardAdmin.propTypes = {
  fetchQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  quiz: state.quiz,
});

export default connect(mapStateToProps, { fetchQuiz })(DashboardAdmin);
