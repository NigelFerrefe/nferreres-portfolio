import { LogoutButton } from "../logout-button";
import { ThemeSwitcher } from "../theme-switcher";

const AdminDashboard = () => {
    return ( <div>Admin Panel
        <LogoutButton />
        <ThemeSwitcher/>
    </div> );
}
 
export default AdminDashboard;