import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3200 },
  { month: "Mar", sales: 5200 },
  { month: "Apr", sales: 6100 },
  { month: "May", sales: 4800 },
  { month: "Jun", sales: 7300 },
];

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          stroke="#94a3b8"
        />

        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#94a3b8"
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="sales"
          stroke="#2563eb"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}