import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getUsers} from "../../slices/user-slice";
import {Popconfirm, Table, message} from "antd";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined, MailOutlined} from "@ant-design/icons";

function UserList({getUsers,currentId}) {
    const tableStyle = {
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
    }

    function confirm(id) {
        message.success('Kayıt başarıyla silindi...');

    }

    function cancel() {
        message.info('Kaydı silmekten vazgeçtiniz...');
    }

    const [tableData, setTableData] = useState([])
    const data = []
    const [size, setSize] = useState(0);
    useEffect(() => {
        getUsers({page: 0, pageSize: 10}).then(res => {
            res.payload.items.map(item => {
                data.push({
                    key: item.id,
                    name: item.name,
                    surname: item.surname,
                    email: item.email
                })
            })
            setTableData(data)
            setSize(res.payload.count)
        })
    }, [])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'İşlemler',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (text, record) => <>
                <Popconfirm
                    title="Bu kaydı silmek istediğinizden emin misiniz ?"
                    onConfirm={() => confirm(record.id)}
                    onCancel={cancel}
                    okText="Evet"
                    cancelText="Hayır"
                >
                    <DeleteOutlined style={{marginRight: '10px'}}/>
                </Popconfirm>
                <Link to={`/user/${record.id}`}><EditOutlined style={{marginRight: '10px'}}/></Link>
                <Link to={`/message/${record.key}`}><MailOutlined/></Link>


            </>,
        },
    ];
    return (
        <Table style={tableStyle} columns={columns} dataSource={tableData}/>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentId: state.auth.id,
    };
};

export default connect(mapStateToProps, {getUsers})(UserList);