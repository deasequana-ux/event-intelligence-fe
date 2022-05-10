import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getSentMessages} from "../../slices/message-slice";
import {Pagination, Table, message} from "antd";
import {paginationStyle} from "../../utils/paginationStyle";
import {tableStyle} from "../../utils/tableStyle";
import {unwrapResult} from "@reduxjs/toolkit";
import {sentMessagePaginationSize} from "../../utils/paginationConfig";

function SentMessage({getSentMessages, id}) {
    const [tableData, setTableData] = useState([]);
    const data = [];
    const [size, setSize] = useState(0);

    const loadSentMessages = (page, pageSize) => {
        getSentMessages({page: page, pageSize: pageSize, userId: id})
            .then(unwrapResult)
            .then((res) => {
                res.items.forEach((item) => {
                    data.push({
                        key: item.id,
                        title: item.title,
                        body: item.body,
                        email: item.receiverUser.email,
                    });
                });
                setTableData(data);
                setSize(res.count);
            })
            .catch(() => message.error("Messages could not be get !"))
    }
    useEffect(() => {
        loadSentMessages(0,sentMessagePaginationSize);
    }, []);

    function handlePageRequest(page, pageSize) {
        loadSentMessages(page-1,pageSize);
    }

    const columns = [
        {
            title: "Receiver EMail",
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
                    pageSize={sentMessagePaginationSize}
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

export default connect(mapStateToProps, {getSentMessages})(SentMessage);
