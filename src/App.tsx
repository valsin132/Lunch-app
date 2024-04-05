import styles from './App.module.css';
import { BadgeCount, BadgeFree } from './components/Card/Badge';

export function App() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Sourcery for FrontEnd 2024</h1>
      <p>You can delete all this HTML code and start working on your Lunch App</p>
      <BadgeCount count={2} />
      <BadgeFree />
    </div>
  );
}
