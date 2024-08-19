import { FC, useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import BaseModal from "../Modal/BaseModal";
import Button from "../buttons/Button";
import { setToast } from "@/redux/slices/main/toastSlice";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  id: number;
  prev?: any;
  create?: (data: any) => void;
  update?: (data: any) => void;
  close: () => void;
}

const GenBonusCodeModal: FC<Props> = ({ id, prev, create, update, close }) => {

  const [name, setName] = useState<string>("");
  const [reward, setReward] = useState<number>();
  const [whitelist, setWhitelist] = useState<boolean>(true);
  const [limitLevel, setLimitLevel] = useState<number>();
  const [limitUsage, setLimitUsage] = useState<number>();
  const [collapse, setCollapse] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prev) {
      setName(prev.name);
      setReward(prev.reward);
      setWhitelist(prev.whitelist);
      setLimitLevel(prev.limit_level);
      setLimitUsage(prev.limit_usage);
    }
  }, [prev]);

  const generate = () => {
    if ( name !== "" && reward && reward > 0 && limitLevel && limitLevel > 0 && limitUsage && limitUsage > 0 ) {
      if (id === 0) {
        create && create({
          name,
          reward,
          whitelist,
          limitLevel,
          limitUsage
        })
      } else {
        update && update({
          id,
          name,
          reward,
          whitelist,
          limitLevel,
          limitUsage
        })
      }
    } else {
      dispatch(setToast({
        type: 4,
        message: 'Please check the form.'
      }));
    }
  }

  return (
    <BaseModal>
      <div className="w-[360px] rounded-xl bg-main">
        <h1 className="text-lg py-4 px-8 font-semibold text-font">
          {id === 0 ? "G" : "Re-g"}enerate a Bonus Code
        </h1>
        <hr className="border-[#707070]" />
        <div className="w-full py-4 px-8 flex flex-col gap-4 mt-4">
          <input
            type="text"
            className="py-3 px-4 block w-full text-sm rounded-md bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
            placeholder="Title"
            defaultValue={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <input
            type="number"
            className="py-3 px-4 block w-full text-sm rounded-md bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
            placeholder="Reward Coins"
            min="1"
            defaultValue={reward}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setReward(parseInt(e.target.value))}
          />
          <div className="hs-dropdown relative w-full inline-flex dropdown-wrapper h-[44px] px-4 bg-neutral-900 rounded-md border border-neutral-900 [--placement:bottom-right]">
            <button
              id="hs-dropdown"
              type="button"
              className="py-[6px] w-full text-[#707070] flex items-center gap-2 text-sm"
              onClick={() => setCollapse((prev) => !prev)}
            >
              <span className="flex-grow text-start">{whitelist ? "Whitelist" : "Player"}</span>
              <FaChevronDown className="hs-dropdown-open:rotate-180" />
            </button>
            {
              collapse &&
                <div
                  className="absolute top-0 right-0 hs-dropdown-menu transition-[opacity,margin] hs-dropdown-open:opacity-100 duration min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-[120] border border-neutral-900"
                  aria-labelledby="hs-dropdown"
                >
                  <button
                    className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                    onClick={() => { setCollapse((prev) => !prev); setWhitelist(true); }}
                  >
                    Whitelist
                  </button>
                  <button
                    className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                    onClick={() => { setCollapse((prev) => !prev); setWhitelist(false); }}
                  >
                    Player
                  </button>
                </div>
            }
            
          </div>
          <input
            type="number"
            className="py-3 px-4 block w-full text-sm rounded-md bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
            placeholder="Available Level"
            min="1"
            defaultValue={limitLevel}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLimitLevel(parseInt(e.target.value))}
          />
          <input
            type="number"
            className="py-3 px-4 block w-full text-sm rounded-md bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
            placeholder="Claims"
            min="1"
            defaultValue={limitUsage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLimitUsage(parseInt(e.target.value))}
          />
          <div className="w-full flex justify-between py-2">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-transparent border-2 border-neutral-900 px-3 py-[6px] text-sm font-bold text-white shadow-sm sm:mt-0 sm:w-auto"
              onClick={close}
            >
              Cancel
            </button>
            <Button
              text={id === 0 ? "Generate" : "Re-generate"}
              disabled={false}
              className="!w-28 !h-8"
              clicked={generate}
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default GenBonusCodeModal;
