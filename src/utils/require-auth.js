
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, isAuth }) => {
    if (!isAuth) {
        return <Navigate to={"/"}></Navigate>;
    }
    return children;
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    };
};

export default connect(mapStateToProps, null)(RequireAuth);