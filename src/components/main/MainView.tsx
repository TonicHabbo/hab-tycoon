import { useFloors } from "../../hooks";
import { Flex } from "../../reusables";
import { FloorCreatorView } from "./FloorCreator";
import { BuildView, FloorTemplate } from "./floors";

export const Mainview = () => {
    const { floors } = useFloors();

    return (
        <>
            <Flex
                className="px-6 flex-col-reverse floor-list max-w-[476px] overflow-y-auto mt-[30px]"
                fit
                column
                gap={0}
            >
                <Flex
                    className="border-x border-black px-[4px] pt-[2px] pb-0 mb-[-1px] bg-[#cecfd0] shadow-[inset_1px_0px_white,inset_-1px_0px_white]"
                    fullWidth
                    gap={0}
                    column
                >
                    <Flex
                        className="border-t border-x border-black p-2 pb-0 bg-orange-500 min-h-[70px] flex-shrink-0 shadow-[inset_0_2px_rgba(0,0,0,0.2)] flex-col-reverse"
                        fullWidth
                        column
                        gap={0}
                    >
                        {floors &&
                            floors.length > 0 &&
                            floors.map((floor, ind) => (
                                <FloorTemplate key={ind} floor={floor} />
                            ))}
                        <BuildView />
                    </Flex>
                </Flex>
                <Flex
                    className="rooftop-start w-full flex-shrink-0 mt-20"
                    fullWidth
                />
            </Flex>
            <FloorCreatorView />
        </>
    );
};
