import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", revenue: 2400, bookings: 2400 },
  { month: "Feb", revenue: 5400, bookings: 5800 },
  { month: "Mar", revenue: 3400, bookings: 3600 },
  { month: "Apr", revenue: 4600, bookings: 4400 },
  { month: "May", revenue: 6200, bookings: 6800 },
  { month: "Jun", revenue: 5800, bookings: 5200 },
  { month: "Jul", revenue: 1600, bookings: 2000 },
];

export function OverviewCards() {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Overviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              Check-in <span className="text-teal-600">16</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              Check Out <span className="text-teal-600">30</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              Pending Requests <span className="text-teal-600">24</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              Bookings <span className="text-teal-600">20</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              Revenue <span className="text-teal-600">$ 2,500</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">
            Revenue
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter by:</span>
              <Select defaultValue="month">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-center text-gray-700 mb-6">
            Monthly View
          </h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Bar dataKey="revenue" fill="#0891b2" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-600"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Bookings</span>
            </div>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
