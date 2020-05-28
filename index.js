import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style.css";
import Edit from "./editComponent";
import New from "./newPostComponent";
import List from "./listComponent";
import Log from "./logComponent";
import Sign from "./signComponent";
import MyPosts from "./myPostsComponent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      fetchedData: []
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/myPosts" component={MyPosts}>
              <MyPosts />
            </Route>
            <Route path="/sign" component={Sign}>
              <Sign />
            </Route>
            <Route path="/list" component={List}>
              <List />
            </Route>
            <Route path="/new" component={New}>
              <New />
            </Route>
            <Route path="/:post_id" component={Edit}>
              <Edit />
            </Route>
            <Route path="/" component={Log}>
              <Log />
            </Route>
            

          </Switch>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
