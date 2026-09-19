import Image from "next/image";
import Link from "next/link";

type AuthLogoProps = {
  href?: string;
  className?: string;
};

export default function AuthLogo({
  href = "/",
  className = "",
}: AuthLogoProps) {
  const logo = (
    <Image
      src="/assets/docushield-logo.png"
      alt="DocuShield"
      width={500}
      height={500}
      className={`h-12 w-auto object-cover object-left sm:h-16 ${className}`}
      priority
    />
  );

  
  if (!href) {
    return <span className="inline-flex">{logo}</span>;
  }

  return (
    <Link href={href} className="inline-flex transition-opacity hover:opacity-85">
      {logo}
    </Link>
  );
}
