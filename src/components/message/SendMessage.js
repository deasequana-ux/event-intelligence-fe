import React from 'react';
import {Button, Form, Input, message} from "antd";
import {useNavigate, useParams} from "react-router";
import {connect} from "react-redux";
import {formStyle} from "../../utils/formStyle";
import {sendMessage} from "../../slices/message-slice";
import {unwrapResult} from "@reduxjs/toolkit";
function SendMessage({id, users, sendMessage}) {
    const params = useParams();
    const {TextArea} = Input;
    const navigate = useNavigate()
    const onFinish = (values) => {
        delete values.senderUser
        const vv = {...values, senderUserId: Number(id), receiverUserId: Number(params.id)}
        sendMessage(vv)
            .then(unwrapResult)
            .then(() => {
                message.success("Message has been sent successfully.").then()
                navigate("/users")
            })
            .catch(() => message.error("Message could not be sent !"))
    };
    const getUserById = (id) => {
        let ru = users.items.filter(x => x.id === Number(id))
        if (ru.length > 0) return ru[0];
    }

    return (
        <>
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
                    label="To"
                    name="senderUser"
                    initialValue={getUserById(params.id).email}
                    rules={[
                        {
                            required: true,
                            message: 'Please input receiver email!',
                        },
                    ]}
                >
                    <Input disabled={true}/>
                </Form.Item>

                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input mail title!',
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
                            message: 'Please input mail body!',
                        },
                    ]}
                >
                    <TextArea rows={4}/>
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
        </>

    );
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        users: state.users
    };
};
export default connect(mapStateToProps, {sendMessage})(SendMessage);