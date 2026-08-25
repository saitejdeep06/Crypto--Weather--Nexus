import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
} from "lucide-react";

type WeatherData = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

type WeatherStatsProps = {
  data: WeatherData;
};

export default function WeatherStats({
  data,
}: WeatherStatsProps) {
  const stats = [
    {
      label: "Feels Like",
      value: `${Math.round(data.main.feels_like)}°C`,
      icon: Thermometer,
    },
    {
      label: "Humidity",
      value: `${data.main.humidity}%`,
      icon: Droplets,
    },
    {
      label: "Wind Speed",
      value: `${data.wind.speed} m/s`,
      icon: Wind,
    },
    {
      label: "Pressure",
      value: `${data.main.pressure} hPa`,
      icon: Gauge,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-800"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-400">
                {stat.label}
              </p>

              <Icon className="h-5 w-5 text-blue-400 transition group-hover:scale-110" />
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight text-white">
              {stat.value}
            </p>
          </div>
        );
      })}
    </section>
  );
}