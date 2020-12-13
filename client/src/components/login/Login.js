import React, { Component, Fragment } from "react";
import {Redirect} from "react-router-dom";
import {post} from "../../services/ApiService";
import {saveAuth} from "../../services/AuthService";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    setUsername(e) {
        this.setState({username: e.target.value});
    }

    setPassword(e) {
        this.setState({password: e.target.value});
    }

    login() {
        this.setState({loading: true});

        post('/api/auth/login', {
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(res => {
            saveAuth(res.data);
            this.setState({redirect: true});
        })
        .catch(error => this.setState({error}))
        .finally(() => this.setState({loading: false}));
    }

    renderForm() {
            return (
                <Fragment>
                    {this.state.redirect ? <Redirect to="/"/> : null}
                    {this.state.error ? <strong>Login failed</strong> : null}

                    <div>
                        <label>Username</label>
                        <input onChange={e => this.setUsername(e)}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input onChange={e => this.setPassword(e)}/>
                    </div>
                    <button onClick={() => this.login()}>
                        Login
                    </button>
                </Fragment>
            )
    }

    renderLoading() {
        // this should probably be a loading spinner
        return "Loading..."
    }

    render() {
        return(
            <div>
                {this.state.loading ? this.renderLoading() : this.renderForm()}
            </div>
        )
    }
}