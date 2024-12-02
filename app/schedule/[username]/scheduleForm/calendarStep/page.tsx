import { Calendar } from "@/components/calendar";
import { Button } from "@/components/ui/button";

export function CalendarStep() {
    const isDateSelected = true;

    return (
        <div className="mt-6 mx-auto mb-0 grid w-full h-[440px] grid-cols-[1fr_auto] gap-4 relative">
            <Calendar />
            {isDateSelected && (
                <div className="bg-gray800 p-4 w-72 h-full overflow-y-auto">
                    <p>
                        terça-feira, <span className="text-gray200 text-xs">20 de setembro</span>
                    </p>
                    <div className="grid grid-cols-1 gap-2 mt-4">
                        <Button variant="ghost" className="text-white bg-gray600">
                            08:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            09:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            10:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            11:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            12:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            13:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            14:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            15:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            16:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            17:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            18:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            19:00h
                        </Button>
                        <Button variant="ghost" className="text-white bg-gray600">
                            20:00h
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
