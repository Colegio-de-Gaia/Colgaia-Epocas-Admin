import React from "react";
import Routes from "./routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Call it once in your app. At the root of your app is the best place
toast.configure();

const App = () => <Routes />;

export default App;
