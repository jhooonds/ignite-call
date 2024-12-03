import { Button } from "../ui/button";

export function TimerPicker() {
    return (
    <div className="border-l border-gray-600 p-6 pt-6 pb-0 overflow-y-scroll absolute top-0 bottom-0 right-0 w-[280px]">
        <p className="text-white text-base">terça-feira, <span className="text-muted-foreground text-sm">20 de setembro</span></p>
        <div className="mt-3 grid grid-cols-1 gap-2 last:mb-6">
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
    )
}