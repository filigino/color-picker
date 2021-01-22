import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Palette from './components/Palette';
import seedColors from './seeds/seedColors';
import { generatePalette } from './seeds/colorHelpers';
import './css/App.css';

function App() {
    const findPalette = id => {
        const palette = seedColors.find(palette => palette.id === id);
        return generatePalette(palette);
    };

    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <Home palettes={seedColors} />
                </Route>
                <Route exact path="/palette/:id" component={routeParams =>
                    <Palette palette={findPalette(routeParams.match.params.id)} />
                } />
            </Switch>
        </div>
    );
}

export default App;
