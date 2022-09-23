import { BrowserRouter, Routes as RoutesRRD, Route } from "react-router-dom";
import { Home } from "../pages";
import { Create } from "../pages/create";
import { Edit } from "../pages/edit";
import { ViewPerson } from "../pages/viewPerson";
export const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesRRD>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Create />} />
        <Route path="/editar/:id" element={<Edit />} />
        <Route path="/pessoa/view/:id" element={<ViewPerson />} />
      </RoutesRRD>
    </BrowserRouter>
  );
};
