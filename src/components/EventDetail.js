import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import api from "../http-config"
import {Card, Divider} from "antd";
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined, EllipsisOutlined} from "@ant-design/icons";

function EventDetail(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({});
    const deleteEvent = (id) => {
        api.delete(`/Events/${id}`)
            .then(res => navigate("/"))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        api.get(`/Events/${params.id}`)
            .then(res => {
                console.log(res.data)
                setEvent(res.data)
            })
    }, []);


    const cardStyle = {
        marginTop: '7%',
        marginLeft: '20%',
        marginRight: '20%',
        width: '60%',
        marginBottom:'1%'
    }
    return (
        <>
            <Card
                name = {event.name}
                style={cardStyle}
                cover={
                    <img
                        src="https://i.dunya.com/2/1280/720/storage/files/images/2021/01/13/arcelik-jbvS_cover.jpg.webp"
                    />
                }
                actions={[
                    <DeleteOutlined key="setting" onClick={() => deleteEvent(event.id)}/>,
                    <EditOutlined key="edit"/>,
                ]}

            >
                <Meta
                    title= {event.title}
                    description={event.body}
                />
                <Divider />
                <p style={{textAlign:"center"}}>Etkinlik Başlangıç Tarihi : {event.startDate}</p>
                <p style={{textAlign:"center"}}>Etkinlik Bitiş Tarihi : {event.endDate}</p>
                <Divider />
            </Card>
        </>
    );
}

export default EventDetail;