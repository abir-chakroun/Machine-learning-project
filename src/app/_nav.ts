interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  
  {
    name: 'HOME',
    url: '/Dashboard'
  },
  {
    name: 'Admin',
    url: '/loginAdmin',
    icon: 'icon-star'

  },
  {
    name: 'Sign in',
    url: '/login',
    icon: 'icon-login'
  },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-user-follow'
      }
    ]
