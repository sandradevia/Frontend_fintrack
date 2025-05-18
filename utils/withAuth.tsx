import { useEffect } from "react";
import { useRouter } from "next/router";

const allowedPaths = ["/example/login"]; // ← halaman yang boleh diakses tanpa login

const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      const currentPath = router.pathname;

      if (!token && !allowedPaths.includes(currentPath)) {
        router.replace("/example/login"); // redirect jika tidak login dan bukan halaman login
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
