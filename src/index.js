import ReactDOM from "react-dom"
import "./index.scss"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import MainPage from "./MainPage/MainPage"

ReactDOM.render(
  <Router>
    <Switch>
      <Route to='/'>
        <MainPage />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
)
