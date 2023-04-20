export const CommonInput = ({ name, type = "text", id, className, value ,extras, placeholder, readOnly, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      onChange = {onChange ? onChange : null}
      value={value ? value : null}
      placeholder={placeholder ? placeholder : null}
      readOnly = {readOnly ? readOnly : false}
      className={`border w-full rounded-md p-2 shadow-md transition-all ease duration-300 ${className}`}
      {...extras}
    />
  );
};
