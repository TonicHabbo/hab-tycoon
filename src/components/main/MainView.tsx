import { useFloors } from "../../hooks";
import { Flex } from "../../reusables";
import { ColumnView } from "./ColumnView";
import { FloorCreatorView } from "./FloorCreator";

export const Mainview = () => {
    const { columns } = useFloors();

    return (
        <Flex
            fit
            overflow="auto"
            gap={0}
            className={"flex-col-reverse "}
            alignItems="end"
            justify="end"
        >
            <Flex
                gap={0}
                fullWidth
                fullHeight
                overflow="auto"
                className="px-6"
                justify={columns > 1 ? "normal" : "center"}
                alignItems="end"
            >
                {columns &&
                    Array.from(Array(columns)).map((val, i) => (
                        <ColumnView key={i} column={i} />
                    ))}
            </Flex>
            <FloorCreatorView />
        </Flex>
    );
};
