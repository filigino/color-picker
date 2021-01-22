import Palette from './components/Palette';
import seedColors from './seeds/seedColors';
import { generatePalette } from './seeds/colorHelpers';
import './css/App.css';

function App() {
    console.log(generatePalette(seedColors[4]));
    return (
        <div className="App">
            <Palette {...seedColors[4]} />
        </div>
    );
}

export default App;
