import Link from "next/link";
import routes, { routeIsActive, filterRoutesByRole } from "routes/sidebar";
import * as Icons from "icons";
import { IIcon } from "icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { useRouter } from "next/router";

function Icon({ icon, ...props }: IIcon) {
  // @ts-ignore
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

interface ISidebarContent {
  linkClicked: () => void;
}

function SidebarContent({ linkClicked }: ISidebarContent) {
  const { pathname } = useRouter();
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const filteredRoutes = filterRoutesByRole(routes, role || "");

  return (
    <div className="flex flex-col h-screen justify-between text-gray-500 dark:text-gray-400">
      {/* Logo Atas (Tetap di Atas) */}
      <div className="flex items-center space-x-3 px-6 py-4 shrink-0">
        <img
          src="/assets/img/logoatas.png"
          alt="Logo"
          className="w-auto h-auto"
        />
        <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
          {appName}
        </span>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto px-2">
        <ul>
          {filteredRoutes.map((route) =>
            route.routes ? (
              <SidebarSubmenu
                route={route}
                key={route.name}
                linkClicked={linkClicked}
              />
            ) : (
              <li className="relative px-4 py-3" key={route.name}>
                <Link href={route.path || "#"} scroll={false}>
                  <a
                    className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                      routeIsActive(pathname, route)
                        ? "dark:text-gray-100 text-gray-800"
                        : ""
                    }`}
                    onClick={linkClicked}
                  >
                    {routeIsActive(pathname, route) && (
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    )}

                    <Icon
                      className="w-5 h-5"
                      aria-hidden="true"
                      icon={route.icon || ""}
                    />
                    <span className="ml-4">{route.name}</span>
                  </a>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="relative w-40 h-40 bg-gradient-to-b from-[#F1F2F3] to-[#2B3674] rounded-2xl flex items-center justify-center text-white font-bold mx-auto mb-4 shrink-0">
        {/* Logo Image */}
        <img
          src="/assets/img/logobawah.png"
          alt="FinTrack Logo"
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-white p-2 shadow-md"
        />

        {/* Text */}
        <div className="text-center mt-10 leading-tight">
          <div>FINTRACK</div>
          <div className="mt-1">SPORT CENTER</div>
        </div>
      </div>
    </div>
  );
}

export default SidebarContent;
