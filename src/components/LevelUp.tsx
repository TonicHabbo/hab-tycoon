import { useLevels } from "../hooks/useLevels";
import { Button, Flex, Frame } from "../reusables";

export const LevelUp = () => {
    const { leveled, setLeveled } = useLevels();

    if (!leveled) return null;

    return (
        <Frame title="Level up!">
            <Flex column alignItems="center" fit>
                <span>
                    Woohoo! You've leveled up to: <b>{leveled.level}</b>!
                </span>
                <div className="mb-2">
                    {leveled.unlocks.length > 0
                        ? leveled.unlocks.join(", ")
                        : "No new unlocks :("}
                </div>
                <Button onClick={() => setLeveled(null)}>OK</Button>
            </Flex>
        </Frame>
    );
};
