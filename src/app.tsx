import { useEffect } from "react";
import { Background } from "./components/background";
import { NavigationBar } from "./components/navigation-bar";
import { WindowManager } from "./components/windows/window-manager";

function App() {
  useEffect(() => {
    document.title = "Santiago's OS";
  }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="bg-background inset-0 absolute justify-center items-center">
        <Background
          className="size-full"
          preserveAspectRatio="xMidYMid slice"
        />
      </div>

      <WindowManager />

      <NavigationBar />
    </div>
  );
}

export default App;
