'use client'

import { Calendar } from "@/components/calendar/calendar";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useState } from "react";

export function CalendarStep() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const isDateSelected = !!selectedDate;

    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const describedDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

    return (
        <div className={`mt-6 mx-auto grid relative ${isDateSelected ? 'grid-cols-[1fr_17.5rem]' : 'w-[540px] grid-cols-1'} gap-4`}>
            <div>
               <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate}/>
            </div>
            {isDateSelected && (
               <div className="border-l border-gray-600 p-6 absolute top-0 bottom-0 right-0 w-[280px] overflow-y-scroll bg-gray800">
                 <div className="font-medium text-gray100">
                    {weekDay}, <span className="text-gray-200 text-sm">{describedDate}</span>
                 </div>
                 <div className="mt-3 grid gap-2 grid-cols-1 sm:grid-cols-1">
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5" >9:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">10:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">11:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">12:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">13:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">14:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">15:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">16:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">17:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">18:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">19:00h</Button>
                    <Button variant={'ghost'} className="border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-normal focus:shadow-shadowB enabled:hover:bg-gray500 disabled:bg-none disable:cursor-default disable:opacity-5">20:00h</Button>

                 </div>
               </div>               
            )}
        </div>
    );
}
