import { useEffect, useMemo, useState } from "react";
import { LoadingScreen, Mainview, ToolbarView, TopBarView } from "./components";
import { TutorialView } from "./components/tutorial/TutorialView";
import { useApp, usePopups } from "./hooks";
import { Button, Flex, Frame } from "./reusables";

export const App = () => {
    const { ready, standalone, setAlone } = useApp();
    const { popups, addPopup, removePopup } = usePopups();

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

    const remove = () => {
        removePopup(popup);
    };

    const install = () => {
        if (evt) {
            evt.prompt();
            remove();
        }
    };

    const popup = (
        <Frame title="Install" close={remove} className="z-50">
            <Flex column fit justify="center">
                Better with installation!
                <Button onClick={install}></Button>
            </Flex>
        </Frame>
    );

    useEffect(() => {
        const eventH = (evt) => {
            evt.preventDefault();
            console.log("ye");
            addPopup(popup);
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
            <LoadingScreen />
            {ready && (
                <>
                    <TopBarView />
                    <Mainview />
                    <ToolbarView />
                    <TutorialView />
                </>
            )}
            {popups && popups.map((val, i) => <div key={i}>{val}</div>)}
        </Flex>
    );
};
