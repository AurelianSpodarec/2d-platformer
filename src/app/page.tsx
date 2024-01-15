'use client'

import { Config } from "@/scripts/game/Config";
import { App } from "@/scripts/engine/App";
import { useEffect, useState } from "react";

// Player can own a "World"
// Create a tile to be places on world - 16x16
// Add gravity on the world and player

function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if(App && App?.app?.view || isLoaded || !Config) return
    App.run(Config)
    setIsLoaded(true)
  }, [App]);

  return
}

export default Home;
