import Input from "../atoms/Input";

function Campo({ id, label, ...props }) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <Input id={id} {...props} />
    </div>
  );
}

export default Campo;