import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Button from "../buttons/Button";
import { getUsers, setWhite } from "@/services/analytics";
import { setToast } from "@/redux/slices/main/toastSlice";
import Pagination from "./Pagination";
import { WhitelistType } from "@/utils/types";
import { ADMIN_TABLE_ITEMS_PER_PAGE, ADMIN_TABLE_SHOW_PAGES } from "@/utils";
import { FaChevronDown } from "react-icons/fa";

const SettingWhitelist = () => {
  const [whitelist, setWhitelist] = useState<boolean>(true);
  const perPage = ADMIN_TABLE_ITEMS_PER_PAGE;
  const showPages = ADMIN_TABLE_SHOW_PAGES;
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [whitelists, setWhitelists] = useState<WhitelistType[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const dispatch = useDispatch();

  const getInfo = async (_page: number = page, _search: string = search, _whitelist: boolean = whitelist) => {
    let { data, status } = await getUsers({
      perPage,
      page: _page,
      search: _search,
      whitelist: _whitelist,
    });
    if (status === 200) {
      setWhitelists(data.data.items);
      setTotal(data.data.total);
    }
  }

  useEffect(() => {
    (async () => {
      let { data, status } = await getUsers({
        perPage,
        page: 1,
        search: "",
        whitelist: true,
      });
      if (status === 200) {
        setWhitelists(data.data.items);
        setTotal(data.data.total);
      }
    })();
  }, []);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    setFirstPage(1);
    await getInfo(1, e.target.value);
  };

  const handleFilterWhitelist = async (val: boolean) => {
    setPage(1);
    setFirstPage(1);
    setWhitelist(val);
    await getInfo(1, search, val);
  };

  const handleSet = async (id: number) => {
    setSelected(id);
    let { status } = await setWhite([{ userId: id, whitelist: !whitelist }]);
    if (status === 200) {
      dispatch(
        setToast({
          type: 2,
          message: `${whitelist ? "Whitelist" : "Player"} "${
            whitelists.filter((ad) => ad.id === id)[0].name
          }" is set as ${whitelist ? "a Player" : "an Whitelist"}.`,
        })
      );
      if (whitelists.length === 1) {
        let current = page - 1 > 1 ? page - 1 : 1;
        setPage(current);
        setFirstPage(current - showPages + 1 > 1 ? current - showPages + 1 : 1);
        await getInfo(current);
      } else {
        await getInfo();
      }
    } else {
      dispatch(
        setToast({
          type: 3,
          message: `Server internal error.`,
        })
      );
    }
    setSelected(0);
  };

  const handleNextPage = async () => {
    if (firstPage + showPages - 1 === page) {
      setFirstPage((prev) => prev + 1);
    }
    setPage((prev) => prev + 1);
    await getInfo(page + 1);
  };

  const handlePrevPage = async () => {
    if (firstPage === page) {
      setFirstPage((prev) => prev - 1);
    }
    setPage((prev) => prev - 1);
    await getInfo(page - 1);
  };

  const clickPage = async (_page: number) => {
    setPage(_page);
    await getInfo(_page);
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <span className="text-[#717171] font-bold">Set Whitelists</span>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="bg-transparent w-36 h-8 px-1 black-input border border-[#252525] rounded-sm placeholder:text-sm placeholder:text-[#707070] placeholder:pl-1"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
          <div className="hs-dropdown relative inline-flex !z-30 h-8 bg-transparent rounded-sm border border-[#252525]">
            <button
              id="hs-dropdown-default"
              type="button"
              className="py-[6px] px-2 text-[#707070] flex items-center gap-2 text-sm"
            >
              <span>{whitelist ? "Whitelist" : "Player"}</span>
              <FaChevronDown className="s-dropdown-open:rotate-180" />
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-default"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleFilterWhitelist(true)}
              >
                Whitelist
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleFilterWhitelist(false)}
              >
                Player
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden my-2">
        <thead className="">
          <tr className="w-full h-[33px] bg-[#1F1F1F] rounded-[5px]">
            <th className="w-20 text-sm font-semibold text-left pl-[12px] py-3">
              No.
            </th>
            <th className="text-sm font-semibold w-28 text-left py-3">User</th>
            <th className="text-sm font-semibold text-center py-3 flex gap-2 justify-center items-center">
              Status
            </th>
            <th className="text-sm font-semibold w-32 py-3 text-center">
              Set as:
            </th>
          </tr>
        </thead>
        <tbody>
          {whitelists.length === 0 ? (
            <tr className="w-full">
              <td colSpan={4} className="p-2 text-sm text-center">
                Empty Data
              </td>
            </tr>
          ) : (
            whitelists.map((ad, id) => (
              <tr
                className={`w-full ${id % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
                key={`whitelist-${id}`}
              >
                <td className="w-20 text-sm text-left pl-[16px] py-1">
                  {(page - 1) * perPage + id + 1}
                </td>
                <td className="text-sm w-36 h-full text-left py-3 flex gap-2 items-center">
                  <Image
                    width={24}
                    height={24}
                    className="rounded-sm"
                    src={ad.avatar}
                    alt=""
                  />
                  <span>{ad.name}</span>
                </td>
                <td className="text-sm text-center py-1">
                  {ad.is_whitelist ? "Whitelist" : "Player"}
                </td>
                <td className="text-sm w-32 py-2 px-2">
                  <Button
                    text={ad.is_whitelist ? "Player" : "Whitelist"}
                    disabled={ad.id === selected}
                    className="!w-28"
                    clicked={() => handleSet(ad.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        page={page}
        total={total}
        perPage={perPage}
        showPages={showPages}
        firstPage={firstPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        setPage={clickPage}
      />
    </div>
  );
};

export default SettingWhitelist;
