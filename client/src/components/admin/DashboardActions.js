import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';

const DashboardActions = ({ logoutUser }) => {
  return (
    <div style={{ margin: '30px' }}>
      <Link
        to="/dashboard/admin/add"
        className="btn btn-light"
        style={{ marginLeft: '10px' }}>
        <i className="fab fa-black-tie text-primary" /> Add Question
      </Link>
      <button
        onClick={() => logoutUser()}
        style={{ margin: '30px' }}
        className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

DashboardActions.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(DashboardActions);
