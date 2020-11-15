import React, { useCallback } from 'react';
import cn from 'classnames';
import styles from './app.module.scss';
import useCells, { State } from './useCells';

const App: React.FC<unknown> = () => {
  const { cells, setItems } = useCells();

  const addCell = useCallback(() => {
    const cell = Math.random() >= 0.5 ? State.Dead : State.Live;

    setItems(cell);
  }, [setItems]);

  const getText = (type: string) => {
    if (type === State.Life) {
      return (
        <>
          <h4>Жизнь</h4>
          <span>Ку-ку!</span>
        </>
      );
    }

    if (type === State.Dead) {
      return (
        <>
          <h4>Мёртвая</h4>
          <span>или прикидывается</span>
        </>
      );
    }

    return (
      <>
        <h4>Живая</h4>
        <span>и шевелится!</span>
      </>
    );
  };

  return (
    <div className={styles.app}>
      <h2>Клеточное наполнение</h2>

      <div className={styles.items}>
        {cells.length > 0 &&
          cells.map((cell, i) => (
            <div key={i} className={styles.card}>
              <div className={cn(styles.image, cell)} />
              <div className={styles.content}>{getText(cell)}</div>
            </div>
          ))}
      </div>

      <button type="button" className={styles.btn} onClick={addCell}>
        сотворить
      </button>
    </div>
  );
};

export default App;
