import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getAssignedUsers, getEventById, updateEvent} from "../../slices/event-slice";
import {useNavigate, useParams} from "react-router";
import {Button, DatePicker, Form, Input, message} from "antd";
import moment from "moment";
import {formStyle} from "../../utils/formStyle";
import {unwrapResult} from "@reduxjs/toolkit";

function UpdateEvent({getEventById, updateEvent}) {
    const { TextArea } = Input;
    const params = useParams();
    const [id, setId] = useState(-1);
    const navigate = useNavigate();
    useEffect(() => {
        getEventById(params.id)
            .then(unwrapResult)
            .then((response) => {
                setId(response.id)
                form.setFieldsValue({
                    name: response.name,
                    title: response.title,
                    body: response.body,
                    startDate: moment(response.startDate),
                    endDate: moment(response.endDate),
                })
            })
            .catch(() => message.error("asdasd"))

    }, []);
    const onFinish = (values) => {
        const endDate = values.endDate.toISOString()
        const startDate = values.startDate.toISOString()
        const vv = {...values, endDate, startDate, id}
        updateEvent(vv)
            .then(unwrapResult)
            .then(() => {
                message.success("The event could be update successfully").then()
                navigate("/events")
            })
            .catch(() => message.error("The event could not be updated !"))
    };

    const [form] = Form.useForm();
    return (
        <Form
            style={formStyle}
            form={form}
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
                <TextArea/>
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
                <Button type="primary" htmlType="submit" style={{position:"absolute", right:"10px"}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default connect(null, {getEventById, updateEvent, getAssignedUsers})(UpdateEvent);