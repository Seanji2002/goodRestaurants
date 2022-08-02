import { getStaticProps } from '../../pages';
import classes from './RestaurantDetail.module.css'

function RestaurantDetail(props) {
  return (
    <section className={classes.detail}>
      <img
        src={props.image}
        alt={props.title}
      ></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default RestaurantDetail;
