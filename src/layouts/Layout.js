import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
	return (
		<>
			<Header />

			<div className="container-fluid">
				<div className="row flex-nowrap">
                    <Sidebar />
                    <div className="col py-3">
                        {children}
                    </div>
                </div>
            </div>
		</>
	);
}

export default Layout;
