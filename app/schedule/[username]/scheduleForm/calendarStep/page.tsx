'use client'

import { Calendar } from "@/components/calendar/calendar";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import dayjs from "dayjs";
import { useSearchParams,useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CalendarStep() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availability, setAvailability] = useState<{ time: string; available: boolean }[]>([]);
    const searchParams = useSearchParams()

    const isDateSelected = !!selectedDate;
    const search = searchParams.get('username')
   //  const params = useParams<{username: string}>

    const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
    const describedDate = selectedDate ? dayjs(selectedDate).format("DD[ de ]MMMM") : null;

    useEffect(() => {
        if (!selectedDate) {
            return;
        }

        const fetchAvailability = async () => {
            try {
                const { data } = await api.get(`/users/${search}`, {
                    params: {
                        date: dayjs(selectedDate).format("YYYY-MM-DD"),
                    },
                });
               console.log(data)
            } catch (error) {
                console.error("Error fetching availability", error);
            }
        };

        fetchAvailability();
        console.log()
    }, [selectedDate, search]);

    return (
        <div
            className={`mt-6 mx-auto grid relative ${
                isDateSelected ? "grid-cols-[1fr_17.5rem]" : "w-[540px] grid-cols-1"
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
                        {availability.length > 0 ? (
                            availability.map(({ time, available }) => (
                                <Button
                                    key={time}
                                    variant="ghost"
                                    className={`border-0 py-2 px-0 text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB ${
                                        available
                                            ? "bg-gray600 hover:bg-gray500"
                                            : "bg-gray700 cursor-not-allowed opacity-50"
                                    }`}
                                    disabled={!available}
                                >
                                    {time}
                                </Button>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">Carregando horários...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
