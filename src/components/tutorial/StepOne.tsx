import { useState } from "react";
import { useStorage } from "../../hooks";
import { Flex } from "../../reusables";

export const StepOne = () => {
    const [name, setLocalName] = useState<string>("");

    const { setValue, getName } = useStorage();

    return (
        <Flex
            column
            fit
            justify="center"
            alignItems="center"
            grid
            gap={3}
            className="auto-rows-auto"
        >
            <span>Get started by naming your Hotel</span>
            <input
                className="ubuntu-input w-3/4 mx-auto"
                placeholder="Habbo"
                onChange={(evt) => setLocalName(evt.target.value)}
                value={name}
            />
            <button
                className="ubuntu-button w-auto mx-auto"
                onClick={(evt) => setValue("name", name)}
            >
                Continue with "{name}" {getName}
            </button>
            {getName}
        </Flex>
    );
};
