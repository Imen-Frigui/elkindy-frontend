import Footer from "components/footer/FooterAuthDefault";
import authImg from "assets/img/auth/blog12.jpg";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import RegisterPage from "views/auth/register";
import SignIn from "views/auth/SignIn";
export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div> <FixedPlugin />
      <div className="relative float-right h-full min-h-screen w-full bg-kindygray dark:!bg-navy-900">
       
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Link to="/admin" className="mt-0 w-max lg:pt-5">
                  <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                 
                    
                  </div>
                </Link>
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/auth" replace />}/>
                  <Route path="/auth/sign-in" element={<SignIn />} />
                  <Route path="/auth/register/:courseId" element={<RegisterPage />} />
                  
                </Routes>
              
              
                  
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
