import { Suspense } from 'react';

//Components;
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import {useStateValue} from '../StateProvider/StateProvider'

function App() {
  const [{user}, dispatch] = useStateValue();
  console.log(`Current User is >>>>`, user);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Switch>
        <Route path='/' exact>
          {user ? <LandingPage /> : <Redirect to = '/login' />}
        </Route>
        <Route path='/login'>
          {user ? <Redirect to = '/' /> : <LoginPage />}
        </Route>
        <Route path='/register'>
          {user ? <Redirect to = '/' /> : <RegisterPage />}
        </Route>
        <Route path="*">
          <Redirect to = '/' />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
