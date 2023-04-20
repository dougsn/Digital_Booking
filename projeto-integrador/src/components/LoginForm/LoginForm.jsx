import { useState, useContext, useEffect } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/auth";
import api from "../../services/api";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import "react-toastify/dist/ReactToastify.css";
import { CommonInput } from "../CommonInput/CommonInput";
import { CommonButton } from "../CommonButton/CommonButton";
import { HeadHelmet } from "../HeadHelmet/HeadHelmet";
import og_image from "../../assets/og_image.jpg";

const clientId =
  "852537013924-agq7f43jnccjmmt7nk3qcvbmv7hsdro1.apps.googleusercontent.com";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    setToken,
    setTokenLocalStorage,
    setTokenGoogleLocalStorage,
    setIsLogged,
    setLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSuccessLoginGoogle = async (res) => {
    // console.log(res);
    const loginData = {
      email: res.wt.cu,
      password: res.wt.NT,
    };

    try {
      // Usuário do google já possui conta no sistema

      const response = await api.post("/authentication/login", {
        ...loginData,
      });
      const status = response.status;
      if (status === 200) {
        const data = await response.data;
        // console.log(data.token);
        setToken(data.token);
        setTokenLocalStorage(data.token);
        setTokenGoogleLocalStorage(res.accessToken);
        setLoading(true);
        setIsLogged(true);
        const message = "Usuário logado com sucesso!";
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      navigate("/home");
    } catch (e) {
      // Usuário do google não possui conta no sistema

      const registration = {
        firstname: res.wt.rV,
        lastname: res.wt.uT,
        email: res.wt.cu,
        password: res.wt.NT,
      };

      if (e.request.status === 403) {
        try {
          const response = await api.post("/authentication/register", {
            ...registration,
          });
          const status = await response.status;
          if (status === 201) {
            const data = await response.data;
            setToken(data.token);
            setTokenLocalStorage(data.token);
            setTokenGoogleLocalStorage(res.accessToken);
            setLoading(true);
            setIsLogged(true);
            setIsAuthenticated(true);

            const message = "Usuário logado com sucesso!";

            toast.success(message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            navigate("/home");
          }
        } catch (e) {
          // console.log(e);
        }
      }
    }
  };

  const onFailureLoginGoogle = (res) => {
    const message =
      "Infelizmente não foi possível realizar o login com sua conta do Google. Por favor, tente novamente mais tarde.";

    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSubimit = async (formData) => {
    try {
      const response = await api.post("/authentication/login", {
        ...formData,
      });
      const status = response.status;
      if (status === 200) {
        const data = await response.data;
        // console.log(data.token);
        setToken(data.token);
        setTokenLocalStorage(data.token);
        setLoading(true);
        setIsLogged(true);
        const message = "Usuário logado com sucesso!";
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      navigate("/home");
    } catch (e) {
      // console.log(e);
      if (e.request.status === 403) {
        const message =
          "Infelizmente não foi possível iniciar a sessão. Por favor, tente novamente mais tarde";

        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      <HeadHelmet
        title="Digital Booking - Login"
        url={window.location.href}
        image={og_image}
        description="Digital Booking - Login"
      />
      <div className="flex flex-col items-center justify-center m-auto gap-6 h-screen ">
        <form className="mx-auto w-96" onSubmit={handleSubmit(onSubimit)}>
          <h1 className=" text-green text-center text-2xl font-bold col-span-2 pb-8">
            Iniciar sessão
          </h1>

          <div>
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <CommonInput
              name="email"
              id="email"
              type="email"
              className={`w-96 ${errors?.email && "border-2 border-red-500"}`}
              extras={{
                ...register("email", {
                  required: "Este campo é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                }),
              }}
            />
            {errors?.email?.message && (
              <p className="text-red-500 text-right my-2 text-xs">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="py-6">
            <div>
              <label htmlFor="password">Senha</label>
            </div>
            <div className="relative flex">
              <CommonInput
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-96 ${
                  errors?.password && "border-2 border-red-500"
                }`}
                extras={{
                  ...register("password", {
                    required: "Este campo é obrigatório",
                    pattern: {
                      value: /^[0-9a-zA-Z]{6,}$/i,
                      message: "A senha deve conter no mínimo 6 caracteres",
                    },
                  }),
                }}
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-full w-10 text-gray-600"
                onClick={toggleShowPassword}
              >
                {showPassword ? <Eye size={24} /> : <EyeSlash size={24} />}
              </button>
            </div>
            {errors?.password?.message && (
              <p className="text-red-500 text-right my-2 text-xs">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="text-center flex items-center justify-center">
            <CommonButton
              type="submit"
              text="Entrar"
              outline={false}
              className="w-60"
            />
          </div>
        </form>

        <div id="signInButton">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login com Google"
            onSuccess={onSuccessLoginGoogle}
            onFailure={onFailureLoginGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>

        <div className="flex gap-2">
          <p className="text-center">Ainda não tem conta?</p>
          <Link to={"/home/registrationForm"}>Registre-se</Link>
        </div>
      </div>
    </>
  );
}
