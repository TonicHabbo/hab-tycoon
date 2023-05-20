import { useFloors } from "../../../hooks";
import { Button, Flex } from "../../../reusables";

export const BuildView = (props: { column: number }) => {
    const { column } = props;
    const { setFloorCreator, setSelectedColumn } = useFloors();

    const click = () => {
        setSelectedColumn(column);
        setFloorCreator(true);
    };

    return (
        <Flex
            className="floor-template empty bg-sky-200 border border-black px-5"
            alignItems="center"
            justify="end"
        >
            <Button onClick={click}>Build new Floor</Button>
        </Flex>
    );
};
