import React from "react";
import ReactDOM from "react-dom";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import GameController from "./components/GameController";
import "./Game.css";
function App() {
  return (
    <div className="App">
      <GameController />
    </div>
  );
}
const rootElement = document.getElementById("root");
const storeWithThunk = createStore(rootReducer, applyMiddleware(ReduxThunk));
ReactDOM.render(
  <Provider store={storeWithThunk}> <App /> </Provider>,
  rootElement
);
