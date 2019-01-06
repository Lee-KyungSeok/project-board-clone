import classNames from 'classnames';
import {History} from "history";
import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions/securityActions";
import UserModel from "../../models/UserModel";
import {RootAction, RootState} from "../../reducers";
import {ErrorState} from "../../reducers/errorReducer";

interface IProps extends RouteComponentProps<any> {
    errors: ErrorState;
    validToken: boolean;
    createNewUser: (newUser: UserModel, history: History) => any;
}

interface IState {
    username: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}

class Register extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            username: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        }
    }

    public componentDidMount = () => {
        const {history, validToken} = this.props;

        if(validToken) {
            history.push("/dashboard");
        }
    }

    public render() {

        const {onChange, onSubmit} = this;
        const {errors : {error} } = this.props;
        const {username, fullName, password, confirmPassword} = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.fullName
                                        })}
                                        placeholder="Full Name"
                                        name="fullName"
                                        value={fullName}
                                        onChange={onChange}
                                    />
                                    {error.fullName && (
                                        <div className="invalid-feedback">{error.fullName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.username
                                        })}
                                        placeholder="Email Address (Username)"
                                        name="username"
                                        value={username}
                                        onChange={onChange}
                                    />
                                    {error.username && (
                                        <div className="invalid-feedback">{error.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                    />
                                    {error.password && (
                                        <div className="invalid-feedback">{error.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.confirmPassword
                                        })}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={onChange}
                                    />
                                    {error.confirmPassword && (
                                        <div className="invalid-feedback">
                                            {error.confirmPassword}
                                        </div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const {target: {name, value}} = event;

        this.setState({
            [name] : value
        } as any);
    }

    public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        const {history, createNewUser} = this.props;
        const {username, fullName, password, confirmPassword} = this.state;
        const newUser = new UserModel(undefined, username, fullName, password, confirmPassword, undefined, undefined);

        createNewUser(newUser, history);
    }
}

const mapStateToProps = (state: RootState) => ({
    errors: state.errors,
    validToken: state.security.validToken
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    createNewUser: (newUser: UserModel, history: History) => actions.createNewUser(newUser, history)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);