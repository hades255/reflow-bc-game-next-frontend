import React, { FC, PropsWithChildren, useEffect } from "react";
import TabBar from "@/components/profile/TabBar";
import IconCrown from "@/utils/icons/Crown";
import withAuth from "@/hoc/WithAuth";
import { useUser } from "@/redux/slices/main/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/slices/main/toastSlice";

interface Props {
  select?: number;
  isadmin?: boolean;
}

const ProfileLayout: FC<PropsWithChildren<Props>> = ({
  select,
  isadmin,
  children,
}) => {
  const user = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      router.push("/roulette");
    } else {
      if (isadmin && !user.is_admin) {
        router.push("/profile/details");
        dispatch(
          setToast({
            type: 4,
            message: "You can not access the administrator page.",
          })
        );
      }
    }
  }, [isadmin, user, router, dispatch]);

  return (
    <div className="p-6">
      <div className="flex gap-1 items-center">
        <IconCrown width={24} height={24} color="#E9AE15" />
        <p className="text-[18px] font-bold text-[#D1D1D1]">Profile</p>
      </div>
      <div className="flex gap-6 mt-6">
        <div>
          <TabBar select={select} />
        </div>
        <div className="flex w-[calc(100%_-_264px)]">{children}</div>
      </div>
    </div>
  );
};

export default withAuth(ProfileLayout);
