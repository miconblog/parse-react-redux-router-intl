import mainLayout         from './pages/Layout/MainLayout';
import StartPage          from './pages/Start/StartPage';
import SigninPage         from './pages/Account/Signin/SigninPage';
import SignupPage         from './pages/Account/Signup/SignupPage';
import ResetPasswordPage  from './pages/Account/Reset/ResetPasswordPage';
import NotFound           from './pages/End/NotFound';

export const routes = [
  {
    path: '/',
    component: mainLayout,
    indexRoute:  { component: StartPage },
    childRoutes: [
      { path: 'signin', component: SigninPage },
      { path: 'signup', component: SignupPage },
      { path: 'reset-password', component: ResetPasswordPage },
      { path: 'main', component: StartPage }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
];
