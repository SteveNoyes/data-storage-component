import Sidebar from '../Sidebar/Sidebar.jsx';
import Header from '../Header/Header.jsx';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        {children}
      </main>
    </div>
  );
}
