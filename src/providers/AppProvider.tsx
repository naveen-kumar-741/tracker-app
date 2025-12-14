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

export const AppContext = createContext<AppContextType>({
  currentUserData: undefined,
  currentPageDetails: SideBarMenu[0],
  setCurrentPageDetails: () => {},
});

export default function AppProvider({ children }: PropsWithChildren) {
  const locale = 'en';
  const [currentUserData, _setCurrentUserData] = useState<ICurrentUserData>();
  const [currentPageDetails, setCurrentPageDetails] =
    useState<ICurrentPageDetails>(SideBarMenu[0]);

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
        }}
      >
        {children}
      </AppContext.Provider>
    </IntlProvider>
  );
}
