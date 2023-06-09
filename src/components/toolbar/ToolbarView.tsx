import { useMemo, useRef } from "react";
import { useApp } from "../../hooks";
import { Flex } from "../../reusables";

export const ToolbarView = () => {
    const { standalone } = useApp();

    const menuRef = useRef<HTMLSelectElement>(null);

    const getClasses = useMemo(() => {
        let classes = [
            "mt-auto",
            "toolbar",
            "border-t",
            "border-black",
            "py-2",
            "z-20",
        ];

        if (
            standalone &&
            [
                "iPad Simulator",
                "iPhone Simulator",
                "iPod Simulator",
                "iPad",
                "iPhone",
                "iPod",
            ].includes(navigator.platform)
        )
            classes.push("pb-6", "standalone");

        return classes.join(" ");
    }, [standalone]);

    return (
        <Flex
            fullWidth
            gap={3}
            alignItems="center"
            justify="center"
            className={getClasses}
        >
            <div className="toolbar-icon toolbar-floors" />
            <div className="toolbar-icon toolbar-guests" />
            <div className="toolbar-icon toolbar-crime" />
        </Flex>
    );
};
