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

export function Calendar() {
    const shortWeekDays =  getWeekDays({ short: true })
    return (
        <div className="flex flex-col gap-6 p-6 bg-gray800 rounded-md">
            {/* Header Calendar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-4">
              <h3 className="leading-normal">Dezembro</h3>
              <span className="text-gray200">2024</span>
              </div>
                {/* Calendar actions */}
                <div className="flex gap-2 text-gray200">
                   <Button variant={"ghost"} className="p-2 hover:text-gray100 focus:shadow-shadowB"> <ChevronLeft className="cursor-pointer leading-none rounded-sm" size={20}/></Button>
                     <Button variant={"ghost"} className="p-2"><ChevronRight className="cursor-pointer leading-none rounded-sm" size={20}/></Button>
                </div>
            </div>
                <Table className="w-full border-spacing-1 table-fixed">
                    <TableHeader>
                        <TableRow>
                          {shortWeekDays.map((weekDay) => (
                            <TableHead
                             className="text-gray200 font-medium text-sm"
                             key={weekDay}>{weekDay}.
                            </TableHead>
                          ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="before:content-none fore:bg-gray800 leading-3 block">
                        <TableRow>
                        <TableCell className="box-border">
                            <Button variant={"ghost"} className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm">1</Button>
                        </TableCell>
                        <TableCell className="box-border">
                            <Button variant={"ghost"} className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm">2</Button>
                        </TableCell>
                        <TableCell className="box-border">
                            <Button variant={"ghost"} className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm">3</Button>
                        </TableCell>
                     </TableRow>
                    </TableBody>
                </Table>

            </div>
    )
}