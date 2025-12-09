import Logo from "../assets/Logo.png";
import Background from "../assets/Background.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function ForgotPassword() {
  const [showModal, setShowModal] = useState(false);

  const handleSendCode = () => {
    setShowModal(true);
  };

  const {onRequest} = useAuth()
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const handleRequest = async () => {
    await onRequest(email);
    navigate("/InsertPin");
  };

  return (
    <div className="w-screen h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${Background})` }}>
      <div className="bg-black/80 w-screen h-screen flex items-center justify-center p-5">
        {/* Container principal */}
        <div className="flex flex-col md:flex-row bg-[#191A1C] rounded-[15px] items-center justify-center w-full md:w-[1100px] h-[450px] md:h-[580px] p-5 md:p-0">
          
          {/* Formulário */}
          <div className="w-full md:w-[600px] h-[400px] md:bg-[#222529]  rounded-[15px] flex flex-col justify-center items-center p-5 md:p-10">
            
            {/* Logo */}
            <div className="w-[200px] flex justify-center mb-25 md:mb-15 ">
              <img
                className="w-2/3 md:w-[170px] h-auto object-contain"
                src={Logo}
                alt="Logo"
              />
            </div>

            {/* Campo de Email */}
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="w-full md:w-[550px] h-[45px] md:h-[60px] rounded-[15px] text-base md:text-lg font-arimo  text-white placeholder-white bg-[#6D6D6E] focus:outline-none focus:ring-2 focus:ring-[#6D6D6E] p-4 md:p-4 mb-20 md:mb-10"
            />

            {/* Botões */}
            <div className="flex flex-row justify-between items-center w-full md:w-[550px] gap-4 md:gap-0 mb-4 md:mb-0">
              {/* Botão Voltar */}
              <Link to="/Login" className="w-full md:w-[100px]">
                <div className="w-[80px] h-[45px] md:h-[50px] bg-white rounded-[15px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer">
                  <p className="text-black text-lg md:text-xl font-arimo">
                    Voltar
                  </p>
                </div>
              </Link>

              {/* Botão Enviar código */}
              <div onClick={handleSendCode}>
                <div className="w-[150px] h-[45px] md:h-[50px] bg-[#BA1E22] rounded-[15px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer">
                  <p className="text-white text-lg md:text-xl font-arimo">
                    Enviar código
                  </p>
                </div>
              </div>

              {/* Telinha de aviso */}
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-[250px] h-[150px] md:w-[400px] md:h-[300px] bg-[#222529] rounded-[15px] flex flex-col items-center justify-center text-center space-y-5">

                    <p className="text-lg font-arimo text-white md:text-2xl">Código enviado!</p>

                      <div onClick={handleRequest} className= "w-[80px] h-[45px] bg-[#BA1E22] rounded-[15px] flex items-center justify-center transition-all hover:scale-105 cursor-pointer">
                        <p className="text-white text-lg md:text-xl font-arimo">
                          ok
                        </p>
                      </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}