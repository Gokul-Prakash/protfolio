type RollingTextProps = {
  text: string;
};

// Text that rolls up letter-by-letter when its parent link/button is hovered.
// Two stacked copies: the visible one slides out, the hidden one slides in.
const RollingText = ({ text }: RollingTextProps) => {
  const chars = Array.from(text);

  const renderCopy = (incoming: boolean) => (
    <span
      className={`rolling__copy${incoming ? ' rolling__copy--in' : ''}`}
      aria-hidden={incoming || undefined}
    >
      {chars.map((char, i) => (
        <span key={i} className="rolling__char" style={{ '--i': i } as React.CSSProperties}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );

  return (
    <span className="rolling">
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true" className="rolling__stack">
        {renderCopy(false)}
        {renderCopy(true)}
      </span>
    </span>
  );
};

export default RollingText;
