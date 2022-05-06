import React from 'react';
import {Button, DatePicker, Form, Input} from "antd";
import moment from "moment";
import api from "../http-config"
import {useNavigate} from "react-router";

function CreateEvent(props) {
    const navigate = useNavigate()
    const onFinish = (values) => {
        const endDate = values.endDate.toISOString()
        const startDate = values.startDate.toISOString()
        const vv = {...values, endDate, startDate}
        console.log(vv);
        api.post(`/Events`, vv).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        navigate("/");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input event name!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input event title!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Body"
                name="body"
                rules={[
                    {
                        required: true,
                        message: 'Please input event body!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Start Date"
                name="startDate"
                rules={[
                    {
                        required: true,
                        message: 'Please input event start date!',
                    },
                ]}
            >
                <DatePicker format="YYYY-MM-DD HH:mm:ss"
                            showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                            showTime1={{format: 'YYYY-MM-DD HH:mm:ss'}}
                            placeholder="Start Date"/>
            </Form.Item>

            <Form.Item
                label="End Date"
                name="endDate"
                rules={[
                    {
                        required: true,
                        message: 'Please input event end date!',
                    },
                ]}
            >
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                    showTime1={{format: 'YYYY-MM-DD HH:mm:ss'}}
                    placeholder="End Date"/>
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

export default CreateEvent;