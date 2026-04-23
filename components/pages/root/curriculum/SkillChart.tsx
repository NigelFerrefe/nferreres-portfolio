"use client";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface ChartItem {
  key: string;
  name: string;
  value: number;
  percentage: number;
  color: string;
  fill: string;
}

interface Props {
  data: ChartItem[];
}

export default function SkillsDistributionChart({ data }: Props) {

  return (
    <section className="w-full py-8">
      <Card className="rounded-2xl border border-accent/60 bg-card shadow-sm">


        <CardContent>
          <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)] md:items-center">
            <div className="mx-auto h-[240px] w-full max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    stroke="none"
                  />

                  <Tooltip
                    formatter={(value) => [`${value} skills`]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">


              <div className="space-y-3">
                {data.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {item.percentage}%
                      </p>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}