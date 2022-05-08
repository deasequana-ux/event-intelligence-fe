import React, {useEffect} from 'react';
import {Menu} from 'antd';
import {
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined, MailOutlined,
    PlusOutlined,
    UserAddOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useNavigate} from "react-router";
import {connect} from "react-redux";
import {logout} from "../../slices/auth-slice";
import {admin, manager} from "../../utils/rolesDefinition";

function Navbar(props) {
    const navigate = useNavigate();
    useEffect(() => {
    })
    return (
        <>
            {/*<img src={"https://ui-avatars.com/api/?name=H%C3%BCseyin+%C3%96zkaya?background=fff&color=251D3A"}/>*/}
            <Menu mode="horizontal" defaultSelectedKeys={['home']}>
                {/*{
                    !props.isAuth ? <Menu.Item key="home" icon={<HomeOutlined/>} onClick={() => navigate("/")}>
                            Home
                        </Menu.Item>
                        : null
                }*/}

                {
                    props.isAuth
                        ?
                        <>
                            {
                                props.roleInfo === manager
                                    ?
                                    <>
                                        <Menu.Item key="createUser" icon={<UserAddOutlined/>}
                                                   onClick={() => navigate("/create/user")}>
                                            Create User
                                        </Menu.Item>
                                    </> : null
                            }
                            {
                                props.roleInfo === admin
                                    ?
                                    <>
                                        <Menu.Item key="createEvent" icon={<PlusOutlined/>}
                                                   onClick={() => navigate("/events/create")}>
                                            Create Event
                                        </Menu.Item>
                                    </> : null
                            }
                            <Menu.Item key="users" icon={<UserOutlined/>}
                                       onClick={() => navigate("/users")}>
                                Users
                            </Menu.Item>
                            <Menu.Item key="events" icon={<LogoutOutlined/>} onClick={() => navigate("/events")}>
                                Events
                            </Menu.Item>
                            <Menu.SubMenu key="SubMenu" title="Messages" icon={<MailOutlined />}>
                                <Menu.Item key="receivedMessages" icon={<MailOutlined />} onClick={() => navigate("/messages/received")}>
                                    Received Messages
                                </Menu.Item>
                                <Menu.Item key="sentMessages" icon={<MailOutlined />} onClick={() => navigate("/messages/sent")}>
                                    Sent Messages
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key="logout" icon={<LogoutOutlined/>} onClick={() => props.logout()}>
                                Logout
                            </Menu.Item>
{/*                            <Menu.Item key="messages" icon={<LogoutOutlined/>} onClick={() => navigate("/messages/received")}>
                                Messages
                            </Menu.Item>*/}
                        </> : null
                       /* <Menu.Item key="login" icon={<LoginOutlined/>} onClick={() => navigate("/login")}>
                            login
                        </Menu.Item>*/
                }
            </Menu>
        </>

    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        roleInfo: state.auth.roleInfo,
    };
};

export default connect(mapStateToProps, {logout})(Navbar);