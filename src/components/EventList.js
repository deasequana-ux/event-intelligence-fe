import React from 'react';
import api from "../http-config"
import {useEffect, useState} from "react";
import {Avatar, Button, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

function EventList(props) {
    const navigate = useNavigate();
    const [eventList, setEventList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const cardStyle = {
        marginTop: '7%',
        marginLeft: '5%',
        marginRight: '5%',
        width: '25%',
    }

    const updateEvent = (id) => {
        api.update(`/Events/${id}`)
            .then(res => navigate("/"))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        api.get("/Events").then(res => {
            setEventList(res.data.items)
            console.log(res.data.items);
        })
    }, [])
    return (
        <div className="App">

                <div>
                    <Button onClick={() => navigate("/events/create")}>Event Ekle</Button>
                    {
                    eventList && eventList.length > 0
                    ?
                    eventList.map(event => (
                    <Card
                        key={event.id}
                        hoverable={true}
                        style={cardStyle}
                        cover={
                            <img
                                src="https://i.dunya.com/2/1280/720/storage/files/images/2021/01/13/arcelik-jbvS_cover.jpg.webp"
                            />
                        }
                        actions={[
                            <EllipsisOutlined key="ellipsis" onClick={() => navigate(`/events/${event.id}`)}/>,
                            <EditOutlined key="edit" onClick={() => navigate(`/events/update/${event.id}`)}/>,
                        ]}
                    >
                        <Meta
                            title={event.title}
                            description={event.name}
                        />
                    </Card>
                    ))
                    : null
                    }
                </div>



        </div>
    );
}

export default EventList;