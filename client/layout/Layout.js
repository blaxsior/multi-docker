import CustomHeader from "./CustomHeader";

const Layout = (props) => {
    return (
        <>
            <CustomHeader />
            <div>
                {props.children}
            </div>
        </>
    )
};

export default Layout;