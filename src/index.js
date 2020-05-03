import React from "react";
import ReactDOM from "react-dom";

// styles are not included in the single components
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css";

import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));
