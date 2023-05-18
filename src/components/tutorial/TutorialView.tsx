import { useMemo } from "react";
import { useStorage } from "../../hooks";
import { Frame } from "../../reusables";
import { StepOne } from "./StepOne";

export const TutorialView = () => {
    const { tutorialStep } = useStorage();

    const getStep = useMemo(() => {
        switch (tutorialStep) {
            default:
                return <StepOne />;
        }
    }, [tutorialStep]);

    return null;

    return <Frame title="Tutorial">{getStep}</Frame>;
};
