"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface FilterFormValues {
  pipelineId: string;
  taskStatus: string;
}

interface FilterPopoverProps {
  onApply: (filters: FilterFormValues) => void;
}

export function FilterPopover({ onApply }: FilterPopoverProps) {
  const { register, handleSubmit, setValue, watch } = useForm<FilterFormValues>(
    {
      defaultValues: {
        pipelineId: "",
        taskStatus: "",
      },
    }
  );

  const onSubmit = (data: FilterFormValues) => {
    onApply(data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filters</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Pipeline ID</label>
            <Input
              {...register("pipelineId")}
              placeholder="Search Pipeline ID"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Task Status</label>
            <Select
              onValueChange={(value) => setValue("taskStatus", value)}
              value={watch("taskStatus")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Errors">Errors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Apply</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
