import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import {
  CustomerPage,
  Customers,
  Dashboard,
  EmployeePage,
  Employees,
  Home,
  ItemPage,
  Items,
  NewCustomer,
  NewEmployee,
  NewItem,
  NewOrder,
  OrderPage,
  Orders,
  SignIn,
  SignUp,
  Vendors,
  NewVendor,
  VendorDetails,
} from './components';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isCheckingAuth && !authUser) {
    // if (true) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );
  }
  console.log('authUser:', authUser);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={authUser ? <Home /> : <Navigate to={'/sign-in'} />} />
        <Route
          path='sign-in'
          element={!authUser ? <SignIn /> : <Navigate to={'/dashboard'} />}
        />
        <Route
          path='sign-up'
          element={!authUser ? <SignUp /> : <Navigate to={'/dashboard'} />}
        />
        <Route
          path='dashboard'
          element={authUser ? <Dashboard /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='orders'
          element={authUser ? <Orders /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='orders/:orderId'
          element={authUser ? <OrderPage /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='orders/new'
          element={authUser ? <NewOrder /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='customers'
          element={authUser ? <Customers /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='customers/:customerId'
          element={authUser ? <CustomerPage /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='customers/new'
          element={authUser ? <NewCustomer /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='employees'
          element={authUser ? <Employees /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='employees/:employeeId'
          element={authUser ? <EmployeePage /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='employees/new'
          element={authUser ? <NewEmployee /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='items'
          element={authUser ? <Items /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='items/:itemId'
          element={authUser ? <ItemPage /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='items/new'
          element={authUser ? <NewItem /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='vendors'
          element={authUser ? <Vendors /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='vendors/new'
          element={authUser ? <NewVendor /> : <Navigate to={'/sign-in'} />}
        />
        <Route
          path='vendors/:vendorId'
          element={authUser ? <VendorDetails /> : <Navigate to={'/sign-in'} />}
        />
      </Route>
      

    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-center'/>
    </>
  );
}

export default App;
