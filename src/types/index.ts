export enum Section {
  Story = 'story',
  Mission = 'mission',
  GettingServices = 'getting-services',
  ThriveApp = 'thrive-app',
  Help = 'help',
  Locations = 'locations',
  Partners = 'partners',
  Team = 'team',
  Data = 'data',
  Contact = 'contact',
}

export const LINKS: ILink[] = [
  {
    id: Section.Story,
    label: 'Story',
  },
  {
    id: Section.Mission,
    label: 'Mission',
  },
  {
    id: Section.GettingServices,
    label: 'Getting Services',
  },
  {
    id: Section.ThriveApp,
    label: 'Thrive app',
  },
  {
    id: Section.Locations,
    label: 'Locations',
  },
  {
    id: Section.Partners,
    label: 'Partners',
  },
  {
    id: Section.Team,
    label: 'Team',
  },
  {
    id: Section.Data,
    label: 'Data and transparency',
  },
  {
    id: Section.Contact,
    label: 'Contact',
  },
]

export enum RoutePath {
  Knowledge = '/knowledge',
  Services = '/services',
  Home = '/',
  News = '/news',
  Community = '/community',
  Onboarding = '/onboarding',
  INeedHelpWith = '/i-need-help-with',
}

export enum RoutePathLanding {
  HOME = '/',
  PARTNERS = 'partners',
  I_NEED_HELP = 'i-need-help',
  HOW_TO_HELP = 'how-to-help',
  BECOME_PARTNER = 'become-partner',
  BECOME_VOLUNTEER = 'become-volunteer',
  PRIVACY_POLICY = 'privacy-policy',
  TERMS_OF_USE = 'terms-of-use',
  COOKIE_POLICY = 'cookie-policy',
}

export enum QueryKeys {
  Dimensions = 'dimensions',
  Languages = 'languages',
}
export interface ILink {
  id: string
  label: string
}

export type FilterType = {
  locale_uid: string
  uid: string
  title: string
}

export type NavItem = {
  title: string
  icon: (props) => JSX.Element
  url: RoutePath
}

export enum OnboardingStep {
  AppLanguage = 1,
  SpeakLanguage = 2,
  Location = 3,
}
