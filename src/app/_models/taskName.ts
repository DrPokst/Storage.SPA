import { TaskList } from "./taskList";


export interface TaskName {
    id: number;
    name: string;
    status: string;
    bomName: string;
    qty: number;
    dateAdded: Date;
    lastModified: Date;
    taskList: TaskList[];
}
