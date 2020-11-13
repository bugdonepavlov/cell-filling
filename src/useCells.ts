import { useState, useMemo } from 'react';

// const initialState = ['dead', 'live', 'dead', 'live', 'live', 'live'];

const useCells = () => {
  const [elements, setElements] = useState<string[]>([]);

  const cells = useMemo(() => {
    return elements.reduce((acc, curr, i, arr) => {
      const hasLife = acc[acc.length - 1] !== 'life';

      const copyArray = (count = 1) => {
        const closest = arr.slice(Math.abs(i - count), i + 1);

        if (!closest.length) return false;

        const init = closest.length === 3 ? 'dead' : 'live';

        return closest.every((el) => el === init);
      };

      if (curr === 'live' && hasLife && copyArray()) {
        return [...acc, curr, 'life'];
      }

      if (curr === 'dead' && copyArray(2)) {
        const lastIndex = acc.lastIndexOf('life');

        return [...acc, curr].filter((_, index) => index !== lastIndex);
      }

      return [...acc, curr];
    }, [] as string[]);
  }, [elements]);

  const setItems = (cell: string) => {
    const newCells = [...elements, cell];
    setElements(newCells);
  };

  return { setItems, cells };
};

export default useCells;
