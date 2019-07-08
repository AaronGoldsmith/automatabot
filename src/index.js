import React, {useState} from "react";
import ReactDOM from "react-dom";
import rootReducer from "./reducers/rootReducer";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import GameController from "./components/GameController";
import "./Game.css";
function App() {
  const [running, setRunning] = useState(false)
  return (
    <div className="App">
      <GameController running={running} toggleRun={()=>setRunning(!running)} />
    </div>
  );
}
const rootElement = document.getElementById("root");
const storeWithThunk = createStore(
  rootReducer,
  {},
  applyMiddleware(ReduxThunk)
);
ReactDOM.render(
  <Provider store={storeWithThunk}>
    <App />
  </Provider>,
  rootElement
);
