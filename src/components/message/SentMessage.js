import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getSentMessages} from "../../slices/message-slice";
import {Pagination, Table} from "antd";

function SentMessage({getSentMessages, id}) {
    const tableStyle = {
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
    }
    const [tableData, setTableData] = useState([])
    const data = []
    const [size, setSize] = useState(0);
    useEffect(() => {
        getSentMessages({page: 0, pageSize: 10, userId: id}).then(res => {
            res.payload.items.map(item => {
                data.push({
                    key:item.id,
                    title : item.title,
                    body : item.body,
                    email : item.receiverUser.email
                })
            })
            setTableData(data)
            setSize(res.payload.count)
        })
    }, [])

    function handlePageRequest(page, pageSize) {
        console.log(page, pageSize)
    }

    const columns = [
        {
            title: 'Receiver EMail',
            dataIndex: 'email',
            width: 250,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 100,
        },
        {
            title: 'Body',
            dataIndex: 'body',
        },
    ];
    return (
        <>
            <div style={tableStyle}>
                <Table columns={columns} dataSource={tableData} pagination={false} scroll={{y: 240}}/>
                <Pagination defaultCurrent={1} total={size}
                            onChange={(page, pageSize) => handlePageRequest(page, pageSize)}/>
            </div>

        </>

    );
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id
    };
};

export default connect(mapStateToProps, {getSentMessages})(SentMessage);