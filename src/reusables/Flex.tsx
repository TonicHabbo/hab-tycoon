import { useMemo } from "react";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    gap?: number;
    column?: boolean;
    fullHeight?: boolean;
    fullWidth?: boolean;
    fit?: boolean;
    alignItems?: "start" | "end" | "center" | "baseline" | "stretch";
    justify?:
        | "normal"
        | "start"
        | "end"
        | "center"
        | "between"
        | "around"
        | "evenly"
        | "stretch";
    overflow?:
        | "auto"
        | "hidden"
        | "visible"
        | "clip"
        | "scroll"
        | "x-auto"
        | "y-auto"
        | "x-hidden"
        | "y-hidden"
        | "x-clip"
        | "y-clip"
        | "x-visible"
        | "y-visible"
        | "x-scroll"
        | "y-scroll";
    grid?: boolean;
}

let bitch =
    "justify-normal justify-start justify-end justify-center justify-between justify-around justify-evenly justify-stretch";
bitch =
    "items-start items-end items-center items-baseline items-stretch gap-0 gap-1 gap-2 gap-3 gap-4 gap-5";
export const Flex = (props: FlexProps) => {
    const {
        gap = 1,
        column = false,
        fullHeight = false,
        fullWidth = false,
        fit = false,
        justify = "normal",
        className = "",
        overflow = "auto",
        alignItems = "baseline",
        grid = false,
        ...rest
    } = props;

    const getClasses = useMemo(() => {
        let classes = [
            `gap-${gap}`,
            `justify-${justify}`,
            `overflow-${overflow}`,
            `items-${alignItems}`,
            className,
        ];

        if (grid) classes.push("grid");
        else classes.push("flex");

        if (column) classes.push("flex-col");

        if (fullHeight || fit) classes.push("h-full");

        if (fullWidth || fit) classes.push("w-full");

        return classes.join(" ");
    }, [className, column, fit, fullHeight, fullWidth, gap, justify, overflow]);

    return <div className={getClasses} {...rest}></div>;
};
