import { useEffect, useMemo, useState } from "react";
import { useApp, useSounds, useStorage } from "../../hooks";
import { useGame } from "../../hooks/game";
import { Flex } from "../../reusables";

export const LoadingScreen = () => {
    const { ready, setReady } = useApp();

    const [done, setDone] = useState<boolean>(false);
    const { preload, playAudio } = useSounds();
    const {} = useStorage();
    const { startTicker } = useGame();

    const clicked = async () => {
        if (ready) return;
        setReady(true);
        startTicker();
        playAudio("ding.mp3");

        setTimeout(() => {
            setDone(true);
            playAudio("loop.mp3", true, true);
        }, 250);
    };

    const getClasses = useMemo(() => {
        let classes = [
            "loading-screen",
            "absolute",
            "top-0",
            "end-0",
            "start-0",
            "bottom-0",
            "z-50",
        ];

        if (done) classes.push("pointer-events-none", "loading-open");

        return classes.join(" ");
    }, [done]);

    useEffect(() => {
        preload();
    }, []);

    return (
        <Flex
            fit
            onClick={clicked}
            className={getClasses}
            justify="between"
            gap={0}
        >
            <Flex fullHeight className="w-1/2 loading-door" />
            <Flex fullHeight className="w-1/2 loading-door" />
        </Flex>
    );
};
