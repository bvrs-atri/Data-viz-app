import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDataContext } from "@/context/DataContext";
import { Event } from "@/lib/data";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

export function EditSheet({
  open,
  row,
  onOpenChange,
}: {
  open: boolean;
  row: Event | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, setData } = useDataContext();
  const [formData, setFormData] = useState<Event | null>(null);

  useEffect(() => {
    setFormData(row ? { ...row } : null);
  }, [row]);

  const handleSave = () => {
    if (!formData) return;

    setData((prev) =>
      prev.map((item) =>
        item.PipelineId === formData.PipelineId ? formData : item
      )
    );
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof Event, value: string | number) => {
    if (!formData) return;

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  if (!formData) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange} data-testid="edit-sheet">
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Row</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4 py-4 px-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Pipeline ID
              </label>
              <Input
                value={formData.PipelineId}
                disabled
                className="bg-gray-100 cursor-not-allowed"
                data-testid="edit-pipelineid"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Task Status
              </label>
              <Select
                value={formData.TaskStatus}
                onValueChange={(value) =>
                  handleInputChange("TaskStatus", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Errors">Errors</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Task Duration
              </label>
              <Input
                type="number"
                value={formData.TaskDuration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    TaskDuration: Number(e.target.value),
                  })
                }
                placeholder="Enter Task Duration"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Data Transfer Volume
              </label>
              <Input
                type="number"
                value={formData.DataTransferVolume}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    DataTransferVolume: Number(e.target.value),
                  })
                }
                placeholder="Enter Data Transfer Volume"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Resource Utilization
              </label>
              <Input
                type="number"
                value={formData.ResourceUtilization}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ResourceUtilization: Number(e.target.value),
                  })
                }
                placeholder="Enter Resource Utilization"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Execution Time
              </label>
              <Input
                type="number"
                value={formData.ExecutionTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ExecutionTime: Number(e.target.value),
                  })
                }
                placeholder="Enter Execution Time"
                data-testid="edit-executiontime"
              />
            </div>

            <Button
              className="mt-4"
              onClick={handleSave}
              data-testid="save-button"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
