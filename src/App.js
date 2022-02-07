import "./App.css";
import { useEffect } from "react";
import AppNavbar from "./Components/AppNavbar";
import ContactList from "./Components/ContactList";
import { loadUser } from "./Actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />

        <ContactList />
      </div>
    </Provider>
  );
}

export default App;
