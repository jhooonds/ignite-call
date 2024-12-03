import { Button } from "../ui/button";

export function TimerPicker() {
    return (
        <div className="grid grid-cols-1 max-w-[17.5rem] bg-gray800 rounded-md">
            <p className="gap-4 mt-2 px-6">terça-feira, <span className="text-gray200 text-sm">20 de setembro</span></p>
            <div className="flex flex-col gap-2 p-6 rounded-md">
                <Button
                 variant="ghost"
                  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    08:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    09:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    10:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    11:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    12:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    13:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    14:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    15:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    16:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    17:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    18:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    19:00h
                </Button>
                <Button variant="ghost"  className="text-sm w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm focus:shadow-shadowB hover:bg-gray500 disabled:hover:bg-transparent">
                    20:00h
                </Button>
            </div>
        </div>
    )
}