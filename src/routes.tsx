import MainPage from './MainPage';
import All from './All';
import Concerts from './Concerts'
import Festivals from './Festivals';
import Login from './Login';
import Sports from './Sports';
import Theatre from './Theatre';

export const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/All",
    element: <All />,
  },
  {
    path: "/Concerts",
    element: <Concerts />,
  },
  {
    path: "/Festivals",
    element: <Festivals />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Sports",
    element: <Sports />,
  },
  {
    path: "/Theatre",
    element: <Theatre />,
  }
];