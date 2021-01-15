/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getUser } from '../services/firebase';

interface MatchParams {
  uid: string;
}
interface Props extends RouteComponentProps<MatchParams> {}
interface States {
  userInfo: any;
  error: string;
}

// creating class component for practise
class UserInfo extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { userInfo: { firstName: '' }, error: '' };
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

export default UserInfo;
