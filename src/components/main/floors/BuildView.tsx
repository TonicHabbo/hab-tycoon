import { useFloors } from "../../../hooks";
import { Button, Flex } from "../../../reusables";

export const BuildView = () => {
    const { setFloorCreator } = useFloors();

    return (
        <Flex
            className="floor-template empty bg-sky-200 border border-black px-5"
            alignItems="center"
            justify="end"
        >
            <Button onClick={() => setFloorCreator(true)}>
                Build new Floor
            </Button>
        </Flex>
    );
};
