import { useState, useContext } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { AuthContext } from "../../provider/auth";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonInput } from "../CommonInput/CommonInput";
import { CommonButton } from "../CommonButton/CommonButton";
import { Link } from "react-router-dom";

export function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    setToken,
    setTokenLocalStorage,
    setLoading,
    setIsLogged,
    setIsAuthenticated,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await api.post("/authentication/register", {
        ...formData,
      });
      const status = await response.status;
      if (status === 201) {
        const data = await response.data;
        setToken(data.token);
        setTokenLocalStorage(data.token);
        setLoading(false);
        setIsLogged(true);
        setIsAuthenticated(true);
        reset();

        const message = "Usuário cadastrado com sucesso!";

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

        setTimeout(() => navigate("/home"), 3000);
      }
    } catch (e) {
      if (e.request.status === 403) {
        const message =
          "Infelizmente não foi possível registrar. Por favor, tente novamente mais tarde.";

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
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center flex-1">
      <form className="mx-auto w-96" onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <h1 className="text-green text-center text-2xl font-bold md:col-span-2 pb-6">
            Criar Conta
          </h1>
          <div className="md:col-span-2">
            <div>
              <label htmlFor="name">Nome</label>
            </div>

            <CommonInput
              name="firstname"
              id="name"
              className={errors?.firstname && "border-2 border-red-500"}
              extras={{
                ...register("firstname", {
                  required: "Este campo é obrigatório",
                }),
              }}
            />

            {errors?.firstname?.message && (
              <p className="text-red-500 text-right my-2 text-xs">
                {errors.firstname?.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <div>
              <label htmlFor="lastName">Sobrenome</label>
            </div>
            <CommonInput
              name="lastName"
              id="lastName"
              className={errors?.lastname && "border-2 border-red-500"}
              extras={{
                ...register("lastname", {
                  required: "Este campo é obrigatório",
                }),
              }}
            />
            {errors?.lastname?.message && (
              <p className="text-red-500 text-right my-2 text-xs">
                {errors.lastname?.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <CommonInput
              name="email"
              id="email"
              type="email"
              className={errors?.email && "border-2 border-red-500"}
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
          <div className="md:col-span-2">
            <div>
              <label htmlFor="repeatEmail">Repetir e-mail</label>
            </div>
            <CommonInput
              name="repeatEmail"
              id="repeatEmail"
              type="email"
              className={errors?.repeatEmail && "border-2 border-red-500"}
              extras={{
                ...register("repeatEmail", {
                  required: "O campo é obrigatório",
                  validate: (match) => {
                    const email = getValues("email");
                    return match === email || "Os e-mails devem ser iguais";
                  },
                }),
              }}
            />
            {errors?.repeatEmail?.message && (
              <p className="text-red-500 text-right my-2 text-xs">
                {errors.repeatEmail?.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <div>
              <label htmlFor="password">Senha</label>
            </div>
            <div className="relative flex">
              <CommonInput
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                className={errors?.password && "border-2 border-red-500"}
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
          <div className="md:col-span-2 flex flex-col gap-4 mt-4">
            <CommonButton
              type="submit"
              text="Criar Conta"
              outline={false}
              className="mb-2"
            />
            <div className="flex justify-center gap-2">
              <p>
                Já tem uma conta?
              </p>
              <Link to="/home/login">Iniciar sessão</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
