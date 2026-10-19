function Select({ children, className = "", ...props }) {
  return (
    <select className={"form-select " + className} {...props}>
      {children}
    </select>
  );
}
export default Select;