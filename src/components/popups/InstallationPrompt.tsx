import { usePopups } from "../../hooks";
import { Button, Flex, Frame } from "../../reusables";

export const InstallationPrompt = (props: { evt: any }) => {
    const { evt } = props;
    const { removePopup } = usePopups();

    const remove = () => {
        removePopup("install");
    };

    const install = () => {
        if (evt) {
            evt.prompt();
            remove();
        }
    };

    return (
        <Frame title="Install" close={remove} className="z-50">
            <Flex column fit justify="center" alignItems="center">
                <span>Better with installation!</span>
                <Button onClick={install}>Install Prompt</Button>
            </Flex>
        </Frame>
    );
};
