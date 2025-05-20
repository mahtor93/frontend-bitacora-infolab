"use client"


export default function Dropdown({ id, options, value, onChange, label, firstOption }) {
  return (
    <div>
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
