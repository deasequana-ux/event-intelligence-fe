import React from 'react';
import {Card} from "antd";
import {Link} from "react-router-dom";

function Landing(props) {
    const landingStyle = {
        marginTop: '10%',
        marginLeft: '20%',
        marginRight: '20%',
        width: '60%',
        marginBottom: '1%'
    }
    return (
        <Card
            key={"landing"}
            hoverable={true}
            style={landingStyle}
            cover={
                <img
                    alt={"arcelik"}
                    src="https://i.dunya.com/2/1280/720/storage/files/images/2021/01/13/arcelik-jbvS_cover.jpg.webp"
                />
            }
        >
            <p style={{textAlign:'center'}}>You have to login to use the service. <Link to={"/login"}>Click here</Link> to login</p>
        </Card>
    );
}

export default Landing;