import Sign from '@/modules/sign/Sign';
import SignIn from '@/modules/sign/SignIn';
import SignInSuccess from '@/modules/sign/SignInSuccess';


export const SIGN_ROUTES = {
  path: '/sign',
  component: Sign,
  redirect: { name: 'signIn' },
  children: [
    {
      path: 'in',
      name: 'signin',
      component: SignIn
    },
    {
      path: 'success',
      name: 'success',
      component: SignInSuccess
    }
  ]
};
