import { ConsoleService } from './console.service';
import { LogService } from './log.service';

export const shared_services = [
    LogService, ConsoleService,
];

export * from './log.service';
export * from './console.service';
