import EventList from "./components/EventList";
import {Route, Routes} from "react-router";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";

function App() {
    return (
        <Routes>
            <Route path="/" element={<EventList/>}></Route>
            <Route path="/events/:id" element={<EventDetail/>}></Route>
            <Route path="/events/create" element={<CreateEvent/>}></Route>
        </Routes>
    );
}

export default App;
