import Palette from './components/Palette';
import seedColors from './seeds/seedColors';

function App() {
    return (
        <div className="App">
            <Palette {...seedColors[4]} />
        </div>
    );
}

export default App;
