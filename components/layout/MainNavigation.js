import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Restaurants</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Restaurants</Link>
          </li>
          <li>
            <Link href='/new-restaurant'>Add New Restaurant</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
