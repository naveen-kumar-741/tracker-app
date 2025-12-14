import EventIcon from './assets/event_icon.svg?react';
import StopWatchIcon from './assets/stop_watch.svg?react';
import type { ISideBarMenu } from './interfaces/app.interface';

export const SideBarMenu: ISideBarMenu[] = [
  {
    label: 'Events',
    icon: EventIcon,
    route: '/events',
  },
  {
    label: 'Stop watch',
    icon: StopWatchIcon,
    route: '/stop-watch',
  },
];
