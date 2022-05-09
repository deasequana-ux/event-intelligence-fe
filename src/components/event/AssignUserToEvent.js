import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {assignUsersAction, getCandidateUsersToAssign} from "../../slices/event-slice";
import {Button, Checkbox, Form, Table} from "antd";
import {useNavigate, useParams} from "react-router";

function AssignUserToEvent({getCandidateUsersToAssign, assignUsersAction}) {
    const params = useParams();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        getCandidateUsersToAssign(params.id).then(res => {
            res.payload.map(x => {
                data.push({
                    key:x.userId,
                    name:x.name,
                    surname:x.surname,
                    email:x.email,
                    eventId:x.eventId,
                    userId:x.userId,
                    isExist:x.isExist
                })
                setTableData(data);
            })
        })
    },[])
    function onChange(e,record) {
        let index = tableData.findIndex((data) => data.userId === record.userId);
        tableData[index] = {
            ...tableData[index],
            isExist:e.target.checked,
        };
        tableData.map(x => delete x.key)
        setTableData(tableData);
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (text, record) => <>
                <Checkbox style={{marginLeft:'50%'}} defaultChecked={record.isExist} onChange={(e) =>onChange(e,record)}></Checkbox>
            </>,
        },
    ];

    const onFinish = (values) => {
        console.log(tableData)
        assignUsersAction(tableData).then(res => console.log(res)).then(() => navigate(`/events/${params.id}`))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    return (
           <Form
               form={form}
               name="basic"
               initialValues={{
                   remember: true,
               }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="off"
           >
               <Form.Item>
                   <Table columns={columns} dataSource={tableData} pagi/>
               </Form.Item>
               <Form.Item
                   wrapperCol={{
                       offset: 8,
                       span: 16,
                   }}
               >
                   <Button type="primary" htmlType="submit">
                       Submit
                   </Button>
               </Form.Item>

           </Form>
    );
}

export default connect(null, {getCandidateUsersToAssign, assignUsersAction})(AssignUserToEvent);
