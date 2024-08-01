import { useEffect, ComponentType } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { setToast } from "@/redux/slices/main/toastSlice";
const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.auth.token
    );

    useEffect(() => {
      if (!isAuthenticated) {
        console.log(window.history)
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push("/roulette");
        }
        dispatch(
          setToast({
            type: 1,
            message: "You have to login to access this page.",
          })
        );
      }
    }, [isAuthenticated, router, dispatch]);

    if (!isAuthenticated) {
      return null; // Render nothing if not authenticated
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
