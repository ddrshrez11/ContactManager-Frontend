import "./App.css";
import { useEffect } from "react";
import ContactList from "./Components/ContactList";
import { loadUser } from "./Actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Landing from "./Components/Landing";
import AppNavbar from "./Components/AppNavbar";
import SignIn from "./Components/SignIn";
import ContactForm from "./Components/ContactForm";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <AppNavbar />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<ContactList />} />
              <Route
                path="addContact"
                element={<ContactForm text="Add Contact" type="add" />}
              />
              <Route
                path="edit/:id"
                element={<ContactForm text="Edit Contact" type="edit" />}
              />
            </Route>
            <Route path="login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
