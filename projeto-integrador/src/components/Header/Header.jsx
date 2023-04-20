import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import { CreateAccount } from "./CreateAccount";
import { Login } from "./Login";
import {
  FacebookLogo,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  Notebook,
  Gear,
  Heart,
  X,
} from "@phosphor-icons/react";
import { AuthContext } from "../../provider/auth";
import axios from "axios";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {
    isLogged,
    setIsLogged,
    getUserByToken,
    user,
    loading,
    setLoading,
    setIsAdmin,
    getTokenLocalStorage,
    setToken,
    setIsAuthenticated,
    isAdmin,
  } = useContext(AuthContext);

  const location = useLocation();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef]);

  useEffect(() => {
    async function fetchUser() {
      if (localStorage.getItem("token")) {
        getUserByToken();
        getTokenLocalStorage();
      }
    }
    fetchUser();
  }, [isLogged]);

  const logout = async () => {
    if (localStorage.getItem("tokenGoogle")) {
      const accessToken = localStorage.getItem("tokenGoogle");

      try {
        const res = await axios.post(
          "https://accounts.google.com/o/oauth2/revoke?token=" + accessToken
        );

        // console.log(res.status);

        localStorage.removeItem("token");
        localStorage.removeItem("tokenGoogle");
        setIsAuthenticated(false);
        setIsLogged(false);
        setIsAdmin(false);
        setToken(null);
      } catch (e) {
        // console.log(e);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenGoogle");
      setIsAuthenticated(false);
      setIsLogged(false);
      setIsAdmin(false);
      setToken(null);
    }

    window.scrollTo(0, 0);
    navigate("/home");
  };

  if (loading) {
    return <div className="h-screen">Carregando...</div>;
  }

  return (
    <>
      <header
        className={`w-full text-blax bg-white p-1 ${
          location.pathname === "/home" || location.pathname === "/home/"
            ? "fixed z-10"
            : ""
        }`}
      >
        <div className="w-full text-blax bg-white p-3">
          <div className="container mx-auto grid grid-cols-2 items-center">
            <div className="mr-4">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/home");
                }}
              >
                <img src={logo} alt="logo da empresa" />
              </button>
            </div>

            <div className="ml-auto md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={menu} alt="menu" />
              </button>
            </div>

            <div className="ml-auto hidden md:flex">
              {location.pathname === "/home/registrationForm" && (
                <>
                  <Login />
                </>
              )}

              {location.pathname === "/home/login" && <CreateAccount />}

              {location.pathname !== "/home/registrationForm" &&
                location.pathname !== "/home/login" && (
                  <>
                    {isLogged ? (
                      <div className="flex justify-center items-center  lg:gap-3">
                        {isAdmin && (
                          <div className="text-dark-purple font-bold border-green border-r-2">
                            <button
                              onClick={() => {
                                window.scrollTo(0, 0);
                                navigate("/home/administrator");
                                setIsMenuOpen(!isMenuOpen);
                              }}
                              className="text-sm m-2 flex flex-col items-center"
                            >
                              <Gear size={24} />
                              Administrar
                            </button>
                          </div>
                        )}

                        <div className="text-dark-purple font-bold">
                          <button
                            className="text-sm m-2 flex flex-col items-center"
                            onClick={() => {
                              setIsAuthenticated(true);
                              setIsMenuOpen(false);
                              window.scrollTo(0, 0);
                              navigate(`/home/myReservations`);
                            }}
                          >
                            <Notebook size={24} />
                            Minhas Reservas
                          </button>
                        </div>

                        <div className="text-dark-purple font-bold">
                          <button
                            className="text-sm m-2 flex flex-col items-center"
                            onClick={() => {
                              setIsAuthenticated(true);
                              setIsMenuOpen(false);
                              window.scrollTo(0, 0);
                              navigate(`home/myFavorites`);
                            }}
                          >
                            <Heart size={24} />
                            Meus Favoritos
                          </button>
                        </div>

                        <div className="">
                          <button className="bg-dark-purple text-white rounded-full w-10 h-10 mx-2 capitalize text-center flex items-center justify-center">
                            {isLogged &&
                              user.body.firstname.slice(0, 2).toUpperCase()}
                          </button>
                        </div>
                        <div className="flex flex-col font-bold">
                          <span className="mx-2 text-dark-purple capitalize md:text-sm">
                            Olá,
                          </span>
                          <span className="text-green capitalize md:text-sm">
                            {user.body.firstname}
                          </span>
                        </div>

                        <button
                          onClick={logout}
                          className="font-bold px-4 py-2 rounded mr-2"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <CreateAccount />
                        <Login />
                      </>
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
        {isMenuOpen ? (
          <div
            ref={menuRef}
            className="h-screen flex-1 top-0 fixed z-10 bg-white right-0  w-1/2 md:hidden overflow-hidden"
          >
            <div className="flex flex-1 flex-col justify-between h-screen overflow-hidden">
              <div className="flex flex-col">
                <div className="bg-green h-36 w-full text-white relative">
                  {!isLogged ? (
                    <span className="font-bold text-end absolute bottom-0 right-0">
                      MENU
                    </span>
                  ) : (
                    <div className="font-bold text-end absolute bottom-0 right-3">
                      <div className="flex flex-col text-center items-end">
                        <div className="rounded-full bg-white h-8 w-8 flex items-center justify-center m-1">
                          <span className="text-dark-purple font-bold">
                            {" "}
                            {isLogged &&
                              user.body.firstname.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="text-white capitalize">
                            Olá, {user.body.firstname}
                          </span>
                        </div>
                        <div>
                          <span className="text-dark-purple capitalize">
                            {user.body.firstname} {user.body.lastname}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    className="font-bold text-lg m-3"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <X size={24} />
                  </button>
                </div>

                {isLogged ? (
                  <>
                    {isAdmin ? (
                      <div className="border-dark-purple border-b-2 flex justify-end my-2">
                        <button
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/home/administrator");
                            setIsMenuOpen(!isMenuOpen);
                          }}
                          className="text-dark-purple font-bold m-1 flex gap-2"
                        >
                          <Gear size={24} />
                          Administrar
                        </button>
                      </div>
                    ) : null}

                    <div className="border-dark-purple border-b-2 flex justify-end my-2">
                      <button
                        onClick={() => {
                          setIsAuthenticated(true);
                          setIsMenuOpen(false);
                          window.scrollTo(0, 0);
                          navigate(`/home/myReservations`);
                        }}
                        className="text-dark-purple font-bold m-1 flex gap-2"
                      >
                        <Notebook size={24} /> Minhas Reservas
                      </button>
                    </div>

                    <div className="border-dark-purple border-b-2 flex justify-end my-2">
                      <button
                        onClick={() => {
                          setIsAuthenticated(true);
                          setIsMenuOpen(false);
                          window.scrollTo(0, 0);
                          navigate(`/home/myFavorites`);
                        }}
                        className="text-dark-purple font-bold m-1 flex gap-2"
                      >
                        <Heart size={24} /> Meus Favoritos
                      </button>
                    </div>
                  </>
                ) : null}

                {!isLogged ? (
                  <>
                    {location.pathname !== "/home/registrationForm" && (
                      <div className="border-dark-purple border-b-2 text-right my-2">
                        <button
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/home/registrationForm");
                            setIsMenuOpen(!isMenuOpen);
                          }}
                          className="text-dark-purple font-bold m-1"
                        >
                          Criar conta
                        </button>
                      </div>
                    )}
                    {location.pathname !== "/home/login" && (
                      <div className="text-right border-dark-purple border-b-2">
                        <button
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/home/login");
                            setIsMenuOpen(!isMenuOpen);
                          }}
                          className="text-dark-purple font-bold m-1"
                        >
                          Fazer login
                        </button>
                      </div>
                    )}{" "}
                  </>
                ) : null}
              </div>

              <div className="fixed bottom-0 right-0 text-end w-1/2">
                {isLogged ? (
                  <div className="m-2 border-b-2 border-dark-purple text-xs font-bold">
                    <div className="">
                      <p className="text-dark-purple">
                        Deseja{" "}
                        <button className="text-green" onClick={logout}>
                          encerrar a sessão
                        </button>
                        ?
                      </p>
                    </div>
                  </div>
                ) : null}
                <div className="flex justify-end">
                  <FacebookLogo
                    color="#383b58"
                    size={24}
                    weight="bold"
                    className="mx-3"
                  />
                  <LinkedinLogo
                    color="#383b58"
                    size={24}
                    weight="bold"
                    className="mx-3"
                  />
                  <TwitterLogo
                    color="#383b58"
                    size={24}
                    weight="bold"
                    className="mx-3"
                  />
                  <InstagramLogo
                    color="#383b58"
                    size={24}
                    weight="bold"
                    className="mx-3"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>
      <Outlet />
    </>
  );
}
