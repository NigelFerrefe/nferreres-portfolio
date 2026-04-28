"use client";

import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
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
  isEs: boolean;
}

export default function SkillsDistributionChart({ data, isEs }: Props) {
  return (
    <section
      aria-labelledby="chart-heading"
      className="w-full py-8"
    >
      <h3 id="chart-heading" className="sr-only">
        {isEs ? "Distribución de skills por categoría" : "Skills distribution by category"}
      </h3>

      <Card className="rounded-2xl border border-accent/60 bg-card shadow-sm">
        <CardContent>
          <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)] md:items-center">

            {/* Gráfico — decorativo para lectores de pantalla */}
            <div
              aria-hidden="true"
              className="mx-auto h-[240px] w-full max-w-[260px]"
            >
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

            {/* Leyenda visual */}
            <div className="space-y-3">
              <ul
                aria-label={isEs ? "Categorías de skills" : "Skill categories"}
                className="space-y-3 list-none p-0 m-0"
              >
                {data.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      <span className="sr-only">{item.name}: </span>
                      {item.percentage}%
                      <span className="sr-only"> ({item.value} skills)</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tabla accesible oculta visualmente — solo para lectores de pantalla */}
          <table className="sr-only">
            <caption>
              {isEs
                ? "Distribución de skills por categoría"
                : "Skills distribution by category"}
            </caption>
            <thead>
              <tr>
                <th scope="col">{isEs ? "Categoría" : "Category"}</th>
                <th scope="col">{isEs ? "Cantidad" : "Count"}</th>
                <th scope="col">{isEs ? "Porcentaje" : "Percentage"}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.key}>
                  <td>{item.name}</td>
                  <td>{item.value}</td>
                  <td>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
}