import React, {useEffect, useState} from 'react';
import {Form, Button, Select, Input, InputNumber, message} from 'antd';
import {connect} from "react-redux";
import {getRoles} from "../../slices/role-slice";
import {formStyle} from "../../utils/formStyle";
import {updateUser} from "../../slices/user-slice";
import {useNavigate, useParams} from "react-router";
import {unwrapResult} from "@reduxjs/toolkit";


function UpdateUser({getRoles, users, updateUser}) {
    const navigate = useNavigate()
    const params = useParams();
    const roles = [];
    const [currentRoles, setCurrentRoles] = useState([]);
    useEffect(() => {
        getRoles({page: 0, pageSize: -1}).then(res => {
            res.payload.items.map(item => {
                roles.push({
                    label: item.definition,
                    value: item.id
                })
            })
            setCurrentRoles(roles)
        })
        const currentUser = getUserByIdFromState(params.id)
        form.setFieldsValue({
            name: currentUser.name,
            surname: currentUser.surname,
            email: currentUser.email,
            password: currentUser.password,
            address: currentUser.address,
            age:currentUser.age,
            department:currentUser.department,
        })

    }, [])


    const [form] = Form.useForm();

    const onFinish = values => {
        const vv = {...values, id:Number(params.id)}
        updateUser(vv)
            .then(unwrapResult)
            .then(res => {
            message.success("Kullanıcı güncelleme işlemi başarı ile gerçekleşti").then()
            navigate("/users");
            })
            .catch(() => message.error("Kullanıcı güncelleme işlemi gerçekleştirilemedi."))
    };

    const handleChange = () => {
        form.setFieldsValue({sights: []});
    };
    const getUserByIdFromState = (id) => {
        let ru = users.items.filter(x => x.id === Number(id))
        if (ru.length > 0) return ru[0];
    }
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
            <Form.Item name="roleId" label="Role" initialValue={getUserByIdFromState(params.id).roleId} rules={[{required: true, message: 'Please input user role'}]}>
                <Select options={currentRoles} onChange={handleChange}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    };
};

export default connect(mapStateToProps, {getRoles, updateUser})(UpdateUser);