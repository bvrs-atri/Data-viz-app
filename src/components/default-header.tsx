import { Event } from '@/lib/data';
import { HeaderContext } from '@tanstack/react-table';
import { LucideArrowDown, LucideArrowUp } from 'lucide-react';


interface DefaultHeaderProps<T>{
    info: HeaderContext<Event, T>
    name: string
}

export function DefaultHeader<T>({info, name}: DefaultHeaderProps<T>){
  const sorted = info.column.getIsSorted();
  return (
    <div onPointerDown ={(e) => {
        e.preventDefault();
        info.column.toggleSorting(info.column.getIsSorted() === "asc");
    }}
    className='flex w-full justify-center'
    >
        {name}
        {sorted === "asc" && <LucideArrowDown/>}
        {sorted === "desc" && <LucideArrowUp/>}
    </div>
  )
}

export default DefaultHeader;