import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDataContext } from "@/context/DataContext";
import { Event } from "@/lib/data";
import { Separator } from "@radix-ui/react-menubar";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function AddRowButton() {
  const { setData } = useDataContext();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<Event>({
    PipelineId: "",
    TaskStatus: "Pending",
    TaskDuration: 0,
    DataTransferVolume: 0,
    ResourceUtilization: 0,
    ExecutionTime: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: [
        "TaskDuration",
        "DataTransferVolume",
        "ResourceUtilization",
        "ExecutionTime",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleStatusChange = (value: Event["TaskStatus"]) => {
    setFormData((prev) => ({ ...prev, TaskStatus: value }));
  };

  const handleSubmit = () => {
    setData((prev) => [formData, ...prev]); // add at top
    setFormData({
      PipelineId: "",
      TaskStatus: "Pending",
      TaskDuration: 0,
      DataTransferVolume: 0,
      ResourceUtilization: 0,
      ExecutionTime: 0,
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="float-right mb-3">
          <PlusIcon />
          Add Row
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-1">
        <SheetHeader>
          <SheetTitle>Add New Row</SheetTitle>
        </SheetHeader>
        <Separator className="border-t" />

        {[
          "PipelineId",
          "TaskDuration",
          "DataTransferVolume",
          "ResourceUtilization",
          "ExecutionTime",
        ].map((field) => (
          <div key={field} className="space-y-1">
            <Label className="ml-1" htmlFor={field}>
              {field}
            </Label>
            <Input
              className="w-80 ml-2"
              id={field}
              name={field}
              type="text"
              value={(formData as any)[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="space-y-1">
          <Label className="ml-1" htmlFor="TaskStatus">
            Task Status
          </Label>
          <Select
            value={formData.TaskStatus}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="ml-2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {["Pending", "In Progress", "Done", "Errors"].map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-80 ml-2" onClick={handleSubmit}>
          Add
        </Button>
      </SheetContent>
    </Sheet>
  );
}
