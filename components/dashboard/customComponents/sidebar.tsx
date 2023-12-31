import React, { FC, useState, useEffect, memo } from "react";
import { sidebar, routLabels } from "@/constants";
import UsersStore from "@/store/users.store";
import { useRouter as useNavigation } from "next/navigation";
import { useMedia } from "react-use";
import { useRouter } from "next/router";
interface props {
  children: any;
}
const SidebarLayout: FC<props> = ({ children }) => {
  const isSmallScreen = useMedia("(max-width: 600px)");
  const isMediumScreen = useMedia("(min-width: 601px) and (max-width: 1024px)");
  const navigation = useNavigation();
  const [menuItem, setMenuItem] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const firstLetter = userName?.charAt(0).toUpperCase();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const router = useRouter();
  const currentLabel = routLabels.find(
    (route) => router.pathname === route.root
  )?.label;

  useEffect(() => {
    setUserId(UsersStore?.users[0]?.id);
    setUserName(UsersStore?.users[0]?.username);
    setEmail(UsersStore?.users[0]?.email);
    if (!isMediumScreen && !isSmallScreen) {
      setIsOpenMenu(true);
    } else {
      setIsOpenMenu(false);
    }
  }, [UsersStore, userId, isMediumScreen, isMediumScreen]);

  return (
    <div className="flex w-full justify-between">
      {isOpenMenu && (
        <div className="min-h-screen w-[176px] shadow flex flex-col fixed z-[999] bg-[#ffff]">
          <div className="mt-5 flex justify-center">
            <img src="/assets/images/logo.png" alt="logo" />
          </div>

          {sidebar.map((item) => (
            <div
            key={item.id}
              className="ml-[33px] mt-4 flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setMenuItem(item.short);
                switch (item.short) {
                  case "Logout":
                    UsersStore.removeUser(userId);
                    navigation.push("/");
                    break;
                  case "Browse":
                    navigation.push("/dashboard");
                    break;
                  // Add more cases if needed
                  default:
                    navigation.push(
                      `/dashboard/${item.short.toLocaleLowerCase()}`
                    );
                    break;
                }
              }}
            >
              <div>
                <img src={item.iconUrl} alt="icon" />
              </div>
              <span className="text-[14px] font-[500] text-[#797979]">
                {item.menu}
              </span>
            </div>
          ))}

          <div className="flex justify-center items-end mt-auto">
            <div className="w-[147px] bg-[#E3F5FF] h-[240px] rounded-[4px] mb-2">
              <div className="flex justify-center">
                <img src="/assets/images/explore.svg" alt="" />
              </div>
              <div className="text-center">
                <span className="text-[16px] font-[500] text-[#133142]">
                  Want to create an event?
                </span>
              </div>

              <div className="flex justify-center mt-2">
                <button className="text-[#ffff] bg-[#FD2F09] h-[40px] w-[115px] rounded-[4px]">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="lg:w-[84%] w-full lg:ml-[16%] "
        onClick={() => {
          if (isMediumScreen || isSmallScreen) {
            setIsOpenMenu(false);
          }
        }}
      >
        <div
          className={`lg:flex md:flex justify-between items-center fixed bg-[#ffff] lg:w-[84%] w-full lg:pt-3 z-[50] ${
            isMediumScreen || isSmallScreen ? "p-5" : ""
          }`}
        >
          <div className="flex sm:flex-co justify-end mr-5 ">
            <span
              className={`text-[36px] font-[600] text-[#133142]  ${
                isMediumScreen || isSmallScreen ? "ml-10" : null
              }`}
            >
              {currentLabel}
            </span>
          </div>
          <div
            className={`flex lg:gap-10  sm:w-full   md:justify-end  md:gap-2  pl-5 sm:pl-0 pr-5 sm:pr-0 pb-2 sm:pb-0 ${
              isSmallScreen ? "justify-between" : ""
            }`}
          >
            <div className="border border-[#E7ECFF] h-[40px] lg:w-[388px] flex items-center pl-[30px] rounded-[4px]">
              <input
                type="text"
                placeholder="Search events"
                className="outline-none h-full w-full"
              />
            </div>
            <div className="flex gap-3 lg:mr-[137px]">
              <div className="h-[40px] w-[40px] bg-[#E3F5FF] rounded-full flex items-center justify-center ">
                <span className="text-[18px] font-[500] text-[#133142]">
                  {firstLetter}
                </span>
              </div>

              {!isSmallScreen && (
                <div>
                  <div className="mt-[-5px]">
                    <span className="text-[18px] font-[500] text-[#797979] m-0 p-0">
                      {userName}
                    </span>
                  </div>
                  <div className="mt-[-6px]">
                    <span className="text-[14px] font-[500] text-[#979797]">
                      {email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-[100px] p-2 sm:p-0">{children}</div>
      </div>
      <div className="lg:hidden xl:hidden fixed top-9 left-5 z-[50]">
        <img
          src={
            isOpenMenu ? "/assets/images/close.svg" : "/assets/images/menu.svg"
          }
          alt="icon"
          width={24}
          onClick={() => {
            setIsOpenMenu(!isOpenMenu);
          }}
        />
      </div>
    </div>
  );
};

export default memo(SidebarLayout);
