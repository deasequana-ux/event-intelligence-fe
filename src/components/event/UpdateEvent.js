import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getAssignedUsers, getEventById, updateEvent} from "../../slices/event-slice";
import {useNavigate, useParams} from "react-router";
import {Button, DatePicker, Form, Input} from "antd";
import moment from "moment";
import {formStyle} from "../../utils/formStyle";

function UpdateEvent({getEventById, updateEvent}) {
    const { TextArea } = Input;
    const params = useParams();
    const [id, setId] = useState(-1);
    const navigate = useNavigate();
    useEffect(() => {
        getEventById(params.id).then((response) => {
            setId(response.payload.id)
            form.setFieldsValue({
                name: response.payload.name,
                title: response.payload.title,
                body: response.payload.body,
                startDate: moment(response.payload.startDate),
                endDate: moment(response.payload.endDate),
            })
        });

    }, []);
    const onFinish = (values) => {
        const endDate = values.endDate.toISOString()
        const startDate = values.startDate.toISOString()
        const vv = {...values, endDate, startDate, id}
        updateEvent(vv).then(navigate("/events"))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default connect(null, {getEventById, updateEvent, getAssignedUsers})(UpdateEvent);
// export default UpdateEvent;