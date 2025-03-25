import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.before_sigin_container}>{children}</div>;
}
