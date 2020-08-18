import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';
import { RouterService } from './router.service';
import { StorageService } from './storage.service';
import { ThemeService } from './theme.service';
import { WatchDogService } from './watchdog.service';

export const services = [
    StorageService,
    RouterService,
    NotificationService,
    ThemeService,
    LoaderService,
    WatchDogService,
];

export * from './storage.service';
export * from './router.service';
export * from './notification.service';
export * from './theme.service';
export * from './loader.service';
export * from './watchdog.service';
