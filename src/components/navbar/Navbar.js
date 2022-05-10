import React from 'react';
import {Menu} from 'antd';
import {
    FireOutlined,
    LogoutOutlined, MailOutlined,
    PlusOutlined,
    UserAddOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useNavigate} from "react-router";
import {connect} from "react-redux";
import {logout} from "../../slices/auth-slice";
import {admin, manager} from "../../utils/rolesDefinition";
import {NavLink, useLocation} from "react-router-dom";

function Navbar(props) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <Menu mode="horizontal"
                  selectedKeys={[location.pathname]}>
                {
                    props.isAuth
                        ?
                        <>
                            {
                                props.roleInfo === manager
                                    ?
                                    <>
                                        <Menu.Item key="/users/create" icon={<UserAddOutlined/>}>
                                            <NavLink to={"/users/create"}>Create User</NavLink>
                                        </Menu.Item>
                                    </> : null
                            }
                            {
                                props.roleInfo === admin
                                    ?
                                    <>
                                        <Menu.Item key="/events/create" icon={<PlusOutlined/>}>
                                            <NavLink to={"/events/create"}>Create Event</NavLink>
                                        </Menu.Item>
                                    </> : null
                            }
                            <Menu.Item key="/users" icon={<UserOutlined/>}>
                                <NavLink to={"/users"}>Users</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/events" icon={<FireOutlined />}>
                                <NavLink to={"/events"}>Events</NavLink>
                            </Menu.Item>
                            <Menu.SubMenu key="SubMenu" title="Messages" icon={<MailOutlined/>}>
                                <Menu.Item key="receivedMessages" icon={<MailOutlined/>}
                                           onClick={() => navigate("/messages/received")}>
                                    Received Messages
                                </Menu.Item>
                                <Menu.Item key="sentMessages" icon={<MailOutlined/>}
                                           onClick={() => navigate("/messages/sent")}>
                                    Sent Messages
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item style={{marginLeft: 'auto'}} key="logout" icon={<LogoutOutlined/>}
                                       onClick={() => props.logout()}>
                                Logout
                            </Menu.Item>
                        </> : null
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