import Palette from './components/Palette';
import seedColors from './seeds/seedColors';
import { generatePalette } from './seeds/colorHelpers';
import './css/App.css';

function App() {
    return (
        <div className="App">
            <Palette palette={generatePalette(seedColors[4])} />
        </div>
    );
}

export default App;
