import { User } from "@supabase/supabase-js";

function ModalConfirm({
  isAlertDelete,
  setIsAlertDelete,
  onConfirm,
  message,
}: {
  isAlertDelete: boolean;
  setIsAlertDelete: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (user: User) => void;
  message: string;
}) {
  const handleConfirm = (user: User) => {
    onConfirm(user);
  };
  return (
    <>
      {isAlertDelete ? (
        <div className="fixed bg-black/30 inset-0 flex items-center justify-center w-full max-h-full z-50">
          <div className="relative bg-white rounded-lg">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
              onClick={() => setIsAlertDelete(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => handleConfirm({} as User)}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Sí, estoy seguro
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => setIsAlertDelete(false)}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ModalConfirm;
