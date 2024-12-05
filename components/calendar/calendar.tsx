'use client'

import { ChevronLeft, ChevronRight, Ghost } from "lucide-react";
import { Button } from "../ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getWeekDays } from "@/utils/get-week-days";
import { useMemo, useState } from "react";
import dayjs from '../../lib/dayjs'

interface CalendarWeek {
    week: number
    days: Array<{
      date: dayjs.Dayjs
      disabled: boolean
    }>
  }

  type CalendarWeeks = CalendarWeek[]

  interface CalendarProps {
    selectedDate: Date | null
    onDateSelected: (date: Date) => void
  }
  

export function Calendar({ selectedDate, onDateSelected }: CalendarProps ) {
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs().set('date',1)
    })

    function hadlePreviousMonth() {
     const previousMonthDate = currentDate.subtract(1, 'month')

     setCurrentDate(previousMonthDate)
    }

    function hadleNextMonth() {
       const NextMonthDate = currentDate.add(1, 'month')

       setCurrentDate(NextMonthDate)
    }

    const shortWeekDays = getWeekDays({ short: true });

    const currentMonth = currentDate.format('MMMM')
    const currentYear = currentDate.format('YYYY')

    const calendarWeeks = useMemo(() => {
        const daysInMonthArray = Array.from({
            length: currentDate.daysInMonth(),
        }).map((_, i) => {
            return currentDate.set('date', i + 1)
        })

        const firstWeekDay = currentDate.get('day')

        const previousMonthFillArray = Array.from({
            length: firstWeekDay,
        }).map((_, i) => {
            return currentDate.subtract(i + 1, 'day')
        }).reverse()

      const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth());
      const lastWeekDay = lastDayInCurrentMonth.get('day')

      const nextMonthFillArray = Array.from({
        length: 7 - (lastWeekDay + 1)
      }).map((_, i) => {
        return lastDayInCurrentMonth.add(i + 1, 'day')
      })

     const calendarDays = [
        ...previousMonthFillArray.map(date => {
            return { date, disabled: true}
        }),
        ...daysInMonthArray.map(date => {
            return { date, disabled: date.endOf('day').isBefore(new Date())}
        }),
        ...nextMonthFillArray.map(date => {
            return { date, disabled: true}
        }),
     ]

     const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
        (weeks, _, i, original) => {
          const isNewWeek = i % 7 === 0
          if (isNewWeek) {
            weeks.push({
              week: i / 7 + 1,
              days: original.slice(i, i + 7),
            })
          }
          return weeks
        },
        [],
      )
  

     return calendarWeeks
    },[currentDate])

    console.log(calendarWeeks)



    return (
        <div className="flex flex-col gap-6 p-6 bg-gray800 rounded-md w-[33.75rem]">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="leading-normal capitalize">{currentMonth}</h3>
                    <span className="text-gray200">{currentYear}</span>
                </div>
                <div className="flex gap-2 text-gray200">
                    <Button variant={"ghost"} className="p-2 hover:text-gray100 focus:shadow-shadowB" onClick={hadlePreviousMonth} title="Previous month">
                        <ChevronLeft className="cursor-pointer leading-none rounded-sm" size={20} />
                    </Button>
                    <Button variant={"ghost"} className="p-2 focus:shadow-shadowB" onClick={hadleNextMonth} title="Next month">
                        <ChevronRight className="cursor-pointer leading-none rounded-sm" size={20} />
                    </Button>
                </div>
            </div>
            <Table className="w-full table-fixed border-separate border-spacing-2">
                <TableHeader className="border border-b-gray-300">
                    <TableRow className="hover:bg-transparent">
                        {shortWeekDays.map((weekDay) => (
                            <TableHead
                                className="text-gray200 font-medium text-sm text-center"
                                key={weekDay}
                            >
                                {weekDay}.
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {calendarWeeks.map(({ week, days }) => {
                        return (
                            <TableRow key={week} className="hover:bg-transparent">
                                {days.map(({ date, disabled }) => {
                                    return (
                                        <TableCell key={date.toString()} className="p-0 text-center">
                                            <Button onClick={() => onDateSelected(date.toDate())} disabled={disabled}
                                                variant={"ghost"}
                                                className="
                                                 text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB
                                                 hover:bg-gray500 disabled:hover:bg-transparent
                                                        "
                                            >
                                               {date.get('date')}
                                            </Button>
                                         </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                    <TableRow className="hover:bg-transparent">
                       
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}