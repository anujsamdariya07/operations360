import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout';
import {
  Customers,
  Dashboard,
  Employees,
  Home,
  Items,
  Orders,
} from './components';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='orders' element={<Orders />} />
      <Route path='customers' element={<Customers />} />
      <Route path='employees' element={<Employees />} />
      <Route path='items' element={<Items />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
