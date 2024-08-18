import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Button from "../buttons/Button";
import {
  getBonuses,
  createBonus,
  updateBonus,
  removeBonus,
} from "@/services/analytics";
import { setToast } from "@/redux/slices/main/toastSlice";
import Pagination from "./Pagination";
import GenBonusCodeModal from "./GenBonusCodeModal";
import { BonusType } from "@/utils/types";
import { FaChevronDown } from "react-icons/fa";
import { PiCoinsLight } from "react-icons/pi";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

const BonusSystem = () => {
  const [whitelist, setWhitelist] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  const perPage = 2;
  const showPages = 3;
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [bonuses, setBonuses] = useState<BonusType[]>([]);
  const [openModal, setOpenModal] = useState<number>(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { data, status } = await getBonuses({
        perPage,
        page,
        search,
        valid,
        whitelist,
      });
      if (status === 200) {
        setBonuses(data.data.items);
        setPage(1);
        setFirstPage(1);
        setTotal(data.data.total);
      }
    })();
  }, [whitelist, valid]);

  useEffect(() => {
    (async () => {
      let { data, status } = await getBonuses({
        perPage,
        page,
        search,
        valid,
        whitelist,
      });
      if (status === 200) {
        setBonuses(data.data.items);
        setTotal(data.data.total);
      }
    })();
  }, [page]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    let { data, status } = await getBonuses({
      perPage,
      page,
      search: e.target.value,
      valid,
      whitelist,
    });
    if (status === 200) {
      setBonuses(data.data.items);
      setPage(1);
      setFirstPage(1);
      setTotal(data.data.total);
    }
  };

  const handleFilterWhitelist = (val: boolean) => {
    setPage(1);
    setWhitelist(val);
  };

  const handleFilterValid = (val: boolean) => {
    setPage(1);
    setValid(val);
  };

  const handleNextPage = () => {
    if (firstPage + showPages - 1 === page) {
      setFirstPage((prev) => prev + 1);
    }
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (firstPage === page) {
      setFirstPage((prev) => prev - 1);
    }
    setPage((prev) => prev - 1);
  };

  const genBonusCode = async (params: any) => {
    let { data, status } = await createBonus(params);
    if (status === 200) {
      setOpenModal(-1);
      setPage(1);
      setFirstPage(1);
      dispatch(
        setToast({
          type: 2,
          message: "New bonus code is created successfully.",
        })
      );
      let newBonuses = await getBonuses({
        perPage,
        page,
        search,
        valid,
        whitelist,
      });
      if (newBonuses.status === 200) {
        setBonuses(newBonuses.data.data.items);
        setTotal(newBonuses.data.data.total);
      }
    } else {
      dispatch(
        setToast({
          type: 3,
          message: "Internal server error.",
        })
      );
    }
  };

  const update = async (params: any) => {
    let { data, status } = await updateBonus(params);
    if (status === 200) {
      setOpenModal(-1);
      setFirstPage(1);
      dispatch(
        setToast({
          type: 2,
          message: "Existing bonus code is updated successfully.",
        })
      );
      let newBonuses = await getBonuses({
        perPage,
        page,
        search,
        valid,
        whitelist,
      });
      if (newBonuses.status === 200) {
        setBonuses(newBonuses.data.data.items);
        setTotal(newBonuses.data.data.total);
      }
    } else {
      dispatch(
        setToast({
          type: 3,
          message: "Internal server error.",
        })
      );
    }
  }

  const deleteBonus = async (id: number) => {
    let { data, status } = await removeBonus(id);
    if ( status === 200) {
      setOpenModal(-1);
      dispatch(
        setToast({
          type: 2,
          message: "Existing bonus code is removed.",
        })
      );
      let newBonuses = await getBonuses({
        perPage,
        page,
        search,
        valid,
        whitelist,
      });
      if (newBonuses.status === 200) {
        setBonuses(newBonuses.data.data.items);
        setTotal(newBonuses.data.data.total);
      }
    } else {
      dispatch(
        setToast({
          type: 3,
          message: "Internal server error.",
        })
      );
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <span className="text-[#717171] font-bold">Bonus Coins System</span>
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
                id="hs-dropdown-default2"
                type="button"
                className="py-[6px] px-2 text-[#707070] flex items-center gap-2 text-sm"
              >
                <span>{whitelist ? "Whitelist" : "Player"}</span>
                <FaChevronDown className="hs-dropdown-open:rotate-180" />
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
                aria-labelledby="hs-dropdown-default2"
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
            <div className="hs-dropdown relative inline-flex !z-30 h-8 bg-transparent rounded-sm border border-[#252525]">
              <button
                id="hs-dropdown-default3"
                type="button"
                className="py-[6px] px-2 text-[#707070] flex items-center gap-2 text-sm"
              >
                <span>{valid ? "Valid" : "Invalid"}</span>
                <FaChevronDown className="s-dropdown-open:rotate-180" />
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
                aria-labelledby="hs-dropdown-default3"
              >
                <button
                  className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                  onClick={() => handleFilterValid(true)}
                >
                  Valid
                </button>
                <button
                  className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                  onClick={() => handleFilterValid(false)}
                >
                  Invalid
                </button>
              </div>
            </div>
            <Button
              text={"+  Add"}
              disabled={false}
              className="!w-24 !h-8"
              clicked={() => setOpenModal((prev) => prev + 1)}
            />
          </div>
        </div>
        <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden my-2">
          <thead className="">
            <tr className="w-full !h-[48px] bg-[#1F1F1F] rounded-[5px]">
              <th className="!w-20 text-sm font-semibold text-left pl-[12px] py-3">
                No.
              </th>
              <th className="text-sm font-semibold w-[25%] text-left py-3">
                Name
              </th>
              <th className="text-sm font-semibold w-[15%] text-center py-3">
                Code
              </th>
              <th className="text-sm font-semibold w-[10%] py-3 text-center">
                Reward
              </th>
              <th className="text-sm font-semibold w-[15%] py-3 text-center">
                Available Level
              </th>
              <th className="text-sm font-semibold py-3 w-[20%] text-center">
                Claims
              </th>
              <th className="text-sm font-semibold py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              bonuses.length === 0 ?
              <tr className="w-full">
                <td colSpan={7} className="text-sm text-center p-2">Empty Data</td>
              </tr>
            : bonuses.map((bo, id) => (
              <tr
                className={`w-full !h-[48px] ${
                  id % 2 === 1 ? "bg-[#1F1F1F]" : ""
                }`}
                key={`admin-${id}`}
              >
                <td className="!w-20 text-sm text-left pl-[16px] py-1">
                  {(page - 1) * perPage + id + 1}
                </td>
                <td className="text-sm w-[25%] text-left">{bo.name}</td>
                <td className="text-sm text-center w-[15%] py-1">{bo.code}</td>
                <td className="text-sm w-[10%] text-center py-1">
                  <div className="w-full h-full flex justify-center items-center gap-2">
                    <span className="text-[#e9ae15]">
                      <PiCoinsLight />
                    </span>{" "}
                    {bo.reward}
                  </div>
                </td>
                <td className="text-sm w-[15%] text-center py-1">
                  + {bo.limit_level} Lvl.
                </td>
                <td className="text-sm w-[20%] text-center py-1">
                  {`${bo.limit_usage} / ${bo.current_usage}`}
                </td>
                <td className="text-sm py-3 px-2">
                  <div className="h-full flex justify-center text-lg gap-3 text-gold">
                    <button onClick={() => setOpenModal(Number(bo.id))}>
                      <MdOutlineEdit />
                    </button>
                    <button onClick={() => deleteBonus(Number(bo.id))}>
                      <MdDeleteOutline />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
          setPage={setPage}
        />
      </div>
      {openModal !== -1 && (
        <GenBonusCodeModal
          id={openModal}
          prev={bonuses.filter((bo) => bo.id === openModal)[0]}
          create={genBonusCode}
          update={update}
          close={() => setOpenModal(-1)}
        />
      )}
    </>
  );
};

export default BonusSystem;
