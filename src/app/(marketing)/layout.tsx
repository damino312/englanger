import Header from "./_components/header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-screen bg-slate-200 ">
    <Header />
    {children}
  </div>
);

export default MarketingLayout;
