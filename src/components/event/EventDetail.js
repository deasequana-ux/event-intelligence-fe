import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Card, Divider} from "antd";
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {deleteEvent, getEventById} from "../../slices/event-slice";

function EventDetail({getEventById, deleteEvent, roleInfo}) {
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        getEventById(params.id).then(res => {
            setEvent(res.payload)
        })
        console.log(roleInfo)
    }, []);
    const deleteHandle = (id) => {
        deleteEvent(id).then(res => navigate("/events"))
    }

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
                    <DeleteOutlined key="setting" onClick={() => deleteHandle(event.id)}/>,
                    <EditOutlined key="edit" onClick={() => navigate(`/events/update/${event.id}`)}/>,
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

const mapStateToProps = (state) => {
    return {
        roleInfo: state.auth.roleInfo,
    };
};
export default connect(mapStateToProps, {getEventById, deleteEvent})(EventDetail);