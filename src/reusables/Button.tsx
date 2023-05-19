import { useMemo } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
}
export const Button = (props: ButtonProps) => {
    const { className = "", disabled = false, ...rest } = props;

    const getClasses = useMemo(() => {
        let classes = ["ubuntu-button", "text-black", className];

        if (disabled) classes.push("opacity-50", "pointer-events-none");

        return classes.join(" ");
    }, [className, disabled]);

    return <button className={getClasses} {...rest}></button>;
};
