"use client";

import React, { FC, useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";

import uk from "@/assets/logos/flags/uk.png";
import port from "@/assets/logos/flags/port.png";
import turkey from "@/assets/logos/flags/turkey.png";
import finland from "@/assets/logos/flags/finland.png";
import german from "@/assets/logos/flags/german.png";
import russia from "@/assets/logos/flags/russia.png";
import swedish from "@/assets/logos/flags/swedish.png";
import polish from "@/assets/logos/flags/polish.png";
import norway from "@/assets/logos/flags/norway.png";
import lithu from "@/assets/logos/flags/lithu.png";
import vietnam from "@/assets/logos/flags/vietnam.png";
import ind from "@/assets/logos/flags/ind.png";
import cn from "@/assets/logos/flags/cn.png";
import espain from "@/assets/logos/flags/espain.png";

import arrowBottom from "@/assets/icons/arrow-bottom.svg";
import MessageItem from "@/components/message/Item";
import SendInput from "@/components/message/SendInput";
import { fetchAPI } from "@/services/fetchAPI";
import myEcho from "@/hooks/myEcho";
import { useSettingContext } from "@/providers/SiteSettingProvider";
import OpenChat from "@/components/message/OpenChat";

const flags = [
  { name: "English", icon: uk },
  { name: "Portuguese", icon: port },
  { name: "Turkish", icon: turkey },
  { name: "Finnish", icon: finland },
  { name: "German", icon: german },
  { name: "Russian", icon: russia },
  { name: "Swedish", icon: swedish },
  { name: "Polish", icon: polish },
  { name: "Norweglan", icon: norway },
  { name: "Lithuanian", icon: lithu },
  { name: "Vietnamese", icon: vietnam },
  { name: "Hindi", icon: ind },
  { name: "Mandarin", icon: cn },
  { name: "Spanish", icon: espain },
];

const AppSidebar: FC = () => {
  const { showSidebar } = useSettingContext();

  const [showRooms, setShowRooms] = useState(false);
  const [room, setRoom] = useState({
    name: "English",
    icon: uk,
  });
  const [chats, setChats] = useState<any[]>([]);
  const selectRef = useRef<any>(null);
  const lastChatItem = useRef<any>(null);
  const [textHeight, setTextHeight] = useState<number>(220);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setShowRooms(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchAPI("/api/chat", "get");
        setChats(response.data.chats.reverse());
        setTimeout(() => {
          if (lastChatItem.current) {
            lastChatItem.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 200);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [lastChatItem]);

  const handleClickRoom = useCallback(
    (name: any) => {
      const r = flags.find((item) => item.name === name);
      setShowRooms(!showRooms);
      if (!r) return;
      setRoom(r);
      (async () => {
        try {
          const response = await fetchAPI("/api/chat/room/" + r.name, "get");
          setChats(response.data.chats.reverse());
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [showRooms]
  );

  useEffect(() => {
    myEcho();
    const channel = window.Echo.channel("chat");
    channel.listen("MessageSent", (e: any) => {
      const message = e;
      if (e.room === room.name) {
        setChats((prev) => [...prev, message]);
        setTimeout(() => {
          if (lastChatItem.current) {
            lastChatItem.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 200);
      }
    });
    return () => {
      channel.stopListening("MessageSent");
    };
  }, [lastChatItem, room]);

  return (
    <>
      {showSidebar && (
        <div className="w-[280px] bg-[#181818] h-auto z-10">
          <div className="flex flex-col relative" ref={selectRef}>
            <div
              onClick={() => setShowRooms(!showRooms)}
              className="m-[18px_12px_13px_12px] cursor-pointer bg-[#6060600D] h-[37px] w-[250px] shadow-[0_1px_3px_-1px_#0000006E,_0_2px_0_-1px_#0000003D] rounded-[2px] p-3 flex justify-between items-center"
            >
              <div className="flex items-center gap-1">
                {room?.icon && (
                  <Image
                    src={room.icon}
                    className="w-[12px] h-[12px]"
                    alt="logo"
                  />
                )}
                <span className="text-[12px] font-medium text-[#D1D1D1]">
                  {room.name} Room
                </span>
              </div>

              <div className="flex items-center">
                {/* <div className="flex items-center justify-center w-[10px] h-[10px] bg-[#0DC5533D] rounded-full">
              <div className="w-[6px] h-[6px] bg-[#0DC553] rounded-full"></div>
            </div>
            <span className="text-[12px] font-medium text-[#6C6C6C] ml-[2px]">
              435/999
            </span> */}
                <div className="ml-[6px]">
                  <Image src={arrowBottom} alt="logo" />
                </div>
              </div>
            </div>

            {showRooms && (
              <div>
                <div className="absolute left-[12px] top-[60px] z-[11] w-[250px] h-[500px] bg-[#1E1E1E] border border-[#333541]">
                  <div className="p-3 flex flex-col items-start">
                    {flags.map((item, index) => (
                      <RoomItem
                        key={index}
                        name={item.name}
                        icon={item.icon}
                        online={50}
                        users={100}
                        onClick={handleClickRoom}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              <div
                className={`pl-3 gap-3 flex flex-col overflow-y-scroll message-list`}
                style={{ height: `calc(100vh - ${textHeight}px)` }}
              >
                {chats.map((item, index) => (
                  <MessageItem key={index} chat={item} />
                ))}
                <div ref={lastChatItem}></div>
              </div>

              <div className="p-3">
                <SendInput room={room.name} setTextHeight={setTextHeight} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!showSidebar && <OpenChat />}
    </>
  );
};

export default AppSidebar;

interface Room {
  name: any;
  icon: any;
  online: any;
  users: any;
  onClick: Function;
}

const RoomItem: FC<Room> = ({ name, icon, online, onClick }) => {
  const handleClickRoom = useCallback(() => {
    onClick(name);
  }, [onClick, name]);

  return (
    <div
      onClick={handleClickRoom}
      className="hover:bg-[#181818] text-[12px] w-full text-start p-2 rounded-sm text-white flex items-center hover:cursor-pointer"
    >
      <div className="flex items-center gap-1">
        {icon && <Image src={icon} className="w-[12px] h-[12px]" alt="logo" />}
        <span className="text-[12px] font-medium text-[#D1D1D1]">
          {name} Room
        </span>
      </div>
      {/* <span className="text-[12px] font-medium text-[#6C6C6C] ml-1">
        ({online})
      </span> */}
    </div>
  );
};
