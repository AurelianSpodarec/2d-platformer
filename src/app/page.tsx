'use client'

import { Config } from "@/scripts/game/Config";
import { App } from "@/scripts/system/App";
import { useEffect, useState } from "react";

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
