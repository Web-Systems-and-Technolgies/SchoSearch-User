import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
const rootContainer = document.getElementById("root");
ReactDOM.createRoot(rootContainer).render(<App />);
