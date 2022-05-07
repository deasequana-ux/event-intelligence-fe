import React from 'react';
import {useEffect} from "react";
import {Card, Pagination} from "antd";
import Meta from "antd/es/card/Meta";
import {EditOutlined, EllipsisOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import {getEvents} from "../../slices/event-slice";
import {connect} from "react-redux";

function EventList({events, getEvents, isAuth, roleInfo}) {
    const navigate = useNavigate();
    const cardStyle = {
        marginTop: '7%',
        marginLeft: '5%',
        marginRight: '5%',
        width: '25%',
    }
    function handlePageRequest(page, pageSize) {
        getEvents({page:page-1,pageSize:pageSize});
    }


    useEffect(() => {
        getEvents({page:0,pageSize:10});
    }, [])
    return (
            <>
                {
                events.items && events.items.length > 0
                ?
                    events.items.map(event => (
                <Card
                    key={event.id}
                    hoverable={true}
                    style={cardStyle}
                    cover={
                        <img
                            alt={"arcelik"}
                            src="https://i.dunya.com/2/1280/720/storage/files/images/2021/01/13/arcelik-jbvS_cover.jpg.webp"
                        />
                    }
                    actions={
                            [
                                <EllipsisOutlined key="ellipsis" onClick={() => navigate(`/events/${event.id}`)}/>,
                                <EditOutlined key="edit" onClick={() => navigate(`/events/update/${event.id}`)}/>,
                            ]
                         }
                >
                    <Meta
                        title={event.title}
                        description={event.name}
                    />
                </Card>
                ))
                : null
                }
                <div style={{marginLeft: 100, whiteSpace: 'nowrap', marginTop: 100, marginRight: 100}}>

                    <Pagination defaultCurrent={1} total={events.count}
                                onChange={(page, pageSize) => handlePageRequest(page, pageSize)}/>
                </div>
            </>
    );
}
const mapStateToProps = (state) => {
    return {
        events: state.events,
        isAuth: state.auth.isAuth,
        roleInfo: state.auth.roleInfo,
    };
};

export default connect(mapStateToProps, { getEvents })(EventList);