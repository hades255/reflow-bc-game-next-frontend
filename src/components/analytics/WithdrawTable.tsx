import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { withdrawGetPending, withdrawApprove } from "@/services/analytics";
import { setToast } from "@/redux/slices/main/toastSlice";
import Pagination from "./Pagination";
import { ADMIN_TABLE_ITEMS_PER_PAGE, ADMIN_TABLE_SHOW_PAGES } from "@/utils";

import { MdOutlineEdit } from "react-icons/md";

const WithdrawSystem = () => {
  const perPage = ADMIN_TABLE_ITEMS_PER_PAGE;
  const showPages = ADMIN_TABLE_SHOW_PAGES;
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [withdrawList, setWithdrawList] = useState<any[]>([]);

  const dispatch = useDispatch();

  const getInfo = async (_page: number = page) => {
    let { data, status } = await withdrawGetPending({
      perPage,
      page: _page,
    });
    if (status === 200) {
      setWithdrawList(data.data.items);
      setTotal(data.data.total);
    }
  };

  useEffect(() => {
    (async () => {
      let { data, status } = await withdrawGetPending({
        perPage,
        page: 1,
      });
      if (status === 200) {
        setWithdrawList(data.data.items);
        setTotal(data.data.total);
      }
    })();
  }, [perPage]);

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

  const handleApprove = async (id: any) => {
    let { data, status } = await withdrawApprove({
      withdrawId: String(id),
    });

    if (status === 200) {
      dispatch(
        setToast({
          type: 2,
          message: "Withdraw approved.",
        })
      );
      await getInfo();
    } else {
      dispatch(
        setToast({
          type: 3,
          message: "Internal server error.",
        })
      );
    }
  };

  const clickPage = async (_page: number) => {
    setPage(_page);
    await getInfo(_page);
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <span className="text-[#717171] font-bold">
            Withdraw Pending System
          </span>
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
                Amount
              </th>
              <th className="text-sm font-semibold w-[10%] py-3 text-center">
                Type
              </th>
              <th className="text-sm font-semibold w-[15%] py-3 text-center">
                Status
              </th>
              <th className="text-sm font-semibold py-3 w-[20%] text-center">
                Created At
              </th>
              <th className="text-sm font-semibold py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawList.length === 0 ? (
              <tr className="w-full">
                <td colSpan={7} className="text-sm text-center p-2">
                  Empty Data
                </td>
              </tr>
            ) : (
              withdrawList.map((item, id) => (
                <tr
                  className={`w-full !h-[48px] ${
                    id % 2 === 1 ? "bg-[#1F1F1F]" : ""
                  }`}
                  key={`admin-${id}`}
                >
                  <td className="!w-20 text-sm text-left pl-[16px] py-1">
                    {(page - 1) * perPage + id + 1}
                  </td>
                  <td className="text-sm w-[25%] text-left">
                    {item?.user.name}
                  </td>
                  <td className="text-sm text-center w-[15%] py-1">
                    {item.amount}
                  </td>
                  <td className="text-sm w-[10%] text-center py-1 uppercase">
                    {item.type}
                  </td>
                  <td className="text-sm w-[15%] text-center py-1 capitalize">
                    {item.status}
                  </td>
                  <td className="text-sm w-[20%] text-center py-1">
                    {moment(item.created_at).format("YYYY-MM-DD")}
                  </td>
                  <td className="text-sm py-3 px-2">
                    <div className="h-full flex justify-center text-lg gap-3 text-gold">
                      <button onClick={() => handleApprove(item.id)}>
                        <MdOutlineEdit />
                      </button>
                      {/* <button onClick={() => deleteBonus(Number(bo.id))}>
                        <MdDeleteOutline />
                      </button> */}
                    </div>
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
    </>
  );
};

export default WithdrawSystem;
