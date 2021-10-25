import { ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <header className={styles.headerContainer}>
        <h1 className="page-title">Menu</h1>
      </header>
      <main className={styles.mainContainer}>{children}</main>
      <footer className={styles.footer}>Eye Restaurant</footer>
    </div>
  );
}
