import { OverviewCards, RevenueChart } from "@/views/dashboard/Dashboard";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <OverviewCards />
      <RevenueChart />
    </div>
  );
}
