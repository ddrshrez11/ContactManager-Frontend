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
import ViewContact from "./Components/ViewContact";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div
        className="App"
        style={{
          backgroundImage:
            "url('https://www.womenbuildingaustralia.com.au/sites/default/files/images/Poly_BG_Grad%20%281%29_0_1.png')",
          height: "100vh",
          color: "white",
        }}
      >
        <BrowserRouter>
          <AppNavbar />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="dashboard/*" element={<Dashboard />}>
              <Route index element={<ContactList />} />
              <Route path="favourites" element={<ContactList type="fav" />} />
              <Route
                path="addContact"
                element={<ContactForm text="Add Contact" type="add" />}
              />
              <Route
                path="edit/:id"
                element={<ContactForm text="Edit Contact" type="edit" />}
              />
              <Route path="view/:id" element={<ViewContact />} />
            </Route>
            <Route path="login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
