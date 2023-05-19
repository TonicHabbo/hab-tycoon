import { useEffect, useMemo, useState } from "react";
import {
    LevelUp,
    LoadingScreen,
    Mainview,
    ToolbarView,
    TopBarView,
} from "./components";
import { TutorialView } from "./components/tutorial/TutorialView";
import { useApp } from "./hooks";
import { Button, Flex } from "./reusables";

export const App = () => {
    const { ready, standalone, setAlone } = useApp();

    const [evt, setEvt] = useState<any>(null);

    const getClasses = useMemo(() => {
        let classes = [
            "bg-gradient-to-t",
            "to-sky-200",
            "from-blue-400",
            "relative",
            "self-center",
        ];

        if (standalone) classes.push("standalone-app");

        return classes.join(" ");
    }, [standalone]);

    const install = () => {
        if (evt) {
            evt.prompt();
            setAlone(true);
        }
    };

    useEffect(() => {
        const eventH = (evt) => {
            evt.preventDefault();
            setEvt(evt);
        };

        const errH = () => {};
        //@ts-ignore
        window.addEventListener("beforeinstallprompt", eventH, errH);
    }, []);

    return (
        <Flex
            column
            fit
            className={getClasses}
            gap={0}
            overflow="hidden"
            alignItems="center"
            justify="center"
        >
            {standalone && (
                <>
                    <LoadingScreen />
                    {ready && (
                        <>
                            <TopBarView />
                            <Mainview />
                            <ToolbarView />
                            <LevelUp />
                            <TutorialView />
                        </>
                    )}
                </>
            )}
            {!standalone && <Button onClick={install}>Open Game</Button>}
        </Flex>
    );
};
