'use client'

import { Calendar } from "@/components/calendar/calendar";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams, useParams } from "next/navigation";

interface Availability {
    possibleTimes: number[];
    availableTimes: number[];
}

export function CalendarStep() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    const searchParams = useSearchParams();
    const params = useParams();

    const username = searchParams.get('username') || params?.username || "";

    const isDateSelected = !!selectedDate;

    const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
    const describedDate = selectedDate ? dayjs(selectedDate).format("DD[ de ]MMMM") : null;

    const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : null

    const { data: availability } = useQuery<Availability>({
        queryKey: ['availability', selectedDateWithoutTime],
        queryFn: async () => {
          const response = await api.get(`/users/${username}`, {
            params: {
              date: selectedDateWithoutTime,
            },
          })
    
          return response.data
        },
        enabled: !!selectedDate,
      })


    return (
        <div
            className={`mt-6 mx-auto grid relative ${isDateSelected ? "grid-cols-[1fr_17.5rem]" : "w-[540px] grid-cols-1"
                } gap-4`}
        >
            <div>
                <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
            </div>
            {isDateSelected && (
                <div className="border-l border-gray-600 p-6 absolute top-0 bottom-0 right-0 w-[280px] overflow-y-scroll bg-gray800">
                    <div className="font-medium text-gray100">
                        {weekDay},{" "}
                        <span className="text-gray-200 text-sm">{describedDate}</span>
                    </div>
                    <div className="mt-3 grid gap-2 grid-cols-1 sm:grid-cols-1">
                        {availability?.possibleTimes.map((hour) => {
                            const isAvailable = availability.availableTimes.includes(hour);
                            return (
                                <Button
                                    variant="ghost"
                                    className={`border-0 py-2 px-0 text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB ${
                                        isAvailable
                                            ? "bg-gray600 hover:bg-gray500"
                                            : "bg-gray700 opacity-50"
                                    }`}
                                    key={hour}
                                    disabled={!isAvailable}
                                >
                                    {String(hour).padStart(2, '0')}:00h
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
