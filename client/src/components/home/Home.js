import React, {Component} from "react";
import {get, post} from "../../services/ApiService";
import * as auth from "../../services/AuthService";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // // call api with custom header, customer headers arent needed, just an example
        // get('/api/numbers/random', {headers: {'X-Test': '123'}})
        // .then(res => this.setState({num: res.data.num}))
        // .catch(e => console.error(e))

        // // check the console for this response
        // // note since this route is guarded on the api, it needs auth header
        // post('/api/strings/echo/helloworld', {headers: {'Authorization': '123'}})
        // .then(res => console.log(res))
        // .catch(e => console.error(e))
    }
    
    post() {
        post('/api/messages', {
            data: {
                msg: "Hello World!!"
            },
            headers: {
                Authorization: auth.getToken()
            }
        })
        .then(res => console.log(res))
        .catch(e => console.error(e));
    }
    
    render() {
        return (
            <div>
                <div>Logged in userID: {auth.getUserId()}</div>
                <div>Logged in user: {auth.getUsername()}</div>

                <button onClick={() => this.post()}>Post Hello World Message</button>
                <div>Check console for output on Hello World message</div>
            </div>
        )
    }
}
