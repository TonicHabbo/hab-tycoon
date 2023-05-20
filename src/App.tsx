import { useEffect, useMemo, useState } from "react";
import { LoadingScreen, Mainview, ToolbarView, TopBarView } from "./components";
import { InstallationPrompt } from "./components/popups";
import { TutorialView } from "./components/tutorial/TutorialView";
import { useApp, usePopups } from "./hooks";
import { Flex } from "./reusables";

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

    useEffect(() => {
        const eventH = (evt) => {
            evt.preventDefault();
            addPopup("install", <InstallationPrompt evt={evt} />);
            setEvt(evt);
        };

        const errH = () => {};
        //@ts-ignore
        window.addEventListener("beforeinstallprompt", eventH, errH);
    }, []);

    return (
        <Flex column fit className={getClasses} gap={0} overflow="hidden">
            <LoadingScreen />
            {ready && (
                <>
                    <TopBarView />
                    <Mainview />
                    <ToolbarView />
                    <TutorialView />
                </>
            )}
            {popups &&
                popups.map((val, i) => <div key={val.key}>{val.node}</div>)}
        </Flex>
    );
};
