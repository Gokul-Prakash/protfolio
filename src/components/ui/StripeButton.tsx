import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import RollingText from './RollingText';

type Variant = 'primary' | 'framed' | 'ghost';

type CommonProps = {
  children: string;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
};

type StripeButtonProps = CommonProps &
  (
    | { to: string; href?: never; onClick?: never; type?: never }
    | { href: string; to?: never; onClick?: never; type?: never; external?: boolean }
    | { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; to?: never; href?: never }
  );

// Hatched, corner-bracketed button with a diagonal fill sweep on hover.
const StripeButton = (props: StripeButtonProps) => {
  const { children, variant = 'framed', icon, className = '' } = props;
  const cls = `btn-stripe btn-stripe--${variant} ${className}`.trim();
  const content = (
    <>
      <RollingText text={children} />
      {icon && <span className="btn-stripe__icon">{icon}</span>}
    </>
  );

  if ('to' in props && props.to) {
    return <Link to={props.to} className={cls}>{content}</Link>;
  }

  if ('href' in props && props.href) {
    const external = 'external' in props && props.external;
    return (
      <a
        href={props.href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  const { onClick, type = 'button', disabled } = props as {
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
  };
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};

export default StripeButton;
