import { getProfile } from "@/lib/services/profile";
import MobileNavbar from "./MobileNav";
import DesktopNavbar from "./DesktopNav";

const Navbar = async () => {
  const profile = await getProfile();
  if (!profile) return null;
  return (
<nav>
  <div className="md:hidden">
    <MobileNavbar profile={profile} />
  </div>

  <div className="hidden md:block">
    <DesktopNavbar profile={profile} />
  </div>
</nav>
  );
};

export default Navbar;
