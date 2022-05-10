import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {Avatar, Card, Comment, Divider, Input, message} from "antd";
import Meta from "antd/es/card/Meta";
import {
    DeleteOutlined,
    EditOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons";
import {connect} from "react-redux";
import {
    deleteEvent,
    getAssignedUsers,
    getCommentsByEventId,
} from "../../slices/event-slice";
import {commentToEvent} from "../../slices/event-slice";
import {admin, manager} from "../../utils/rolesDefinition";
import {Pagination} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {commentsPaginationSize} from "../../utils/paginationConfig";

function EventDetail({
                         deleteEvent,
                         getCommentsByEventId,
                         getAssignedUsers,
                         roleInfo,
                         id,
                         commentToEvent,
                         events
                     }) {
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({});
    const [participants, setParticipants] = useState([]);
    const [isNotOkToComment, setIsNotOkToComment] = useState(true);
    const [comments, setComments] = useState({
        count: 0,
        pages: 0,
        items: [],
    });
    const getParticipantsById = (id) => {
        if (participants.find((x) => x.userId === id) !== undefined)
            return participants.find((x) => x.userId === id);
    };

    const getEventByIdFromState = (id) => {
        return events.items.find(x => x.id === Number(id))
    }

    const loadComments = (page, pageSize) => {
        getCommentsByEventId({page: page, pageSize: pageSize, id: params.id})
            .then(unwrapResult)
            .then((res) => {
                    setComments(res);
                }
            )
            .catch(() => message.error("Comments could not get !"))
    }

    useEffect(() => {
        setEvent(getEventByIdFromState(params.id))
        loadComments(0, commentsPaginationSize);
        getAssignedUsers(params.id).then((res) => {
            setParticipants(res.payload);
            res.payload.forEach((x) => {
                if (x.userId === Number(id)) {
                    setIsNotOkToComment(false);
                }
            });
        });
    }, []);

    const deleteHandle = (id) => {
        deleteEvent(id)
            .then(unwrapResult)
            .then(() => {
                message.success("The event could be deleted successfully").then()
                navigate("/events")
            })
            .catch(() => message.error("The event could not delete !"))
    };

    const cardStyle = {
        marginTop: "7%",
        marginLeft: "20%",
        marginRight: "20%",
        width: "60%",
        marginBottom: "1%",
    };

    const onPressEnterToComment = (e) => {
        const payload = {
            body: e.target.value,
            userId: Number(id),
            eventId: Number(params.id),
        };
        commentToEvent(payload)
            .then(unwrapResult)
            .then(() => {
                message.success("Your comment has been pushed successfully").then()
                loadComments(0, commentsPaginationSize);
            })
            .catch(() => message.success("Your comment has not been pushed !"))
    };

    function handlePageRequest(page, pageSize) {
        loadComments(page - 1, pageSize);
    }

    return (
        <>
            <Card
                name={event.name}
                style={cardStyle}
                cover={
                    <img
                        alt={"arcelik"}
                        src="https://i.dunya.com/2/1280/720/storage/files/images/2021/01/13/arcelik-jbvS_cover.jpg.webp"/>
                }
                actions={[
                    roleInfo === admin ? (
                        <div>
                            <DeleteOutlined
                                style={{marginRight: "10%"}}
                                key="setting"
                                onClick={() => deleteHandle(event.id)}
                            />
                            <EditOutlined
                                key="edit"
                                onClick={() => navigate(`/events/update/${event.id}`)}
                            />
                        </div>
                    ) : roleInfo === manager ? (
                        <UserSwitchOutlined
                            key="edit"
                            onClick={() => navigate(`/events/${event.id}/assign`)}
                        />
                    ) : null,
                ]}
            >
                <Meta title={event.title} description={event.name}/>
                <Divider/>
                <p>{event.body}</p>
                <Divider/>
                <p style={{textAlign: "center"}}>
                    Event Start Date : {event.startDate}
                </p>
                <p style={{textAlign: "center"}}>
                    Event End Date : {event.endDate}
                </p>
                <Divider/>
                <p style={{textAlign: "center"}}>
                    Note : You have to be assigned the event to comment
                </p>
                <Input
                    placeholder="your comment..."
                    disabled={isNotOkToComment}
                    onPressEnter={(e) => onPressEnterToComment(e)}
                />
                <div style={{ marginBottom:"15px"}}>
                {comments.items.map((comment) => (
                    <Comment
                        key={comment.id}
                        author={
                            <a>
                                {getParticipantsById(comment.userId)?.name}{" "}
                                {getParticipantsById(comment.userId)?.surname}
                            </a>
                        }
                        avatar={
                            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>
                        }
                        content={<p>{comment.body}</p>}
                    />
                ))}
                <div style={{ position: "absolute",right:"20px",bottom:"50px"}}>
                    <Pagination
                        defaultCurrent={1}
                        pageSize={commentsPaginationSize}
                        total={comments.count}
                        showSizeChanger={false}
                        onChange={(page, pageSize) => handlePageRequest(page, pageSize)}
                    />
                </div>
                </div>
                
            </Card>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        roleInfo: state.auth.roleInfo,
        events: state.events
    };
};
export default connect(mapStateToProps, {
    commentToEvent,
    deleteEvent,
    getCommentsByEventId,
    getAssignedUsers,
})(EventDetail);
