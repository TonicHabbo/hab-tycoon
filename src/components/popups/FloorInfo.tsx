import { useMemo } from "react";
import { IFloor, useFloors, usePopups, useStorage } from "../../hooks";
import { Button, Frame } from "../../reusables";

export const FloorInfo = (props: { floor: IFloor }) => {
    const { floor } = props;

    const {
        floors,
        getFloorType,
        upgrade,
        recommission,
        demolish,
        upgradeCost,
        recommissionCost,
        demolishCost,
    } = useFloors();
    const { removePopup } = usePopups();
    const { getCoins } = useStorage();

    const action = (action: number) => {
        removePopup("floor");
        switch (action) {
            case 0:
                return upgrade(floor);
            case 1:
                return recommission(floor);
            case 2:
                return demolish(floor);
        }
    };

    const ticks = useMemo(() => {
        return floor.ticksToTimeout;
    }, [floors]);

    return (
        <Frame title={floor?.name} close={() => action(-1)}>
            <b>Viewing: {floor?.name}</b>
            {floor.kind !== -1 && (
                <i className="text-sm">
                    {ticks}/
                    {getFloorType(floor.type).ticksToDecomission * floor.level}{" "}
                    until decommission
                </i>
            )}
            <Button
                onClick={() => action(0)}
                disabled={upgradeCost(floor) > getCoins}
            >
                Upgrade ({upgradeCost(floor)})
            </Button>
            {floor.kind > -1 && (
                <Button
                    onClick={() => action(1)}
                    disabled={recommissionCost(floor) > getCoins || ticks > 0}
                >
                    Recommission ({recommissionCost(floor)})
                </Button>
            )}
            {floor.kind > -1 && (
                <Button
                    onClick={() => action(2)}
                    disabled={demolishCost(floor) > getCoins}
                >
                    Demolish ({demolishCost(floor)})
                </Button>
            )}
        </Frame>
    );
};
