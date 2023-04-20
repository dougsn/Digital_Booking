import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm/RegistrationForm";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { AuthProvider } from "./provider/auth";
import { ReservationProvider } from "./provider/reservation";
import { ListProducts } from "./components/Products/ListProducts";
import { ReservationDetails } from "./components/Reservation/ReservationDetails";
import { ReservationSuccess } from "./routes/ReservationSuccess";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { ProductsByDate } from "./routes/ProductsByDate";
import { ProductsByCityDate } from "./routes/ProductsByCityDate";
import { ProductsByCity } from "./routes/ProductsByCity";
import { Products } from "./components/Products/Products";
import { Home } from "./routes/Home";
import { Administration } from "./components/Administration/Administration";
import { MyReservations } from "./components/MyReservations/MyReservations";
import MyFavorites from "./components/MyFavorites/MyFavorites";
import { UpdateProperty } from "./components/Administration/UpdateProperty/UpdateProperty";
import { MyProperties } from "./components/Administration/MyProperties/MyProperties";
import { PropertyReservations } from "./components/Administration/PropertyReservations/PropertyReservations";
import { CreateProperty } from "./components/Administration/CreateProperty/CreateProperty";
import { RegistroUsuario } from "./routes/RegistroUsuario";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <div className="h-screen flex flex-col">
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Footer />}>
              <Route path="" element={<Header />}>
                <Route path="home/" element={<Home />}></Route>
                <Route
                  path="home/administrator"
                  element={
                    <PrivateRoute
                      component={Administration}
                      isAdminRoute={true}
                    />
                  }
                />
                <Route path="home/login" element={<LoginForm />} />
                <Route
                  path="home/registrationForm"
                  element={<RegistroUsuario />}
                />
                <Route path="home/products" element={<Products />} />
                <Route
                  path="home/products/:categoria"
                  element={<ListProducts />}
                />
                <Route
                  path="home/products/:cidade/:categoria"
                  element={<ProductsByCity />}
                />
                <Route
                  path="home/products/:categoria/:dataInicial/:dataFinal"
                  element={<ProductsByDate />}
                />
                <Route
                  path="home/products/:cidade/:categoria/:dataInicial/:dataFinal"
                  element={<ProductsByCityDate />}
                />
                <Route
                  path="home/product/:id"
                  element={
                    <ReservationProvider>
                      <ProductDetails />
                    </ReservationProvider>
                  }
                />
                <Route
                  path="home/product/:id/reservation"
                  element={
                    <ReservationProvider>
                      <PrivateRoute component={ReservationDetails} />
                    </ReservationProvider>
                  }
                />
                <Route
                  path="home/product/:id/reservation/success"
                  element={<PrivateRoute component={ReservationSuccess} />}
                />
                <Route
                  path="home/myReservations"
                  element={<PrivateRoute component={MyReservations} />}
                />

                <Route
                  path="home/myFavorites"
                  element={<PrivateRoute component={MyFavorites} />}
                />
                <Route path="home/update" element={<UpdateProperty />} />

                <Route path="home/myproperties" element={<MyProperties />} />

                <Route
                  path="home/propertyUpdate/:id"
                  element={<PrivateRoute component={UpdateProperty} />}
                />

                <Route
                  path="home/administrator/propertyUpdate/:id"
                  element={<PrivateRoute component={UpdateProperty} />}
                />

                <Route
                  path="home/administrator/propertyUpdate/reservations/:id"
                  element={<PrivateRoute component={PropertyReservations} />}
                />

                <Route
                  path="home/administrator/createProperty"
                  element={<PrivateRoute component={CreateProperty} />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
