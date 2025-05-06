interface IRoute {
  path?: string;
  icon?: string;
  name: string;
  routes?: IRoute[];
  checkActive?(pathname: String, route: IRoute): boolean;
  exact?: boolean;
  roles?: string[];  // Menambahkan roles untuk membatasi akses
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route);
  }

  return route?.exact
    ? pathname == route?.path
    : route?.path
    ? pathname.indexOf(route.path) === 0
    : false;
}

const routes: IRoute[] = [
  // Rute yang hanya bisa diakses oleh Admin dan Super Admin
  {
    path: '/example', 
    icon: 'HomeIcon',
    name: 'Dashboard',
    exact: true,
    roles: ['super_admin'], // Admin dan Super Admin bisa mengakses
  },
  {
    path: '/example/superadmin/rekaptulasi',
    icon: 'ButtonsIcon',
    name: 'Rekaptulasi',
    roles: ['admin'], // Hanya admin yang bisa mengakses
  },
  {
    path: '/example/superadmin/m-user',
    icon: 'FormsIcon',
    name: 'Manajemen User',
    roles: ['admin', 'super_admin'], // Admin dan Super Admin bisa mengakses
  },
  {
    path: '/example/superadmin/m-cabang',
    icon: 'CardsIcon',
    name: 'Manajemen Cabang',
    roles: ['admin', 'super_admin'], // Admin dan Super Admin bisa mengakses
  },

  // Rute yang hanya bisa diakses oleh Super Admin
  {
    path: '/example/superadmin/laporan',
    icon: 'ChartsIcon',
    name: 'Laporan',
    roles: ['super_admin'], // Hanya bisa diakses oleh super admin
  },
  
  // Rute lainnya hanya untuk Super Admin
  {
    path: '/example/dashboardAdmin', 
    icon: 'HomeIcon', 
    name: 'Dashboard Admin', 
    exact: true,
  },
  {
    path: '/example/superadmin/m-cabang',
    icon: 'TablesIcon',
    name: 'Transaksi',
  },
  {
    path: '/example/superadmin/m-cabang',
    icon: 'ChartsIcon',
    name: 'Perencanaan Anggaran',
  },
  {
    path: '/example/superadmin/m-cabang',
    icon: 'PagesIcon',
    name: 'POS',
  },
  {
    path: '/example/superadmin/m-cabang',
    icon: 'ButtonsIcon',
    name: 'Rekaptulasi',
  },
  /*{
    path: '/example/forms',
    icon: 'FormsIcon',
    name: 'Forms',
    roles: ['super_admin'], // Hanya untuk super admin
  },
  {
    path: '/example/cards',
    icon: 'CardsIcon',
    name: 'Cards',
    roles: ['super_admin'], // Hanya untuk super admin
  },
  {
    path: '/example/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
    roles: ['super_admin'], // Hanya untuk super admin
  },

  // Halaman Pages
  {
    icon: 'PagesIcon',
    name: 'Pages',
    roles: ['admin', 'super_admin'], // Bisa diakses oleh admin dan super admin
    routes: [
      {
        path: '/example/login',
        name: 'Login',
        roles: ['admin', 'super_admin'], // Bisa diakses oleh admin dan super admin
      },
      {
        path: '/example/create-account',
        name: 'Create account',
        roles: ['admin', 'super_admin'], // Bisa diakses oleh admin dan super admin
      },
      {
        path: '/example/forgot-password',
        name: 'Forgot password',
        roles: ['admin', 'super_admin'], // Bisa diakses oleh admin dan super admin
      },
      {
        path: '/example/404',
        name: '404',
        roles: ['admin', 'super_admin'], // Bisa diakses oleh admin dan super admin
      },
      {
        path: '/example/blank',
        name: 'Blank',
        roles: ['admin', 'super_admin'], // Bisa diakses oleh admin dan super admin
      },
    ],
<<<<<<< HEAD
  },*/
]


// Fungsi untuk memfilter rute berdasarkan role pengguna
export const filterRoutesByRole = (routes: IRoute[], role: string): IRoute[] => {
  return routes
    .filter(route => {
      if (route.roles) {
        return route.roles.includes(role);
      }
      return true;
    })
    .map(route => {
      // Rekursif filter submenu jika ada
      if (route.routes) {
        const filteredSubRoutes = filterRoutesByRole(route.routes, role);
        return { ...route, routes: filteredSubRoutes };
      }
      return route;
    });
};


export type { IRoute };
export default routes;
