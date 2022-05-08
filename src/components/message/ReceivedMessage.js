import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getReceivedMessages} from "../../slices/message-slice";
import {Pagination, Table} from "antd";

function ReceivedMessage({getReceivedMessages, id}) {
    const tableStyle= {
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
    }
    const [tableData, setTableData] = useState([])
    const data = []
    const [size, setSize] = useState(0);
    useEffect(() => {
        getReceivedMessages({page:0,pageSize:10, userId:id}).then(res => {
            res.payload.items.map(item => {
                data.push({
                    key:item.id,
                    title : item.title,
                    body : item.body,
                    email : item.senderUser.email
                })
            })
            setTableData(data)
            setSize(res.payload.count)
        })
    },[])
    function handlePageRequest(page, pageSize) {
       console.log(page,pageSize)
    }
    const columns = [
        {
            title: 'Sender EMail',
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
                <Table  columns={columns} dataSource={tableData} pagination={false} scroll={{ y: 240 }} />
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

export default connect(mapStateToProps, { getReceivedMessages })(ReceivedMessage);