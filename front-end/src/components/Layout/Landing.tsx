import React from "react";
import {connect} from "react-redux";
import {Link, RouteComponentProps} from "react-router-dom";
import {RootState} from "../../reducers";

interface IProps extends RouteComponentProps<any> {
    validToken: boolean;
}

class Landing extends React.Component<IProps> {

    public componentDidMount = () => {
        const {history, validToken} = this.props;

        if(validToken) {
            history.push("/dashboard");
        }
    }

    public render() {
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">
                                    Personal Project Management Tool
                                </h1>
                                <p className="lead">
                                    Create your account to join active projects or start your own
                                </p>
                                <hr />
                                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                                    Sign Up
                                </Link>
                                <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    validToken: state.security.validToken
});

export default connect(mapStateToProps)(Landing);