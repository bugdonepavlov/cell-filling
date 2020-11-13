import React from 'react';
import cn from 'classnames';
import styles from './app.module.scss';
import useLocalStorage from './useLocalStorage';

const App = () => {
  const { cells, setItems } = useLocalStorage();

  const onClick = () => {
    const cell = Math.random() >= 0.5 ? 'dead' : 'live';

    setItems(cell);
  };

  const getText = (type: string) => {
    if (type === 'life') {
      return (
        <>
          <h4>Жизнь</h4>
          <span>Ку-ку!</span>
        </>
      );
    }

    if (type === 'dead') {
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

      <button type="button" className={styles.btn} onClick={onClick}>
        сотворить
      </button>
    </div>
  );
};

export default App;
