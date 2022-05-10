import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {deleteUser, getUsers} from "../../slices/user-slice";
import {Popconfirm, Table, message} from "antd";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined, MailOutlined} from "@ant-design/icons";
import {Pagination} from "antd";
import {tableStyle} from "../../utils/tableStyle";
import {unwrapResult} from "@reduxjs/toolkit";
import {manager} from "../../utils/rolesDefinition";
import {userListPaginationSize} from "../../utils/paginationConfig";

function UserList({getUsers, deleteUser, roleInfo}) {
    const [tableData, setTableData] = useState([]);
    const data = [];
    const [size, setSize] = useState(0);

    function handlePageRequest(page, pageSize) {
        loadUsers(page-1,pageSize)
    }

    function confirm(id) {
        deleteUser(id)
            .then(unwrapResult)
            .then(() => {
                message.success("The user could be deleted successfully").then()
                loadUsers(0,userListPaginationSize);
            })
            .catch(() => message.error("The user could not delete !"))
    }

    const loadUsers = (page, pageSize) => {
        getUsers({page: page, pageSize: pageSize})
            .then(unwrapResult)
            .then((res) => {
                res.items.map((item) => {
                    data.push({
                        key: item.id,
                        name: item.name,
                        surname: item.surname,
                        email: item.email,
                    });
                });
                setTableData(data);
                setSize(res.count);
            })
            .catch(() => {
                message.error("Users can not get !").then()
            })
    };


    useEffect(() => {
        loadUsers(0,userListPaginationSize);
    }, []);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Surname",
            dataIndex: "surname",
            key: "age",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Operations",
            key: "operation",
            fixed: "right",
            width: 200,
            render: (text, record) => (
                <>
                    {
                        roleInfo === manager
                            ? <>
                                <Popconfirm
                                    title="Are you sure delete the user ?"
                                    onConfirm={() => confirm(record.key)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteOutlined style={{marginRight: "10px"}}/>
                                </Popconfirm>
                                <Link to={`/users/update/${record.key}`}>
                                    <EditOutlined style={{marginRight: "10px"}}/>
                                </Link>
                            </>
                            :
                            null
                    }
                    <Link to={`/message/${record.key}`}>
                        <MailOutlined/>
                    </Link>
                </>
            ),
        },
    ];
    return (
        <div>
            <Table style={tableStyle} columns={columns} dataSource={tableData} pagination={false}/>
            <div style={{ position: "absolute", top: "430px", right: "30px"}}>
                <Pagination
                    defaultCurrent={1}
                    pageSize={userListPaginationSize}
                    total={size}
                    showSizeChanger={false}
                    onChange={(page, pageSize) => handlePageRequest(page, pageSize)}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        currentId: state.auth.id,
        roleInfo: state.auth.roleInfo
    };
};

export default connect(mapStateToProps, {getUsers, deleteUser})(UserList);
