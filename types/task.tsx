import { type FileRouter } from "uploadthing/types";

export type Task = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  dueDate?: string;
  attachmentUrl?: string;
  attachmentKey?: string;
};

export type StateType = {
  isSuccess: boolean;
  message: string;
  data: undefined;
}

export type OurFileRouter = FileRouter;