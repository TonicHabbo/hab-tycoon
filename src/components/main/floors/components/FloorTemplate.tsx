import { ReactNode, useMemo } from "react";
import { IFloor, useFloors } from "../../../../hooks";
import { Flex } from "../../../../reusables";

export const FloorTemplate = (props: {
    children?: ReactNode;
    className?: string;
    floor?: IFloor;
}) => {
    const { children = null, className = "", floor = null } = props;

    const { getFloorClass } = useFloors();

    const isBeingBuilt = useMemo(() => {
        return floor.ticksToBuild > 0;
    }, [floor.ticksToBuild]);

    const getClasses = useMemo(() => {
        let classes = ["floor-template", "relative", className];

        if (floor && !isBeingBuilt) classes.push(getFloorClass(floor?.type));
        else classes.push("empty");

        return classes.join(" ");
    }, [floor, isBeingBuilt]);

    return (
        <Flex column className="border-x border-black w-full" gap={0}>
            <div className="bg-[#555] w-full p-0.5 text-white text-xs">
                {floor?.name + " "}
                {isBeingBuilt && `(Under Contruction: ${floor?.ticksToBuild}s)`}
            </div>
            <Flex className={getClasses}>{children}</Flex>
        </Flex>
    );
};
