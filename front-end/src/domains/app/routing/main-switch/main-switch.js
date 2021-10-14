import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from "../../view/home-page/home-page";
import UtilizationPage from '../../view/utilization/utilization-page';

function MainSwitch() {
    return (
        <Switch>
            <Route
                exact path={'/'}
                render={() => <HomePage />}
            />
            <Route
                path={'/utilization'}
                render={() => <UtilizationPage />}
            />
            <Redirect to={'/'} />
        </Switch>
    );
}

export default MainSwitch;
