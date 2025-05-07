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
    setData((prev) => [formData, ...prev]);
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
        <Button className="float-right mb-3" data-testid="addbutton">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Row
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Row</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 px-2">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Pipeline ID
            </Label>
            <Input
              name="PipelineId"
              value={formData.PipelineId}
              onChange={handleChange}
              placeholder="Enter Pipeline ID"
              data-testid="input-pipeline"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">
              Task Status
            </Label>
            <Select
              value={formData.TaskStatus}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-full" data-testid="input-taskstatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent data-testid="input-selecttaskstatus">
                {["Pending", "In Progress", "Done", "Errors"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">
              Task Duration
            </Label>
            <Input
              type="number"
              name="TaskDuration"
              value={formData.TaskDuration}
              onChange={handleChange}
              placeholder="Enter Task Duration"
              data-testid="input-taskduration"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">
              Data Transfer Volume
            </Label>
            <Input
              type="number"
              name="DataTransferVolume"
              value={formData.DataTransferVolume}
              onChange={handleChange}
              placeholder="Enter Data Transfer Volume"
              data-testid="input-datatransfervolume"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">
              Resource Utilization
            </Label>
            <Input
              type="number"
              name="ResourceUtilization"
              value={formData.ResourceUtilization}
              onChange={handleChange}
              placeholder="Enter Resource Utilization"
              data-testid="input-resourceutil"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">
              Execution Time
            </Label>
            <Input
              type="number"
              name="ExecutionTime"
              value={formData.ExecutionTime}
              onChange={handleChange}
              placeholder="Enter Execution Time"
              data-testid="input-executiontime"
            />
          </div>

          <Button className="mt-4" onClick={handleSubmit} data-testid="AddRow">
            Add
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
