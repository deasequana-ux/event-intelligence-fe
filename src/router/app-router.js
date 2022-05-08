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
import ReceivedMessage from "../components/message/ReceivedMessage";
import SentMessage from "../components/message/SentMessage";
import UserList from "../components/user/UserList";
import SendMessage from "../components/message/SendMessage";

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
                    <Route
                        path="/messages/received"
                        element={<RequireAuth><ReceivedMessage/></RequireAuth>}>
                    </Route>
                    <Route
                        path="/messages/sent"
                        element={<RequireAuth><SentMessage/></RequireAuth>}>
                    </Route>
                    <Route
                        path="/users"
                        element={<RequireAuth><UserList/></RequireAuth>}>
                    </Route>
                    <Route
                        path="/message/:id"
                        element={<RequireAuth><SendMessage/></RequireAuth>}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;