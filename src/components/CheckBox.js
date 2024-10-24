import React, { useState } from 'react';
import styles from '../styles/CheckBox.scss';

const Checkbox = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles['checkbox-container']}>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className={styles.checkbox}></span>
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
