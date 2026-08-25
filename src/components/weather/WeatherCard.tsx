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

type WeatherCardProps = {
  data: WeatherData;
};

export default function WeatherCard({
  data,
}: WeatherCardProps) {
  const condition = data.weather?.[0];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="relative p-8 md:p-10">

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Current Weather
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {data.name}
            </h2>

            <p className="mt-3 capitalize text-lg text-slate-400">
              {condition?.description || "Current conditions"}
            </p>
          </div>

          <div className="flex items-center gap-5">

            {condition?.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
                alt={condition.description || "Weather"}
                className="h-24 w-24"
              />
            )}

            <div>
              <p className="text-5xl font-bold tracking-tight text-white md:text-6xl">
                {Math.round(data.main.temp)}°C
              </p>

              <p className="mt-2 text-slate-400">
                Feels like{" "}
                <span className="font-medium text-slate-200">
                  {Math.round(data.main.feels_like)}°C
                </span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}