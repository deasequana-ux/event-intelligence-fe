import React, {useEffect, useState} from 'react';
import {Form, Button, Select, Input, InputNumber, message} from 'antd';
import {connect} from "react-redux";
import {getRoles} from "../../slices/role-slice";
import {formStyle} from "../../utils/formStyle";
import {createUser} from "../../slices/user-slice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useNavigate} from "react-router";

function CreateUser({getRoles, createUser}) {
    const navigate = useNavigate();
    const roles = [];
    const [currentRoles, setCurrentRoles] = useState([]);
    useEffect(() => {
        getRoles({page: 0, pageSize: -1})
            .then(unwrapResult)
            .then(res => {
                res.items.map(item => {
                    roles.push({
                        label: item.definition,
                        value: item.id
                    })
                })
                setCurrentRoles(roles)
            })
            .catch(() => message.error("Role info could not be get"))
    }, [])


    const [form] = Form.useForm();

    const onFinish = values => {
        createUser(values)
            .then(unwrapResult)
            .then(() => {
                message.success("The user create successfully").then()
                navigate("/users")
            })
            .catch(() => message.error("The user could not be create !"))
    };

    const handleChange = () => {
        form.setFieldsValue({sights: []});
    };

    return (
        <Form form={form} style={formStyle}
              labelCol={{
                  span: 8,
              }}
              wrapperCol={{
                  span: 16,
              }}
              onFinish={onFinish} autoComplete="off">
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input user name!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Surname"
                name="surname"
                rules={[
                    {
                        required: true,
                        message: 'Please input user surname!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input user email!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input user password!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Age"
                name="age"
                rules={[
                    {
                        required: true,
                        message: 'Please input user age!',
                    },
                ]}
            >
                <InputNumber min={18} max={65}/>
            </Form.Item>
            <Form.Item
                label="Department"
                name="department"
                rules={[
                    {
                        required: true,
                        message: 'Please input user department!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Please input user adress!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name="roleId" label="Role" rules={[{required: true, message: 'Please input user role'}]}>
                <Select options={currentRoles} onChange={handleChange}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginLeft: "138%"}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default connect(null, {getRoles, createUser})(CreateUser);