import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import AppRouter from "./router/app-router";
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Provider store={store}>
            <AppRouter></AppRouter>
        </Provider>
    </>

);

