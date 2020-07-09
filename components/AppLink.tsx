import Link from "next/link";
import { FC } from "react";

type ApplinkProps = {
  titlesAndHref: Array<{
    title: string;
    href: string;
    className?: string;
    button?: boolean;
    onClick?: Function;
    as?: string;
  }>;
};
const AppLink: FC<ApplinkProps> = ({ titlesAndHref }) => {
  return (
    <>
      {titlesAndHref.map(({ title, href, className, button, onClick, as }) => (
        <Link href={href} key={title} as={as}>
          <a
            className={
              ["navbar-brand", "dropdown-item"].includes(className)
                ? className
                : `mr-3 ${!button && "nav-link"} ${className}`
            }
            onClick={() => (onClick ? onClick() : "")}
          >
            {title}
          </a>
        </Link>
      ))}
    </>
  );
};

export default AppLink;
