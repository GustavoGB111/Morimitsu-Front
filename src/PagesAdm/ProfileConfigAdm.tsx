import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function ProfileConfigAdm() {
  const [showModal, setShowModal] = useState(false);
  const [showSavedModal] = useState(false);

  const handleSendCode = () => {
    setShowModal(true);
  };  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {onChange} = useAuth() 
  const [email, setEmail] = useState("")
  const userName = async () => {
    await onChange(email)
  }

  return (
    <div className="w-full h-screen md:h-full bg-black flex justify-center items-center p-5 md:p-0">
      {/* Container principal */}
      <div className="w-full h-[430px] md:w-[700px] md:h-[380px] bg-[#191A1C] rounded-[10px] flex flex-col justify-between md:justify-center items-center mb-[65px] md:mb-0 ">

        {/* Texto */}
        <p className="text-white text-2xl md:text-3xl font-arimo mb-0 md:mb-3 mt-8 md:mt-0">Configurações</p>

        {/* Caixas para inserir os dados para alteração */}
        <div className="w-full md:w-[600px] h-[180px] flex flex-col justify-center items-center p-5 md:p-0">

          {/* Input de Nome */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Nome"
            className="w-full h-[45px] rounded-[10px] text-lg font-arimo text-white placeholder-white bg-[#434343] focus:outline-none focus:ring-2 focus:ring-[#434343] p-4 m-2"
          />
          {/* Input de Senha */}
          <input
            type="Password"
            placeholder="Senha"
            className="w-full h-[45px] rounded-[10px] text-lg font-arimo text-white placeholder-white bg-[#434343] focus:outline-none focus:ring-2 focus:ring-[#434343] p-4 m-2"
          />
        </div>

        {/* Div com os botões de cancelar e salvar */}
        <div className="w-full md:w-[600px] h-[60px] flex flex-row items-center justify-between px-5 md:px-0 mb-8 md:mb-0">
          
          {/* Botão de cancelar */}
          <Link to="/ProfileAdm">
            <div className="w-[120px] h-[55px] bg-white rounded-[15px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer">
              <p className="text-black text-xl font-arimo">Cancelar</p>
            </div>
          </Link>

          {/* Botão de Salvar */}
          <div onClick={handleSendCode}>
            <div className="w-[120px] h-[55px] bg-[#BA1E22] rounded-[15px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer mx-auto md:mx-0">
              <p className="text-white text-xl font-arimo">Salvar</p>
            </div>
          </div>

        </div>
        
        {/* Telinha de confirmação */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="w-[250px] h-[150px] md:w-[400px] md:h-[300px] bg-[#222529] rounded-[15px] flex flex-col items-center justify-center text-center space-y-8 md:space-y-15">

              <p className="text-lg font-arimo text-white md:text-2xl">Deseja mesmo alterar os dados?</p>
              <div className="w-full h-auto flex flex-row justify-between px-3 md:px-10">

              {/* Botão de cancelar */}
              <div onClick={handleCloseModal} className="w-full md:w-[100px] flex justify-center">
                <div className="w-[90px] md:w-[120px] h-[45px] bg-white rounded-[10px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer">
                  <p className="text-black text-lg md:text-xl font-arimo">
                    Cancelar
                  </p>
                </div>
              </div>

              {/* Botão de aceitar */}
              <div onClick={userName} className="w-full md:w-[100px] flex justify-center">
                <div className="w-[90px] md:w-[120px] h-[45px] bg-[#BA1E22] rounded-[10px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer">
                  <p className="text-white text-lg md:text-xl font-arimo">
                    Alterar
                  </p>
                </div>
              </div>
            </div>

            </div>
          </div>
        )}

        {/* modal para quando apertar em salvar */}
        {showSavedModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="w-[250px] h-[150px] md:w-[400px] md:h-[300px] bg-[#222529] rounded-[15px] flex flex-col items-center justify-center text-center space-y-5">

              <p className="text-lg font-arimo text-white md:text-2xl">Dados Alterados!</p>

              <Link to="/ProfileAdm" className="w-full md:w-[100px] flex justify-center">
                <div className="w-[80px] h-[45px] bg-[#BA1E22] rounded-[15px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer">
                  <p className="text-white text-lg md:text-xl font-arimo">ok</p>
                </div>
              </Link>

            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}