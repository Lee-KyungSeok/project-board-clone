import React from 'react';
import {connect} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import {bindActionCreators, Dispatch} from "redux";
import {logout} from "../../actions/securityActions";
import UserModel from "../../models/UserModel";
import {RootAction, RootState} from "../../reducers";

interface IProps {
    validToken: boolean;
    user: UserModel | {};
    logUserOut: () => any;
}

class Header extends React.Component<IProps>{

    public render() {

        const {logoutClick} = this;
        const {user, validToken} = this.props;



        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/dashboard">
                        Personal Project Management Tool
                    </Link>
                    <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    { validToken && user ? <UserIsAuthenticatedHeader user={user} logoutClick={logoutClick}/> : <UserIsNotAuthenticatedHeader/>}
                </div>
            </nav>
        );
    }

    public logoutClick = () => {
        const {logUserOut} = this.props;
        logUserOut();
        window.location.href = "/";
    }
}

interface IFCProps {
    user: UserModel | {};
    logoutClick: () => void;
}

const UserIsAuthenticatedHeader: React.FC<IFCProps> = ({user, logoutClick}) => (
    <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    Dashboard
                </Link>
            </li>
        </ul>

        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-user-circle mr-1" />
                    {user instanceof UserModel ? user.fullName : ''}
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    to="/logout"
                    onClick={logoutClick}
                >
                    Logout
                </Link>
            </li>
        </ul>
    </div>
);

const UserIsNotAuthenticatedHeader: React.FC = () => (
    <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    Sign Up
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </ul>
    </div>
);

const mapStateToProps = (state: RootState) => ({
    validToken: state.security.validToken,
    user: state.security.user
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    logUserOut: () => logout()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);