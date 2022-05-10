import React from 'react';
import {Button, DatePicker, Form, Input, message} from "antd";
import moment from "moment";
import {useNavigate} from "react-router";
import {connect} from "react-redux";
import {createEvent} from "../../slices/event-slice";
import {formStyle} from "../../utils/formStyle";
import {unwrapResult} from "@reduxjs/toolkit";

function CreateEvent(props) {
    const { TextArea } = Input;
    const navigate = useNavigate()
    const onFinish = (values) => {
        const endDate = values.endDate.toISOString()
        const startDate = values.startDate.toISOString()
        const vv = {...values, endDate, startDate}
        props.createEvent(vv)
            .then(unwrapResult)
            .then(() => {
                message.success("Event created succesfully").then()
                navigate("/events")
            })
            .catch(() => {
                message.error("Event can not be created!").then()
            })

    };

    return (
        <Form
            style={formStyle}
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
                <TextArea rows={4} />
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
                <Button type="primary" htmlType="submit" style={{marginLeft:"88%"}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
export default connect(null, { createEvent })(CreateEvent);