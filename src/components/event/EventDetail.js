import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {Avatar, Card, Comment, Divider, Input} from "antd";
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined, UserOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {deleteEvent, getAssignedUsers, getCommentsByEventId, getEventById} from "../../slices/event-slice";
import {commentToEvent} from "../../slices/event-slice";
import {admin, manager} from "../../utils/rolesDefinition";

function EventDetail({
                         getEventById,
                         deleteEvent,
                         getCommentsByEventId,
                         getAssignedUsers,
                         roleInfo,
                         id,
                         commentToEvent
                     }) {
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({});
    const [participants, setParticipants] = useState([]);
    const [isNotOkToComment, setIsNotOkToComment] = useState(true);
    const [comments, setComments] = useState({
        count: 0,
        pages: 0,
        items: []
    });
    const getParticipantsById = (id) => {
        if (participants.find(x => x.userId == id) !== undefined)
            return participants.find(x => x.userId == id)
    }

    useEffect(() => {
        getEventById(params.id).then(res => {
            setEvent(res.payload)
        })
        getCommentsByEventId({page: 0, pageSize: 5, id: params.id}).then(res => {
            setComments(res.payload)
        })
        getAssignedUsers(params.id).then(res => {
            console.log("participants : ", res.payload)
            setParticipants(res.payload);
            res.payload.map(x => {
                if (x.userId === Number(id)) {
                    setIsNotOkToComment(false)
                }
            })
        })
        console.log(roleInfo)
    }, []);
    const deleteHandle = (id) => {
        console.log(id)
        deleteEvent(id).then(res => navigate("/events"))
    }

    const cardStyle = {
        marginTop: '7%',
        marginLeft: '20%',
        marginRight: '20%',
        width: '60%',
        marginBottom: '1%'
    }

    const onPressEnterToComment = (e) => {
        const payload = {
            body: e.target.value,
            userId: Number(id),
            eventId: Number(params.id)
        }
        e.target.value = ""
        commentToEvent(payload)
    }

    return (
        <>
            <h1>{false}</h1>
            <Card
                name={event.name}
                style={cardStyle}
                cover={
                    <img
                        src="https://i.dunya.com/2/1280/720/storage/files/images/2021/01/13/arcelik-jbvS_cover.jpg.webp"
                    />
                }
                actions={[
                    roleInfo === admin
                        ?
                        (
                            <div>
                                <DeleteOutlined style={{marginRight:'10%'}} key="setting" onClick={() => deleteHandle(event.id)}/>
                                <EditOutlined key="edit" onClick={() => navigate(`/events/update/${event.id}`)}/>
                            </div>
                        )
                        :
                    roleInfo === manager
                        ?
                        (
                            <UserSwitchOutlined key="edit" onClick={() => navigate(`/events/${event.id}/assign`)}/>
                        )
                        : null
                ]}

            >
                <Meta
                    title={event.title}
                    description={event.body}
                />
                <Divider/>
                <p style={{textAlign: "center"}}>Etkinlik Başlangıç Tarihi : {event.startDate}</p>
                <p style={{textAlign: "center"}}>Etkinlik Bitiş Tarihi : {event.endDate}</p>
                <Divider/>
                <p style={{textAlign: 'center'}}>Note : You have to be assigned the event to comment</p>
                <Input placeholder="your comment..." disabled={isNotOkToComment}
                       onPressEnter={(e) => onPressEnterToComment(e)}/>
                {
                    comments.items.map(comment =>
                        (<Comment
                            key={comment.id}
                            author={
                                <a>{getParticipantsById(comment.userId)?.name} {getParticipantsById(comment.userId)?.surname}</a>}
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                            content={
                                <p>
                                    {comment.body}
                                </p>
                            }
                        />)
                    )
                }

            </Card>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        roleInfo: state.auth.roleInfo
    };
};
export default connect(mapStateToProps, {
    commentToEvent,
    getEventById,
    deleteEvent,
    getCommentsByEventId,
    getAssignedUsers
})(EventDetail);