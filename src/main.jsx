import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { BrowserRouter } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Stepper from './components/Stepper/Stepper.jsx';
import UpdatePost from './pages/Update.jsx';
import { Provider } from "react-redux";
import {store , persistor} from "./store/store.js";
import BisunessDomain from './pages/BisunessDomain.jsx';
import Form from './components/Bisuness-DomainEntity/Form.jsx';
import UpdateBusiness from './pages/UpdateBusiness.jsx';
import DatabaseService from './pages/DatabaseService.jsx';
import Home from './pages/Home.jsx';
import ViewTables from './pages/ViewTables.jsx';
import ViewColomns from './pages/ViewColomns.jsx';
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/view/:id",
        element: <ViewTables />,
      },
      {
        path: "/view/:id/colomns/:item",
        element: <ViewColomns />,
      },
      {
        path: "/database-service",
        element: <DatabaseService />,
      },
      {
        path: "/post",
        element: <Stepper />,
      },
      {
        path: "/update-post/:id",
        element: <UpdatePost />,
      },
      {
        path: "/business-glossary",
        element: <BisunessDomain />,
      },
      {
        path: "/business-glossary/post",
        element: <Form />,
      },
      {
        path: "/business-glossary/update/:id",
        element: <UpdateBusiness />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
