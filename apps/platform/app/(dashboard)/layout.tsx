import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  prisma;
  return (
    <main className="bg-brand relative min-h-screen w-full">
      {/* pl = sidebar width  */}
      <div className="bg-brand fixed inset-0 z-30 h-[70px] w-full pl-[80px]">
        <Navbar />
      </div>
      {/* sidebar should come after navbar */}
      <div className="bg-brand fixed inset-0 z-40 h-full max-w-[80px]">
        <Sidebar />
      </div>
      {/* pl = sidebar width, pt = navbar height */}
      <div className="pl-[80px] pt-[70px] text-white">{children}</div>
    </main>
  );
}
