import classNames from "classnames";
import React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {bindActionCreators, Dispatch} from "redux";
import * as actions from "../../actions/securityActions";
import {RootAction, RootState} from "../../reducers";
import {ErrorState} from "../../reducers/errorReducer";

interface IProps extends RouteComponentProps<any> {
    validToken: boolean;
    errors: ErrorState;
    login: (username: string, password: string) => any;
}

interface IState {
    username: string;
    password: string;
}

class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    public componentDidMount = () => {
        const {history, validToken} = this.props;

        if(validToken) {
            history.push("/dashboard");
        }
    }

    public componentDidUpdate = (prevProps: IProps, prevState: IState) => {
        const {history, validToken} = this.props;

        if(validToken) {
            history.push("/dashboard");
        }
    }

    public render() {

        const {onChange, onSubmit} = this;
        const {errors} = this.props;
        const {username, password} = this.state;

        const {error} = errors;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classNames("form-control form-control-lg", {
                                            "is-invalid": error.username
                                        })}
                                        placeholder="Email Address"
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
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
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
        const {login} = this.props;
        const {username, password} = this.state;

        login(username, password);
    }
}

const mapStateToProps = (state: RootState) => ({
    validToken: state.security.validToken,
    errors: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    login: (username: string, password: string) => actions.login(username, password)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);