import { Calendar } from "@/components/calendar/calendar";
import { TimerPicker } from "@/components/calendar/timer-picker";
import { Button } from "@/components/ui/button";

export function CalendarStep() {
    const isDateSelected = false;

    return (
        <div className={`mt-6 mx-auto grid relative ${isDateSelected ? 'grid-cols-[1fr_17.5rem]' : 'w-[540px] grid-cols-1'} gap-4`}>
            <div>
               <Calendar/>
            </div>
            {isDateSelected && (
               <div className="border-l border-gray-600 p-6 absolute top-0 bottom-0 right-0 w-[280px] overflow-y-scroll">
                 <div className="font-medium text-gray100">
                    Terça-feira, <span className="text-gray-200 text-sm">20 de setembro</span>
                 </div>

                 <div className="mt-3 grid gap-2 grid-cols-1 sm:grid-cols-2"> </div>
               </div>               
            )}
        </div>
    );
}
