import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Login from "../components/authentication/Login";
import EventList from "../components/event/EventList";
import Navbar from "../components/navbar/Navbar";
import CreateEvent from "../components/event/CreateEvent";
import UpdateEvent from "../components/event/UpdateEvent";
import EventDetail from "../components/event/EventDetail";
import RequireAuth from "../utils/require-auth";
import Landing from "../components/landing/Landing";

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/login"
                           element={<Login></Login>}>
                    </Route>
                    <Route path="/"
                           element={<Landing></Landing>}>
                    </Route>
                    <Route
                        path="/events"
                        element={<RequireAuth><EventList/></RequireAuth>}>
                    </Route>
                    <Route
                        path="/events/create"
                        element={<RequireAuth><CreateEvent/></RequireAuth>}>
                    </Route>
                    <Route
                        path="/events/update/:id"
                        element={<RequireAuth><UpdateEvent/></RequireAuth>}>
                    </Route>
                    <Route
                        path="/events/:id"
                        element={<RequireAuth><EventDetail/></RequireAuth>}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;