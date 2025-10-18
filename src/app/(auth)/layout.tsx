import Link from "next/link";
import Image from "next/image";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
     <div className="flex">
      <div className="flex w-full flex-col gap-6">
        <Link href="/">
          <Image
            src="/logos/tradelogix-logo-nobg.png"
            alt="TradeLogix Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
        </Link>
          {children}
      </div>
    </div>
  );
};

export default Layout;