import { Switch, Route } from 'react-router-dom';
import Register from '../components/register';
import UserInfo from '../components/userInfo';

function AuthRoute() {
  return (
    <Switch>
      {/* <Route path="/" component={Register} /> */}
      <Route path="/register" component={Register} />
      <Route path="/users/:uid" component={UserInfo} />
    </Switch>
  );
}

export default AuthRoute;
