import "../../styles/Toggle.css";

const ToggleLightDark = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check" />
    </div>
  );
};

export default ToggleLightDark;
