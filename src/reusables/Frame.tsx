import { ReactNode, useEffect } from "react";
import { useSounds } from "../hooks";
import { Flex } from "./Flex";

export const Frame = (props: {
    children?: ReactNode;
    title?: string;
    close?: () => void;
    className?: string;
    closeSound?: boolean;
}) => {
    const {
        title = "",
        close = null,
        children = null,
        className,
        closeSound = true,
    } = props;

    const { playAudio } = useSounds();

    const onClose = () => {
        close();
        if (closeSound) playAudio("suck.mp3");
    };

    useEffect(() => {
        playAudio("blip.mp3");
    }, [playAudio]);
    return (
        <div
            className={
                "absolute inset-0 bg-black/75 z-30  flex flex-col items-center justify-center " +
                className
            }
        >
            <Flex column className="ubuntu-frame" gap={0}>
                <Flex
                    alignItems="center"
                    justify="center"
                    className="ubuntu-header relative"
                    gap={0}
                >
                    {title}
                    {close && (
                        <div
                            className="absolute self-center end-0 me-2 justify-center ubuntu-close cursor-pointer"
                            onClick={onClose}
                        />
                    )}
                </Flex>
                <Flex column className="p-3 pt-1 ubuntu-body" fit>
                    {children}
                </Flex>
            </Flex>
        </div>
    );
};
