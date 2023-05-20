import { Howl } from 'howler';
import { useState } from 'react';
import { useBetween } from 'use-between';
import { useApp } from './useApp';

const state = () => {
    const [files, setFiles] = useState<Map<string, Howl>>(new Map());
    const { isIos } = useApp();

    const preload = async () => {
        let audios = [
            'blip.mp3',
            'loop.mp3',
            'slide.mp3',
            'ding.mp3',
            'error.mp3',
            'build.mp3',
            'suck.mp3',
        ];

        for (let audio of audios) {
            addAudio(audio);
        }
    };

    const addAudio = async (file: string) => {
        await new Promise<void>(async (resolve, reject) => {
            let element = new Howl({
                src: `./sounds/${file}`,
                html5: isIos,
            });

            element.on('load', () => {
                setFiles((prev) => {
                    let newPrev = prev;

                    newPrev.set(file, element);

                    return newPrev;
                });

                resolve();
            });
        });
    };

    const playAudio = async (
        file: string,
        loop: boolean = false,
        fade = false,
        looping = false
    ) => {
        let audio = files.get(file);

        if (!audio) return;

        let id = audio.play();

        if (fade) audio.fade(-1, id, 2000);

        if (loop && !looping)
            audio.on('end', () => playAudio(file, false, false, true));

        return audio;
    };

    return { preload, playAudio };
};

export const useSounds = () => useBetween(state);
