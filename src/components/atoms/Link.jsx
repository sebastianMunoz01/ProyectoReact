import { Link as RouterLink } from "react-router-dom";
export default function Link({ to, children, ...props }) {
  return (
    <RouterLink to={to} {...props}>
      {children}
    </RouterLink>
  );
}