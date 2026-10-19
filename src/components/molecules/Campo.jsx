export default function Campo({ id, label, value, onChange, ...props }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input id={id} className="form-control" value={value} onChange={onChange} {...props} />
    </div>
  );
}