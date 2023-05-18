import { useMemo, useState } from "react";
import { useFloors, useSounds, useStorage } from "../../hooks";
import { Button, Flex, Frame, Input } from "../../reusables";

export const FloorCreatorView = () => {
    const {
        floorCreator,
        setFloorCreator,
        getBuildableFloors,
        getFloorType,
        createFloor,
    } = useFloors();
    const { playAudio } = useSounds();
    const { getCoins } = useStorage();

    const [name, setName] = useState<string>("");
    const [selectedType, setSelectedType] = useState<number>(-1);

    const canAfford = useMemo(() => {
        return getFloorType(selectedType)?.cost <= getCoins;
    }, [selectedType]);

    const onBuild = () => {
        if (!canAfford || !name.length) {
            playAudio("error.mp3");
        } else {
            playAudio("build.mp3");
            setFloorCreator(false);
            createFloor(selectedType, name);

            setSelectedType(-1);
            setName("");
        }
    };

    if (!floorCreator) return;

    return (
        <Frame title="Build a new floor" close={() => setFloorCreator(false)}>
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
                        <option disabled selected value={-1}>
                            Floor Type
                        </option>
                        {getBuildableFloors().map((val, i) => (
                            <option value={val.id}>{val.publicName}</option>
                        ))}
                    </select>
                </div>
                <hr className="border-t border-black opacity-25 w-full" />
                <div className="text-center w-full">
                    Cost:{" "}
                    <b className={!canAfford && "text-red-500"}>
                        {selectedType > -1
                            ? getFloorType(selectedType)?.cost
                            : "?"}
                    </b>
                </div>
                <Button onClick={onBuild} disabled={!canAfford}>
                    Build
                </Button>
            </Flex>
        </Frame>
    );
};
