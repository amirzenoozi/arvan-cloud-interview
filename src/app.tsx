import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { SplashScreen } from 'src/components/static/splash-screen/splash-screen';
import PrivateRoute from 'src/private-route';
import 'src/scss/toastify/ReactToastify.css';
import './helpers/translate-helper';
import { AppState } from './redux/store';
import { theme } from './theme';


// Main Route With Different Layout
const dashboardPage = lazy(() => import('./pages/dashboard'));
const notFoundPage = lazy(() => import('./pages/not-found'));
const loginPage = lazy(() => import('./pages/login'));
const registerPage = lazy(() => import('./pages/register'));

const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { direction, locale } = useSelector(
      (state: AppState) => ({
        direction: state.AppSetting.direction,
        token: state.User.token,
        locale: state.AppSetting.locale,
      })
  );

  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={createTheme(theme({ direction }))}>
        <CssBaseline />
        <Suspense fallback={<SplashScreen />}>
          <Switch>
            <Route exact path={`/404`} component={notFoundPage} />
            <Route exact path={`/login`} component={loginPage} />
            <Route exact path={`/register`} component={registerPage} />
            <PrivateRoute path={[ `/${locale}/`, '/' ]} component={dashboardPage}/>
          </Switch>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
