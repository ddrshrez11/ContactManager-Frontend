import "./App.css";
import AppNavbar from "./Components/AppNavbar";
import ContactList from "./Components/ContactList";

import { Provider } from "react-redux";
import store from "./store";

function App() {
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
