import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {RootState} from "../reducers";

interface IProps extends RouteProps {
    validToken: boolean;
    component: any;
}

const SecuredRoute: React.FC<IProps> = ({component: Component, validToken, ...otherProps}) => (
    <Route
        {...otherProps}
        render={props =>
            validToken ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

const mapStateToProps = (state:RootState) => ({
   validToken: state.security.validToken
});

export default connect(mapStateToProps)(SecuredRoute);