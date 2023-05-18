import { DetailedHTMLProps, Dispatch, useMemo } from "react";
import { Flex } from "./Flex";

interface InputProps
    extends DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    placeholder: string;
    label?: boolean;
    id?: string;
    error?: boolean;
    onValue?: Dispatch<React.SetStateAction<string>>;
}
export const Input = (props: InputProps) => {
    const {
        placeholder = "",
        label = true,
        id = placeholder,
        className = "",
        error = false,
        onValue = null,
        onChange = null,
        ...rest
    } = props;

    const getClasses = useMemo(() => {
        let classes = ["ubuntu-input"];

        if (className) classes.push(className);

        return classes.join(" ");
    }, [className, error]);

    return (
        <Flex column gap={0}>
            {label && (
                <label htmlFor={id} className="dark:text-white">
                    {placeholder}:
                </label>
            )}
            <input
                className={getClasses}
                id={id}
                placeholder={placeholder}
                onChange={(evt) =>
                    onValue != null ? onValue(evt.target.value) : onChange
                }
                {...rest}
            />
        </Flex>
    );
};
