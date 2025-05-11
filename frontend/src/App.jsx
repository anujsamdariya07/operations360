import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import {
  Customers,
  Dashboard,
  Employees,
  Home,
  Items,
  OrderPage,
  Orders,
  SignIn,
  SignUp,
} from './components';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route
          path='sign-in'
          element={!authUser ? <SignIn /> : <Navigate to={'/'} />}
        />
        <Route
          path='sign-up'
          element={!authUser ? <SignUp /> : <Navigate to={'/'} />}
        />
        <Route
          path='dashboard'
          element={!authUser ? <Dashboard /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='orders'
          element={!authUser ? <Orders /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='orders/:orderId'
          // element={!authUser ? <OrderPage /> : <Navigate to={'/sign-in'} />}
          element={<OrderPage />}
        />
        <Route
          path='customers'
          element={!authUser ? <Customers /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='employees'
          element={!authUser ? <Employees /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='items'
          element={!authUser ? <Items /> : <Navigate to={'/sign-in'} />}
        />
      </Route>
    )
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
