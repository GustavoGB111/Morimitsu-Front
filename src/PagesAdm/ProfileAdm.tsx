import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUserDelete } from "react-icons/ai";
import {BsPersonGear} from "react-icons/bs"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function ProfileAdm() {
  const {onLogout} = useAuth()

  const handleLogout = async () => {
    await onLogout()
  }

  const navigate = useNavigate()
  return (
    <div className="w-full h-screen md:h-full bg-black p-5 md:p-10 flex justify-center items-center">
      <div className="w-full h-[450px] md:h-full bg-[#191A1C] rounded-[10px] flex flex-col mb-[65px] md:mb-0 ">

        {/* Div com imagem e o nome do usuário */}
        <div className="w-full h-1/2 flex flex-col justify-center items-center">
          <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-[#222529] rounded-full flex overflow-hidden justify-center items-center m-3 mb-3">
            <AiOutlineUser className="w-[120px] h-[120px] md:w-[150px] md:h-[150px]"/>
          </div>
          <p className="text-white text-2xl md:text-3xl font-arimo m-3">Nome do usuário</p>
        </div>

        {/* Div com os botões de Logout e Configurações */}
        <div className="w-full h-1/2 flex flex-col md:flex-row justify-center items-center">

          {/* Botão de Logout */}
    
            <div onClick={handleLogout} className="w-[200px] h-[50px] md:w-[180px] md:h-[180px] bg-[#A70000] rounded-[10px] m-3 md:m-5 border-1 border-white flex flex-row-reverse md:flex-col justify-end md:justify-center items-center text-white transition-all hover:scale-102 cursor-pointer px-3 md:px-0">
              <p className="text-xl md:text-2xl font-arimo">Logout</p>
              <AiOutlineUserDelete className="w-[40px] h-[40px] md:w-[130px] md:h-[130px]"/>
            </div>
    
                
          {/* Botão de Configurações */}

              <div onClick={() => navigate("/ProfileConfigAdm")} className="w-[200px] h-[50px] md:w-[180px] md:h-[180px] bg-[#4D0000] rounded-[10px] m-3 md:m-5 border-1 border-white flex flex-row-reverse md:flex-col justify-end md:justify-center items-center text-white transition-all hover:scale-102 cursor-pointer px-3 md:px-0">
                  <p className="text-xl md:text-2xl font-arimo">Configurações</p>
                  <BsPersonGear className="w-[40px] h-[40px] md:w-[130px] md:h-[130px]"/>
              </div>
        
          
        </div>
      </div>
    </div>
  );
}