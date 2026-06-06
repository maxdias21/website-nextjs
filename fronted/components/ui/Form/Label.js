function Label({name, placeholder, isBold}) {
    return (
        <label style={{fontWeight: isBold ? "bold" : ""}} htmlFor={name}>
            {placeholder}
        </label>
    );
}

export default Label;