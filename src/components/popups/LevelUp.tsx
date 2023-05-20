import { usePopups } from "../../hooks";
import { Button, Flex, Frame } from "../../reusables";
import { ILevel } from "../../utils";

export const LevelUp = (props: { level: ILevel }) => {
    const { level } = props;
    const { removePopup } = usePopups();

    const jsx = (
        <Frame title="Level up!">
            <Flex column alignItems="center" fit>
                <span>
                    Woohoo! You've leveled up to: <b>{level.level}</b>!
                </span>
                <div className="mb-2">
                    {level.unlocks.length > 0
                        ? level.unlocks.join(", ")
                        : "No new unlocks :("}
                </div>
                <Button onClick={() => removePopup(jsx)}>OK</Button>
            </Flex>
        </Frame>
    );

    return jsx;
};
