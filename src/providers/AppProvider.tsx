import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import messages from '../utils/messages';
import type {
  AppContextType,
  ICurrentPageDetails,
  ICurrentUserData,
} from '../interfaces/app.interface';
import { SideBarMenu } from '../constant';
import type { ITag } from '../components/Event/event.interface';

export const AppContext = createContext<AppContextType>({
  currentUserData: undefined,
  currentPageDetails: SideBarMenu[0],
  setCurrentPageDetails: () => {},
  selectedTag: undefined,
  setSelectedTag: () => {},
});

export default function AppProvider({ children }: PropsWithChildren) {
  const locale = 'en';
  const [currentUserData, _setCurrentUserData] = useState<ICurrentUserData>();
  const [currentPageDetails, setCurrentPageDetails] =
    useState<ICurrentPageDetails>(SideBarMenu[0]);
  const [selectedTag, setSelectedTag] = useState<ITag>();

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale={locale}
    >
      <AppContext.Provider
        value={{
          currentUserData,
          currentPageDetails,
          setCurrentPageDetails,
          selectedTag,
          setSelectedTag,
        }}
      >
        {children}
      </AppContext.Provider>
    </IntlProvider>
  );
}
