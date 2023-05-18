import { useStorage } from "../../hooks";
import { Flex } from "../../reusables";

export const TopBarView = () => {
    const { getCoins, getName, getLevel } = useStorage();

    return (
        <Flex
            className="bg-[#555] border-b border-black text-white fixed top-0 h-[30px] z-40"
            fullWidth
        >
            {getCoins} | ({getName} Hotel) | (Level: {getLevel})
        </Flex>
    );
};
