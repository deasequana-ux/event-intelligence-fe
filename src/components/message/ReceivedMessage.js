import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getReceivedMessages} from "../../slices/message-slice";
import {Pagination, Table, message} from "antd";
import {paginationStyle} from "../../utils/paginationStyle";
import {tableStyle} from "../../utils/tableStyle";
import {unwrapResult} from "@reduxjs/toolkit";
import {receivedMessagePaginationSize} from "../../utils/paginationConfig";

function ReceivedMessage({getReceivedMessages, id}) {
    const [tableData, setTableData] = useState([]);
    const data = [];
    const [size, setSize] = useState(0);

    const loadReceivedMessage = (page, pageSize) => {
        getReceivedMessages({page: page, pageSize: pageSize, userId: id})
            .then(unwrapResult)
            .then((res) => {
                console.log(res)
                res.items.map((item) => {
                    data.push({
                        key: item.id,
                        title: item.title,
                        body: item.body,
                        email: item.senderUser.email,
                    });
                });
                setTableData(data);
                setSize(res.count);
            })
            .catch(() => message.error("Messages could not be get !"))

    }
    useEffect(() => {
        loadReceivedMessage(0,receivedMessagePaginationSize)
    }, []);

    function handlePageRequest(page, pageSize) {
        console.log(page,pageSize)
        loadReceivedMessage(page-1,pageSize)
    }

    const columns = [
        {
            title: "Sender EMail",
            dataIndex: "email",
            width: 250,
        },
        {
            title: "Title",
            dataIndex: "title",
            width: 100,
        },
        {
            title: "Body",
            dataIndex: "body",
        },
    ];
    return (
        <div>
            <Table
                style={tableStyle}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                scroll={{y: 240}}
            />
            <div style={paginationStyle}>
                <Pagination
                    defaultCurrent={1}
                    total={size}
                    showSizeChanger={false}
                    pageSize={receivedMessagePaginationSize}
                    onChange={(page, pageSize) => handlePageRequest(page, pageSize)}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
    };
};

export default connect(mapStateToProps, {getReceivedMessages})(
    ReceivedMessage
);
