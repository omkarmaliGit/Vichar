import "./App.css";
import Body from "./pages/Body";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ErrorBoundary from "./utils/ErrorBoundary";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  let persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ErrorBoundary>
              <Body />
            </ErrorBoundary>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
