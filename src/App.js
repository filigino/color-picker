import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewPalette from './components/NewPalette';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import seedColors from './seeds/seedColors';
import { generatePalette } from './seeds/colorHelpers';
import './css/App.css';

function App() {
    const [palettes, setPalettes] = React.useState([...seedColors]);

    const findPalette = id => {
        const palette = palettes.find(palette => palette.id === id);
        return generatePalette(palette);
    };

    const savePalette = palette => {
        setPalettes([...palettes, palette]);
    };

    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <PaletteList palettes={palettes} />
                </Route>
                <Route exact path="/palette/new">
                    <NewPalette palettes={palettes} savePalette={savePalette} />
                </Route>
                <Route exact path="/palette/:id" component={routeParams =>
                    <Palette palette={findPalette(routeParams.match.params.id)} />
                } />
                <Route exact path="/palette/:paletteId/:colorId" component={routeParams =>
                    <SingleColorPalette
                        palette={findPalette(routeParams.match.params.paletteId)}
                        colorId={routeParams.match.params.colorId}
                    />
                } />
            </Switch>
        </div>
    );
}

export default App;
