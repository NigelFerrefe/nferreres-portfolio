import { SkillWithCategory } from "@/types/cv";

export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const dateMonthYearOptions: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    year: 'numeric',
   
  }

  const date = new Date(dateString);

  return {
    dateTime: date.toLocaleString("es-ES", dateTimeOptions),
    dateOnly: date.toLocaleDateString("es-ES", dateOptions),
    timeOnly: date.toLocaleTimeString("es-ES", timeOptions),
    dateMonthYear: date.toLocaleDateString("es-ES", dateMonthYearOptions),
  };
};


export function formatCategoryName(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


export default function getSkillsDistributionData(
  skillsByCategory: Record<string, SkillWithCategory[]>,
) {
  const categories = [
    {
      key: "Frontend",
      label: "Frontend",
      color: "hsl(var(--chart-1))",
    },
    {
      key: "Backend",
      label: "Backend",
      color: "hsl(var(--chart-2))",
    },
    {
      key: "databases_storage",
      label: "DB & Storage",
      color: "hsl(var(--chart-3))",
    },
    {
      key: "devops_tools",
      label: "DevOps",
      color: "hsl(var(--chart-4))",
    },
  ];

  const rawData = categories.map((category) => ({
    key: category.key,
    name: category.label,
    value: skillsByCategory[category.key]?.length ?? 0,
    color: category.color,
  }));

  const filteredData = rawData.filter((item) => item.value > 0);
  const total = filteredData.reduce((acc, item) => acc + item.value, 0);

  return filteredData.map((item) => ({
    ...item,
    fill: item.color,
    percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
  }));
}