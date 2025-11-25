import { Link } from "react-router-dom";
import { House, Wallet, Truck, User2Icon, DollarSign, CardSim, Settings2Icon, MapPin, BusFront, Banknote } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/UserContextProvider";

export default function BottomNav() {
  const { userdata, profiledata, getProfileUser } = useAuthContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userdata?.user_id) {
      getProfileUser(userdata.user_id).finally(() => setLoaded(true));
    }
  }, [userdata]);

  // Wait until profiledata is fetched
  if (!loaded) return null;

  const items = [
    { to: "/protected/dashboard", icon: <House size={20} />, label: "Home" },
    { to: "/physical/card/application", icon: <CardSim size={20} />, label: "Cards" },
    { to: "/transfer", icon: <Wallet size={20} />, label: "Transfer" },
    { to: "/qr/payment/admin/transaction", icon: <Banknote size={20} />, label: "Transactions" },
    { to: "/terminal", icon: <BusFront size={20} />, label: "Terminals" },
    { to: "/map", icon: <MapPin size={20} />, label: "Map" },
    { to: "/add/saving", icon: <DollarSign size={20} />, label: "Funds" },
    { to: "/create/user", icon: <User2Icon size={20} />, label: "Users" },
    { to: "/support", icon: <Settings2Icon size={20} />, label: "Settings" }
  ];

  const visibleItems = items.filter(item => {
    // Only show Users link if profiledata.user_option === "admin"
    if (item.to === "/create/user" && profiledata?.user_option !== "admin") return false;
    if (item.to === "/terminal" && profiledata?.user_option !== "admin") return false;
    if (item.to === "/qr/payment/admin/transaction" && profiledata?.user_option !== "admin") return false;
    return true;
  });

  return (
    <div className="bg-dark border-top border-secondary py-2 d-flex justify-content-around fixed-bottom text-white">
      {visibleItems.map((item, i) => (
        <Link key={i} to={item.to} className="text-center text-white text-decoration-none small">
          {item.icon}
          <div>{item.label}</div>
        </Link>
      ))}
    </div>
  );
}
