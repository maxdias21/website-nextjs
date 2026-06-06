import SidebarDetail from "./SidebarDetail";
import SidebarGrid from "./SidebarGrid";


function SidebarList({children,items}) {
    return (
        <>
            {children}
            <SidebarGrid>
                {items.map((item, index) => (
                    <SidebarDetail key={index} photoUrl={item?.photo} text={item?.name}/>
                ))}
            </ SidebarGrid>
        </>
    );
}

export default SidebarList;