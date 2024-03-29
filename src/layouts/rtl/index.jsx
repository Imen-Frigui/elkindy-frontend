import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar/RTL";
import Sidebar from "components/sidebar/RTL";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import Header from "views/rtl/default/components/Header";

export default function RTL(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "RTL";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/rtl") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "rtl";
  return (
    <div >
      <h1>Paragraphs are the building blocks of papers. Many
         students define paragraphs in terms of length: a paragraph is 
         a group of at least five sentences, a paragraph is half a page long,
          etc. In reality, though, the unity and coherence of ideas among senten
          ces is what constitutes a paragraph. </h1>
          <Header/>
     {/* <Sidebar open={open} onClose={() => setOpen(false)} />}
      {/* Navbar & Main Content */}
    {/*  <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
       
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pe-2 xl:mr-[313px]`}
        >
       
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div> */}
                  <div className="p-3">

          <Footer />
          </div>

    </div>
  );
}
