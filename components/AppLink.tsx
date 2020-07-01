import Link from "next/link";
import { FC } from "react";

type ApplinkProps = {
  titlesAndHref: Array<{
    title: string;
    href: string;
    className?: string;
    button?: boolean;
  }>;
};
const AppLink: FC<ApplinkProps> = ({ titlesAndHref }) => {
  return (
    <>
      {titlesAndHref.map(({ title, href, className, button }) => (
        <Link href={href} key={title}>
          <a
            className={
              className === "navbar-brand"
                ? className
                : `mr-3 ${!button && "nav-link"} ${className}`
            }
          >
            {title}
          </a>
        </Link>
      ))}
    </>
  );
};

export default AppLink;
