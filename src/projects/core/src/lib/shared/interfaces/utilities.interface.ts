import { MessageLevel } from '../enums';

export interface INotification {
    title: string;
    message: string;
    type?: MessageLevel;
}
