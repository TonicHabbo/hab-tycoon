import { useMemo } from "react";
import { useFloors } from "../../hooks";
import { Flex } from "../../reusables";
import { BuildView, FloorTemplate } from "./floors";

export const ColumnView = (props: { column: number }) => {
    const { column } = props;
    const { floors } = useFloors();

    const columnFloors = useMemo(() => {
        return floors.filter((val) => val.column == column);
    }, [floors.length]);

    const isTallest = useMemo(() => {
        let isTallest = false;
        let count = columnFloors.length;

        floors.forEach((col) => {
            const countofFloors = floors.filter(
                (val) => val.column == column - 1
            );
            if (!countofFloors.length) {
                isTallest = true;
            } else if (col?.column !== column) {
                isTallest = false;
                if (count >= countofFloors.length) isTallest = true;
            }
        });

        return isTallest;
    }, [floors.length, columnFloors]);

    if (!columnFloors) return null;

    return (
        <Flex
            className="flex-col-reverse floor-list ms-[-6px] first:ms-0 min-w-[410px] max-w-[410px] flex-shrink-0 mt-auto"
            column
            alignItems="end"
            justify="end"
            gap={0}
            overflow="hidden"
        >
            <Flex
                className="border-x border-black px-[4px] pt-[2px] pb-0 mb-[-1px] bg-[#cecfd0] shadow-[inset_1px_0px_white,inset_-1px_0px_white]"
                fullWidth
                gap={0}
            >
                <Flex
                    className="border-t border-x border-black p-2 pb-0 bg-orange-500 min-w-[400px] flex-shrink-0 shadow-[inset_0_2px_rgba(0,0,0,0.2)] flex-col-reverse"
                    fullWidth
                    column
                    gap={0}
                >
                    {columnFloors &&
                        columnFloors.length > 0 &&
                        columnFloors.map((floor, ind) => (
                            <FloorTemplate key={ind} floor={floor} />
                        ))}
                    <BuildView column={column} />
                </Flex>
            </Flex>
            <Flex
                className={
                    "rooftop-start w-auto flex-shrink-0 mt-20 " +
                    (isTallest ? "" : "should-cover")
                }
                overflow="auto"
                fullWidth
            />
        </Flex>
    );
};
