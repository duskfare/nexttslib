import Button, { ButtonProps } from './Button';
export function SubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      preventMultipleClicks
      {...props}
      onClick={withPreventDefault(props.onClick)}
    />
  );
}

function withPreventDefault(onClick) {
  return (...params) => {
    let e = params[0];
    e.preventDefault();
    if (typeof onClick === 'function') {
      onClick(...params);
    }
  };
}
export default SubmitButton;
