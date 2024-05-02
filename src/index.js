import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import App from "./App";
import store from "store.js";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "@google/model-viewer/dist/model-viewer.min.js";



const root = ReactDOM.createRoot(document.getElementById("root"));
TimeAgo.addDefaultLocale(en);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <App />
        </Provider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>
);
