import RestaurantItem from './RestaurantItem';
import classes from './RestaurantList.module.css';

function RestaurantList(props) {
  return (
    <ul className={classes.list}>
      {props.restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          id={restaurant.id}
          image={restaurant.image}
          title={restaurant.title}
          address={restaurant.address}
        />
      ))}
    </ul>
  );
}

export default RestaurantList;
