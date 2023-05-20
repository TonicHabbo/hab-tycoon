import { useMemo, useState } from "react";
import { useFloors, usePopups, useSounds, useStorage } from "../../hooks";
import { useLevels } from "../../hooks/useLevels";
import { Button, Flex, Frame, Input } from "../../reusables";
import { kinds } from "../../utils";

export const FloorCreatorView = () => {
    const {
        floorCreator,
        setFloorCreator,
        getBuildableFloors,
        getFloorType,
        createFloor,
        kindBuilt,
    } = useFloors();
    const { playAudio } = useSounds();
    const { getCoins } = useStorage();
    const { maxOfKind } = useLevels();
    const { notify } = usePopups();

    const [name, setName] = useState<string>("");
    const [selectedType, setSelectedType] = useState<number>(-1);

    const canAfford = useMemo(() => {
        return getFloorType(selectedType)?.cost <= getCoins;
    }, [selectedType, getCoins]);

    const reset = () => {
        setFloorCreator(false);
        setSelectedType(-1);
        setName("");
    };

    const onBuild = () => {
        let floorType = getFloorType(selectedType);

        if (!floorType || floorType === undefined) return;

        if (
            !canAfford ||
            name.length < 3 ||
            kindBuilt(floorType.kind) >= maxOfKind(floorType.kind)
        ) {
            playAudio("error.mp3");
            if (name.length < 3) notify("Name too short!", true);
            if (!canAfford) notify("You cannot afford this right now!", true);
            if (kindBuilt(floorType.kind) >= maxOfKind(floorType.kind))
                notify(
                    `You cannot build any more ${kinds[floorType.kind]} Floors`,
                    true
                );
        } else {
            playAudio("build.mp3");
            createFloor(selectedType, name);
            reset();
        }
    };

    if (!floorCreator) return;

    return (
        <Frame title="Build a new floor" close={reset}>
            <Flex column alignItems="center" justify="center" fit>
                <Input placeholder="Name" value={name} onValue={setName} />
                <div>
                    <label>Floor Type:</label>
                    <select
                        className="ubuntu-input p-1 w-full text-sm text-gray-700"
                        onChange={(evt) =>
                            setSelectedType(parseInt(evt.target.value))
                        }
                        value={selectedType}
                    >
                        <option disabled value={-1}>
                            Floor Type
                        </option>
                        {getBuildableFloors().map((val, i) => (
                            <option value={val.id} key={i}>
                                {val.publicName}
                            </option>
                        ))}
                    </select>
                </div>
                <hr className="border-t border-black opacity-25 w-full" />
                <div className="text-center w-full">
                    Cost:{" "}
                    <b className={!canAfford ? "text-red-500" : ""}>
                        {selectedType > -1
                            ? getFloorType(selectedType)?.cost
                            : "?"}
                    </b>
                </div>
                <Button onClick={onBuild}>Build</Button>
            </Flex>
        </Frame>
    );
};
