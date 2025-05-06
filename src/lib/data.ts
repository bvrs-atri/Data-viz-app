import { faker } from "@faker-js/faker";

export type Event = {
  PipelineId: string;
  TaskStatus: "Pending" | "In Progress" | "Done" | "Errors";
  TaskDuration: number;
  DataTransferVolume: number;
  ResourceUtilization: number;
  ExecutionTime: number;
};

const generateDummyData = (count: number = 500): Event[] => {
  return Array.from({ length: count }, () => ({
    PipelineId: faker.string.alphanumeric(10), // 10-character random string
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
  }));
};

export const data: Event[] = generateDummyData();
