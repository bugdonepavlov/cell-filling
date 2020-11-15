import { useState, useMemo } from 'react';

export enum State {
  Live = 'live',
  Dead = 'dead',
  Life = 'life',
}

// const initialState = ['dead', 'live', 'dead', 'live', 'live', 'live'];

const useCells = () => {
  const [elements, setElements] = useState<string[]>([]);

  const calculateLife = (array: string[]) =>
    array.reduce((acc, curr, i, arr) => {
      const hasLife = acc[acc.length - 1] !== 'life';

      const getClosest = (count = 1) => {
        const closest = arr.slice(Math.abs(i - count), i + 1);

        if (!closest.length) return false;

        const init = closest.length === 3 ? State.Dead : State.Live;

        return closest.every((el) => el === init);
      };

      if (curr === State.Live && hasLife && getClosest()) {
        return [...acc, curr, State.Life];
      }

      if (curr === State.Dead && getClosest(2)) {
        const lastIndex = acc.lastIndexOf(State.Life);

        return [...acc, curr].filter((_, index) => index !== lastIndex);
      }

      return [...acc, curr];
    }, [] as string[]);

  const cells = useMemo(() => calculateLife(elements), [elements]);

  const setItems = (cell: string) => {
    const newCells = [...elements, cell];
    setElements(newCells);
  };

  return { setItems, cells };
};

export default useCells;
