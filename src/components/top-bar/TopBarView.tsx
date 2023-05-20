import { useStorage } from "../../hooks";
import { Button, Flex } from "../../reusables";

export const TopBarView = () => {
    const { getCoins, getName, getLevel, reset } = useStorage();

    return (
        <Flex
            className="bg-[#555] border-b border-black text-white top-0 p-1 z-40 shadow-[inset_0_-1px_rgba(255,255,255,0.3)] text-xs"
            alignItems="center"
            justify="between"
            fullWidth
        >
            <img
                src={`https://habbofont.net/font/habbo/${getName.replaceAll(
                    " ",
                    "+"
                )}.gif`}
            />
            <Flex fullHeight gap={2}>
                <Flex
                    fullHeight
                    className="px-2 border border-black bg-black/25 rounded"
                    alignItems="center"
                    justify="center"
                >
                    {getCoins} coins
                </Flex>
                <Flex
                    fullHeight
                    className="px-2 border border-black bg-black/25 rounded"
                    alignItems="center"
                    justify="center"
                >
                    Level: {getLevel}
                </Flex>
            </Flex>
            <Button onClick={reset}>reset</Button>
        </Flex>
    );
};
