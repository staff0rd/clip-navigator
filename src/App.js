import { YoutubePlayer } from "./YoutubePlayer";
import data from "./data";

function App() {
  return (
    <div>
      <YoutubePlayer video={data[0]} />
    </div>
  );
}

export default App;
