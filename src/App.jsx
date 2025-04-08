import Home from "./components/Home";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import particlesConfig from "./config/particlesConfig";

function App() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    if (!init) return null;

    return (
        <>
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={particlesConfig}
            />
            <Home />
        </>
    );
}

export default App;
