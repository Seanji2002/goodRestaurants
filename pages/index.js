import { MongoClient } from "mongodb";
import RestaurantList from "../components/restaurants/RestaurantList";
import NewRestaurantPage from "./new-restaurant";

function HomePage(props) {
  return <RestaurantList restaurants={props.restaurants}></RestaurantList>;
}

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    process.env.MONGO_DB
  );

  const db = client.db();

  const restaurantsCollection = db.collection("restaurants");

  const restaurants = await restaurantsCollection.find().toArray();

  client.close();

  return {
    props: {
      restaurants: restaurants.map((restaurant) => ({
        title: restaurant.title,
        address: restaurant.address,
        image: restaurant.image,
        id: restaurant._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
