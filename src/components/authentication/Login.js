import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {login} from "../../slices/auth-slice";
import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router";

function Login(props) {
    const navigate = useNavigate();

    const formStyle = {
        marginTop: '1%',
        marginLeft: '20%',
        marginRight: '20%',
        width: '60%',
        marginBottom: '1%'
    }

    const onFinish = (values) => {
        props.login(values)
            .then((res) => {
                navigate("/events")
            })
    };

    return (
        <>
            <h1 style={{textAlign:'center', marginTop:'10%'}}>LOGIN FORM</h1>
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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input style={{width: '50%'}}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password style={{width: '50%'}}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{width: '50%'}}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>

    );
}

export default connect(null, {login})(Login);