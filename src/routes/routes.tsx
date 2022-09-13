import { BrowserRouter, Routes as RoutesRRD, Route } from "react-router-dom";
import { Home } from "../pages";
import { ViewPerson } from "../pages/viewPerson";
export const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesRRD>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pessoa/view/:id" element={<ViewPerson />}></Route>
      </RoutesRRD>
    </BrowserRouter>
  );
};
