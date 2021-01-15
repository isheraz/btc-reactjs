/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/firebase';

// creating class component for practise
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    getUser(params.uid)
      .then((userInfo) => {
        this.setState({ userInfo });
        console.log(userInfo);
      })
      .catch((err) => {
        this.setState({ error: err.toString() });
      });
  }

  render() {
    const { userInfo, error } = this.state;
    return userInfo ? (
      <h2>Hi, Welcome {userInfo.firstName}!</h2>
    ) : (
      <h2>{error}</h2>
    );
  }
}

// props types validations
UserInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UserInfo;
