import React from 'react';
import {useEffect} from "react";
import {Card, Pagination, message} from "antd";
import Meta from "antd/es/card/Meta";
import {useNavigate} from "react-router";
import {getEvents} from "../../slices/event-slice";
import {connect} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import './style.css';
import {eventListPaginationSize} from "../../utils/paginationConfig";

function EventList({events, getEvents}) {
    const navigate = useNavigate();

    function handlePageRequest(page, pageSize) {
        loadEvents(page-1, pageSize)
    }
    const loadEvents = (page, pageSize) => {
        getEvents({page: page, pageSize: pageSize})
            .then(unwrapResult)
            .catch(() => message.error("Events can not get from server !"))
    }
    useEffect(() => {
        loadEvents(0,eventListPaginationSize)
    }, [])
    return (
        <div className='mainDiv'>
            <div className='cardDiv'>
                {
                    events.items && events.items.length > 0
                        ?
                        events.items.map(event => (
                            <Card className='cardStyle'
                                  key={event.id}
                                  hoverable={true}
                                  onClick={() => navigate(`/events/${event.id}`)}
                                  cover={
                                      <img
                                          alt={"arcelik"}
                                          src="https://i.dunya.com/2/1280/720/storage/files/images/2021/01/13/arcelik-jbvS_cover.jpg.webp"
                                      />
                                  }
                                /*actions={
                                        [
                                            <EllipsisOutlined key="ellipsis" onClick={() => navigate(`/events/${event.id}`)}/>,
                                            <EditOutlined key="edit" onClick={() => navigate(`/events/update/${event.id}`)}/>,
                                        ]
                                     }*/
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
            <div className='pagination'>

                <Pagination defaultCurrent={1} t
                            total={events.count}
                            pageSize={eventListPaginationSize}
                            showSizeChanger={false}
                            onChange={(page, pageSize) => handlePageRequest(page, pageSize)}/>
            </div>
            <div/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
        isAuth: state.auth.isAuth,
        roleInfo: state.auth.roleInfo,
    };
};

export default connect(mapStateToProps, {getEvents})(EventList);