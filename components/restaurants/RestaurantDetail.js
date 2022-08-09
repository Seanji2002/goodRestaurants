import { getStaticProps } from '../../pages';
import classes from './RestaurantDetail.module.css'

function RestaurantDetail(props) {

  function submitHandler(event) {
    event.preventDefault();
    const restaurantData = {
      _id: props._id
    };
    props.onDeleteRestaurant(restaurantData);
  }

  return (
    <section className={classes.detail}>
      <img
        src={props.image}
        alt={props.title}
      ></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <button onClick={submitHandler} className={classes.button}> Delete </button>
    </section>
  );
}

export default RestaurantDetail;
