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
import { useState } from "react";
import dayjs from "dayjs";

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs().set('date',1)
    })
    const shortWeekDays = getWeekDays({ short: true });

    const currentMonth = currentDate.format('MMMM')
    const currentYear = currentDate.format('YYYY')


    return (
        <div className="flex flex-col gap-6 p-6 bg-gray800 rounded-md w-[33.75rem]">
            {/* Header Calendar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="leading-normal">{currentMonth}</h3>
                    <span className="text-gray200">{currentYear}</span>
                </div>
                {/* Calendar actions */}
                <div className="flex gap-2 text-gray200">
                    <Button variant={"ghost"} className="p-2 hover:text-gray100 focus:shadow-shadowB">
                        <ChevronLeft className="cursor-pointer leading-none rounded-sm" size={20} />
                    </Button>
                    <Button variant={"ghost"} className="p-2">
                        <ChevronRight className="cursor-pointer leading-none rounded-sm" size={20} />
                    </Button>
                </div>
            </div>

            {/* Calendar Table */}
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
                    <TableRow className="hover:bg-transparent">
                        <TableCell className="p-0 text-center"></TableCell>
                        <TableCell className="p-0 text-center"></TableCell>
                        <TableCell className="p-0 text-center"></TableCell>
                        <TableCell className="p-0 text-center"></TableCell>
                        <TableCell className="p-0 text-center">
                            <Button
                                variant={"ghost"}
                                className="
                                        text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB
                                        hover:bg-gray500 disabled:hover:bg-transparent
                                        "
                            >
                                1
                            </Button>
                        </TableCell>
                        <TableCell className="p-0 text-center">
                            <Button
                                variant={"ghost"}
                                className="
                                text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB
                                 hover:bg-gray500 disabled:hover:bg-transparent
                                "
                            >
                                2
                            </Button>
                        </TableCell>
                        <TableCell className="p-0 text-center">
                            <Button
                                variant={"ghost"}
                                className="
                                text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB
                                 hover:bg-gray500 disabled:hover:bg-transparent
                                "
                            >
                                3
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}