import { faker } from "@faker-js/faker";

export type Event = {
  PipelineId: string;
  TaskStatus: "Pending" | "In Progress" | "Done" | "Errors";
  TaskDuration: number;
  DataTransferVolume: number;
  ResourceUtilization: number;
  ExecutionTime: number;
};

const pipelineIds = Array.from({ length: 10 }, (_, i) => `pipeline-${i + 1}`);

const generateDummyData = (): Event[] => {
  return pipelineIds.flatMap((pipelineId) =>
    Array.from({ length: 50 }, () => ({
      PipelineId: pipelineId,
      TaskStatus: faker.helpers.arrayElement([
        "Pending",
        "In Progress",
        "Done",
        "Errors",
      ]),
      TaskDuration: faker.number.int({ min: 1, max: 100 }),
      DataTransferVolume: faker.number.int({ min: 1, max: 1000 }),
      ResourceUtilization: faker.number.int({ min: 0, max: 100 }),
      ExecutionTime: faker.number.int({ min: 1, max: 100 }),
    }))
  );
};

export const data: Event[] = generateDummyData();
