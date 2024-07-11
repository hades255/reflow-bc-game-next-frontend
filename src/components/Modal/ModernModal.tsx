import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { closeModal } from "@/redux/slices/main/modalSlice";

interface Props {
  title: string;
  content: string;
  name: string;
  type: number;
  parameter: any;
}

const ModernModal: React.FC<Props> = ({
  title,
  content,
  name,
  type,
  parameter,
}) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const handleClick = () => {
    dispatch(closeModal());
    if (type === 1) {
      router.push(parameter);
    }
  };

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-[#1d1d1d] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-[#1d1d1d] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 bg-opacity-30 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-white"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-white">{content}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1d1d1d] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
              {type !== 3 && (
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto border border-yellow-600"
                  onClick={handleClick}
                >
                  {name}
                </button>
              )}
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-transparent border-2 border-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:mt-0 sm:w-auto"
                onClick={() => dispatch(closeModal())}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernModal;
