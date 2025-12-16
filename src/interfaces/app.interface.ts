import type { Dispatch, FC, SVGProps } from 'react';
import type { ITag } from '../components/Event/event.interface';

export interface ICurrentUserData {
  id: string;
  userName: string;
  emailId: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  profileUrl: string;
}

export interface AppContextType {
  currentUserData: ICurrentUserData | undefined;
  currentPageDetails: ICurrentPageDetails;
  setCurrentPageDetails: Dispatch<React.SetStateAction<ICurrentPageDetails>>;
  selectedTag: ITag | undefined;
  setSelectedTag: Dispatch<React.SetStateAction<ITag | undefined>>;
}

export interface ICurrentPageDetails extends ISideBarMenu {
  pageTitle?: string;
}

export interface ISideBarMenu {
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  route: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: Dispatch<React.SetStateAction<Theme>>;
}
