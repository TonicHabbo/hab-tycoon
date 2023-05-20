import { ReactNode, useMemo } from "react";
import { IFloor, useFloors, usePopups, useStorage } from "../../../../hooks";
import { Button, Flex } from "../../../../reusables";
import { FloorInfo } from "../../../popups";

export const FloorTemplate = (props: {
    children?: ReactNode;
    className?: string;
    floor?: IFloor;
}) => {
    const { children = null, className = "", floor = null } = props;

    const { getCoins } = useStorage();

    const {
        getFloorClass,
        getFloorType,
        upgradeCost,
        upgrade,
        demolishCost,
        demolish,
        recommission,
        recommissionCost,
    } = useFloors();
    const { addPopup, removePopup } = usePopups();

    const isBeingBuilt = useMemo(() => {
        return floor.ticksToBuild > 0;
    }, [floor.ticksToBuild]);

    const getClasses = useMemo(() => {
        let classes = [
            "floor-template",
            "relative",
            className,
            "cursor-pointer",
        ];

        if (floor && !isBeingBuilt) classes.push(getFloorClass(floor?.type));
        else classes.push("empty");

        return classes.join(" ");
    }, [floor, isBeingBuilt]);

    const popup = () => addPopup("floor", <FloorInfo floor={floor} />);

    return (
        <Flex column className="border-x border-black w-full" gap={0}>
            <div className="bg-[#555] w-full p-0.5 text-white text-xs shadow-[inset_0_1px_rgba(255,255,255,0.3),inset_0_-1px_rgba(255,255,255,0.3)]">
                {floor?.name + " " + floor.ticksToTimeout + " "}
                {isBeingBuilt && `(Under Contruction: ${floor?.ticksToBuild}s)`}
            </div>
            <Flex
                className={getClasses}
                onClick={popup}
                alignItems="center"
                justify="center"
                fit
            >
                {children}
                {floor.ticksToTimeout == 0 && (
                    <Button>Needs Attention! {floor.ticksToTimeout}</Button>
                )}
            </Flex>
        </Flex>
    );
};
