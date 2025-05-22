"use client"

import styles from './dropdown.module.css'



export default function Dropdown({ id, options, value, onChange, label, firstOption }) {
  return (
    <div  className={styles.inputs}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">{firstOption}</option>
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
