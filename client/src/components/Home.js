import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Quiz - Home</title>
        </Helmet>
        <div id="home">
          <section style={{ marginTop: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <span className="mdi mdi-cube-outline cube"></span>
            </div>
            <h1>Quiz</h1>
            <div className="playButtonContainer">
              <ul>
                <li>
                  <Link className="playButton" to="/play/instructions">
                    Play
                  </Link>
                </li>
              </ul>
            </div>
            <div className="authContainer">
           
                <Link
                to="/register/admin"
                className="authButtons"
                id="signupButton">
                Signup as Register
              </Link>
        
              <Link to="/login/admin" className="authButtons" id="loginButton">
                Login as Admin
              </Link>
           
                <Link to="/login" className="authButtons" id="loginButton">
                Login as User
              </Link>
              <Link to="/register" className="authButtons" id="signupButton">
                Signup as User
              </Link>
           
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
