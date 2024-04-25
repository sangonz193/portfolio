import "./App.css";
import { Background } from "./components/background";
import { NavigationBar } from "./components/navigation-bar";

function App() {
  return (
    <div className="h-screen relative">
      <div className="bg-background inset-0 absolute justify-center items-center">
        <Background
          className="size-full"
          preserveAspectRatio="xMidYMid slice"
        />
      </div>

      <NavigationBar />
    </div>
  );
}

export default App;
