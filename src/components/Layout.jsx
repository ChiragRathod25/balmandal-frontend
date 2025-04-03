import  { useState, useEffect } from 'react';
import { HeaderComponent, FooterComponent } from './';
import { TopBar, SideDrawer, BottomTabBar } from './';

function Layout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA =
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsPWA(checkPWA);
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col ">
        {!isPWA && (
          <header
            className={`bg-[#C30E59] text-white shadow-xl sticky top-0 z-50 backdrop-blur-lg `}
          >
            <div className="container flex justify-center items-center px-4">
              <HeaderComponent />
            </div>
          </header>
        )}

        {isPWA && (
          <div className="sm:hidden z-200 sticky top-0">
            <TopBar onMenuClick={() => setIsDrawerOpen(true)} notificationsCount={3} />
            <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
          </div>
        )}

        <div>{children}</div>

        {isPWA ? (
          <div className="sm:hidden z-200 mt-10">
            <BottomTabBar />
          </div>
        ) : (
          <footer className={`bg-[#C30E59] text-white py-4 `}>
            <div className="container mx-auto text-center">
              <FooterComponent />
            </div>
          </footer>
        )}

       
      </div>
    </>
  );
}

export default Layout;