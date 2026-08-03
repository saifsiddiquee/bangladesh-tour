import type { Destination } from '@/lib/types';
import { 
  Clock, Ticket, Calendar, Timer, Car, 
  Sun, CloudRain, Snowflake, CheckCircle, Info 
} from 'lucide-react';

interface TravelInfoProps {
  destination: Destination;
}

export function TravelInfo({ destination }: TravelInfoProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-monsoon-slate/50 lg:p-8">
      <h2 className="font-display mb-6 text-2xl font-bold text-monsoon-slate dark:text-river-mist">
        Travel Information
      </h2>

      <div className="space-y-8">
        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {destination.openingHours && (
            <div className="flex items-start">
              <Clock className="mr-3 h-5 w-5 shrink-0 text-coxs-azure" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Opening Hours</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{destination.openingHours}</p>
              </div>
            </div>
          )}

          <div className="flex items-start">
            <Ticket className="mr-3 h-5 w-5 shrink-0 text-paddy-gold" />
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Entry Fee</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {destination.entryFee}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="mr-3 h-5 w-5 shrink-0 text-sundarbans" />
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Best Time to Visit</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {destination.bestTimeToVisit}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Timer className="mr-3 h-5 w-5 shrink-0 text-terracotta" />
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">Recommended Duration</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{destination.recommendedDuration}</p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* Transportation */}
        <div>
          <div className="mb-4 flex items-center">
            <Car className="mr-2 h-5 w-5 text-monsoon-slate dark:text-white" />
            <h3 className="font-medium text-slate-900 dark:text-white">How to Get There</h3>
          </div>
          <div className="space-y-3 pl-7">
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
              <p className="text-sm text-slate-600 dark:text-slate-400">{destination.transportationGuide}</p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* Weather */}
        {destination.weather && (
          <div>
            <h3 className="mb-4 font-medium text-slate-900 dark:text-white">Weather Patterns</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pl-1">
              <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-900/10">
                <Sun className="mb-2 h-5 w-5 text-orange-500" />
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">Summer</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{destination.weather.summer}</p>
              </div>
              <div className="rounded-lg bg-emerald-50/50 p-4 dark:bg-emerald-900/10">
                <CloudRain className="mb-2 h-5 w-5 text-emerald-500" />
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">Monsoon</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{destination.weather.monsoon}</p>
              </div>
              <div className="rounded-lg bg-slate-50/50 p-4 dark:bg-slate-800/50">
                <Snowflake className="mb-2 h-5 w-5 text-blue-400" />
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-200">Winter</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{destination.weather.winter}</p>
              </div>
            </div>
          </div>
        )}

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* Activities */}
        <div>
          <h3 className="mb-4 font-medium text-slate-900 dark:text-white">Top Activities</h3>
          <div className="flex flex-wrap gap-2">
            {destination.activities.map((activity, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-sundarbans" />
                {activity}
              </span>
            ))}
          </div>
        </div>

        {/* Tips */}
        {destination.travelTips && destination.travelTips.length > 0 && (
          <>
            <hr className="border-slate-200 dark:border-slate-800" />
            <div>
              <div className="mb-4 flex items-center">
                <Info className="mr-2 h-5 w-5 text-monsoon-slate dark:text-white" />
                <h3 className="font-medium text-slate-900 dark:text-white">Travel Tips</h3>
              </div>
              <ul className="space-y-2 pl-7 text-sm text-slate-600 dark:text-slate-400">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="relative before:absolute before:-left-4 before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-paddy-gold">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
