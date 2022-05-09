import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteUser, getUsers } from "../../slices/user-slice";
import { Popconfirm, Table, message } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import {paginationStyle} from "../../utils/paginationStyle";
import {tableStyle} from "../../utils/tableStyle";

function UserList({ getUsers, currentId, deleteUser }) {
  function confirm(id) {
    message.success("Kayıt başarıyla silindi...", id);
    console.log(id);
    deleteUser(id).then(() => {
      loadUsers();
    });
  }

  function cancel() {
    message.info("Kaydı silmekten vazgeçtiniz...");
  }

  const loadUsers = () => {
    getUsers({ page: 0, pageSize: 10 }).then((res) => {
      res.payload.items.map((item) => {
        data.push({
          key: item.id,
          name: item.name,
          surname: item.surname,
          email: item.email,
        });
      });
      setTableData(data);
      setSize(res.payload.count);
    });
  };

  const [tableData, setTableData] = useState([]);
  const data = [];
  const [size, setSize] = useState(0);
  useEffect(() => {
    /*getUsers({page: 0, pageSize: 10}).then(res => {
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
        })*/
    loadUsers();
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
          <Popconfirm
            title="Are you sure about these records?"
            onConfirm={() => confirm(record.key)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ marginRight: "10px" }} />
          </Popconfirm>
          <Link to={`/users/update/${record.key}`}>
            <EditOutlined style={{ marginRight: "10px" }} />
          </Link>
          <Link to={`/message/${record.key}`}>
            <MailOutlined />
          </Link>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table style={tableStyle} columns={columns} dataSource={tableData} pagination={false} />
      <div style={paginationStyle}>
        <Pagination 
          defaultCurrent={1}
          total={10}
          onChange={(page, pageSize) => getUsers(page, pageSize)}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    currentId: state.auth.id,
  };
};

export default connect(mapStateToProps, { getUsers, deleteUser })(UserList);
