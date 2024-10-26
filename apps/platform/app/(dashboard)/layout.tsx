import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-brand relative min-h-screen w-full">
      {/* order should be maintained - first navbar then sidebar; padding 80px is same as sidebar width  */}
      <div className="bg-brand fixed inset-0 z-40 h-[70px] w-full pl-[80px]">
        <Navbar />
      </div>
      {/* width is 10px more than navbar height */}
      <div className="bg-brand fixed inset-0 z-40 h-full max-w-[80px]">
        <Sidebar />
      </div>
      {/* padding-top same as navbar height; padding-left same as sidebar width */}
      <div className="pl-[80px] pt-[70px] text-white">{children}</div>
    </main>
  );
}
