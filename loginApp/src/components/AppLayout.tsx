import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const AppLayout = () => {
    const containerStyle: React.CSSProperties = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "calc(100vh - 80px)",
        marginTop: "80px",
        position: "relative",
        display: "flex",
        flexDirection: "column"
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <NavBar />
            <main style={containerStyle}>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;