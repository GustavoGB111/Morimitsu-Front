interface ModalProps {
    msg: string;
    showSavedModal: boolean;
    handleOk: () => void;
  }
  
  export function Modal({ msg, showSavedModal, handleOk }: ModalProps) {
    if (!showSavedModal) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="w-[250px] h-[150px] md:w-[400px] md:h-[300px] bg-[#222529] rounded-[15px] flex flex-col items-center justify-center text-center space-y-5">
          <p className="text-lg font-arimo text-white md:text-2xl">{msg}</p>
  
          <div onClick={handleOk} className="w-full md:w-[100px] flex justify-center">
            <div className="w-[80px] h-[45px] bg-[#BA1E22] rounded-[15px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer">
              <p className="text-white text-lg md:text-xl font-arimo">Ok</p>
            </div>
          </div>
  
        </div>
      </div>
    );
  }
  