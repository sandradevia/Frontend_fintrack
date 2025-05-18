interface IRoute {
  path?: string;
  icon?: string;
  name: string;
  routes?: IRoute[];
  checkActive?(pathname: String, route: IRoute): boolean;
  exact?: boolean;
  roles?: string[]; // Menambahkan roles untuk membatasi akses
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
    path: "/example/superadmin/dashboard",
    icon: "HomeIcon",
    name: "Dashboard",
    exact: true,
    roles: ["super_admin"], // Admin dan Super Admin bisa mengakses
  },
  {
    path: "/example/superadmin/rekaptulasi",
    icon: "ButtonsIcon",
    name: "Rekaptulasi",
    roles: ["admin"], // Hanya admin yang bisa mengakses
  },
  {
    path: "/example/superadmin/m-user",
    icon: "FormsIcon",
    name: "Manajemen User",
    roles: ["admin", "super_admin"], // Admin dan Super Admin bisa mengakses
  },
  {
    path: "/example/superadmin/m-cabang",
    icon: "CardsIcon",
    name: "Manajemen Cabang",
    roles: ["admin", "super_admin"], // Admin dan Super Admin bisa mengakses
  },

  // Rute lainnya hanya untuk Super Admin
  {
    path: "/example/admin/dashboard",
    icon: "HomeIcon",
    name: "Dashboard Admin",
    exact: true,
  },
  {
    path: "/example/admin/transaksi/page",
    icon: "TablesIcon",
    name: "Transaksi",
  },
  {
    path: "/example/admin/perencanaan",
    icon: "ChartsIcon",
    name: "Perencanaan Anggaran",
  },
  {
    path: "/example/admin/pos",
    icon: "PagesIcon",
    name: "POS",
  },
  {
    path: "/example/admin/rekaptulasi",
    icon: "ButtonsIcon",
    name: "Rekaptulasi",
  },
];

// Fungsi untuk memfilter rute berdasarkan role pengguna
export const filterRoutesByRole = (
  routes: IRoute[],
  role: string
): IRoute[] => {
  return routes
    .filter((route) => {
      if (route.roles) {
        return route.roles.includes(role);
      }
      return true;
    })
    .map((route) => {
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
