import { BrowserRouter, Route, Routes } from "react-router-dom";
import MediaQuery from "react-responsive";
import { NavbarHeaderPC } from "./components/NavbarHeaderPC";
import { routes } from "./routes";
import { RefreshInbox } from "./components/RefreshInbox";
import { SitesLink } from "./components/SitesLink";

import "~/styles/Footer.scss";
import { Copyright } from "./components/Copyright";
import { NavbarHeaderMobile } from "./components/NavbarHeaderMobile";
import { ScrollToTop } from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer autoClose={3000} />
            <ScrollToTop />
            <div>
                <header className="position-fixed start-0 end-0">
                    <MediaQuery minWidth={992}>
                        <NavbarHeaderPC />
                    </MediaQuery>
                    <MediaQuery maxWidth={991}>
                        <NavbarHeaderMobile />
                    </MediaQuery>
                </header>
                <main>
                    <Routes>
                        {routes.map((route) => {
                            const Component = route.component;
                            return <Route key={route.path} path={route.path} element={<Component />} />;
                        })}
                    </Routes>
                </main>
                <footer>
                    <RefreshInbox />
                    <SitesLink />
                    <Copyright />
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
