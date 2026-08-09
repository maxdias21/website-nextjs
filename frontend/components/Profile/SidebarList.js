import SidebarDetail from "./SidebarDetail";
import SidebarGrid from "./SidebarGrid";

import styles from "./SidebarList.module.css";

function SidebarList({children, items, noItemsMessage, url}) {
    const noItems = items?.length > 0;
    return (
        <div className={noItems ? styles.content : ""}>
            {children}
            <SidebarGrid>
                {items?.map((item, index) => {
                    const urlPhoto = item?.profiles?.profile_pic ? item.profiles.profile_pic : item?.photo;
                    return (
                        <SidebarDetail
                            url={url}
                            key={index}
                            photoUrl={urlPhoto}
                            slug={item?.slug || item?.id}
                            text={item?.first_name}
                        />
                    );
                })}
            </SidebarGrid>
            {!noItems && <p className={styles.noItems}>{noItemsMessage}</p>}
        </div>
    );
}

export default SidebarList;