import styles from "./SidebarGrid.module.css";

function SidebarGrid({children}) {
    return (
        <div className={styles.gridFriends}>
            {children}
        </div>
    );
}

export default SidebarGrid;