import { useState, useEffect, useCallback, FC } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import moment from "moment";
import { withdrawGetPending, withdrawApprove, withdrawCancel } from "@/services/analytics";
import { setToast } from "@/redux/slices/main/toastSlice";
import Pagination from "./Pagination";
import { ADMIN_TABLE_ITEMS_PER_PAGE, ADMIN_TABLE_SHOW_PAGES } from "@/utils";

import { MdDeleteOutline, MdOutlineCheck } from "react-icons/md";
import IconTransactions from "@/utils/icons/Transactions";

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

  const handleCancel = async (id: any) => {
    let { data, status } = await withdrawCancel({
      withdrawId: String(id),
    });

    if (status === 200) {
      dispatch(
        setToast({
          type: 2,
          message: "Withdraw canceled.",
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
          <span className="text-[#717171] font-bold my-2">
            Withdraw Pending System
          </span>
        </div>
        <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden">
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
                Currency
              </th>
              <th className="text-sm font-semibold w-[15%] py-3 text-center">
                Status
              </th>
              <th className="text-sm font-semibold py-3 text-center">
                Transaction
              </th>
              <th className="text-sm font-semibold py-3 !w-20 text-center">
                Created
              </th>
              <th className="text-sm font-semibold py-3 px-2 text-center">
                Action
              </th>
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
                <WithdrawListItem
                  key={`admin-${id}-${item.amount}-${item.user_id}`}
                  item={item}
                  id={id}
                  page={page}
                  perPage={perPage}
                  onApprove={handleApprove}
                  onCancel={handleCancel}
                />
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

const WithdrawListItem: FC<{
  item: any;
  id: number;
  page: number;
  perPage: number;
  onApprove: Function;
  onCancel: Function;
}> = ({ item, id, page, perPage, onApprove, onCancel }) => {
  const router = useRouter();

  const handleApprove = useCallback(() => {
    onApprove(item.id);
  }, [onApprove, item]);

  const handleCancel = useCallback(() => {
    onCancel(item.id);
  }, [onCancel, item]);

  const handleViewTransaction = useCallback(() => {
    router.push(`/profile/admin/transaction/${item.user_id}`);
  }, [item, router]);

  return (
    <tr className={`w-full !h-[48px] ${id % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}>
      <td className="text-sm text-left pl-[16px] py-1">
        {(page - 1) * perPage + id + 1}
      </td>
      <td className="text-sm text-left">{item?.user.name}</td>
      <td className="text-sm text-center py-1">{item.amount}</td>
      <td className="text-sm text-center py-1 uppercase">{item.type}</td>
      <td className="text-sm text-center py-1 capitalize">{item.status}</td>
      <td className="px-2">
        <div className="w-full h-full flex justify-center items-center">
          <button onClick={handleViewTransaction}>
            <IconTransactions color={`#E9AE15`} width={12} height={14} />
          </button>
        </div>
      </td>
      <td className="text-sm text-center py-1">
        {moment(item.created_at).format("YYYY-MM-DD")}
      </td>
      <td className="text-sm py-3 px-2">
        <div className="h-full flex justify-center text-lg gap-3 text-gold">
          <button onClick={handleApprove}>
            <MdOutlineCheck />
          </button>
          <button onClick={handleCancel}>
            <MdDeleteOutline />
          </button>
        </div>
      </td>
    </tr>
  );
};
