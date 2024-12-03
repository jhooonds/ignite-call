import { Calendar } from "@/components/calendar/calendar";
import { TimerPicker } from "@/components/calendar/timer-picker";

export function CalendarStep() {
    const isDateSelected = true;

    return (
        <div className="mt-6 grid grid-cols-[1fr_280px] gap-4 h-[500px]">
            <div className="h-full">
                <Calendar />
            </div>
            {isDateSelected && (
                <div className="h-full">
                    <TimerPicker />
                </div>
            )}
        </div>
    );
}
