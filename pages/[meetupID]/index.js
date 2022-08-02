import { Fragment } from "react";
import RestaurantDetail from "../../components/restaurants/RestaurantDetail";
import { MongoClient, ObjectId } from "mongodb";

function RestaurantDetails(props) {
  return (
    <RestaurantDetail
      image={props.restaurantData.image}
      title={props.restaurantData.title}
      address={props.restaurantData.address}
      description={props.restaurantData.description}
    ></RestaurantDetail>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://creater-jsy:test123@cluster0.mhkhd.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const restaurantsCollection = db.collection("restaurants");

  const restaurants = await restaurantsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: restaurants.map((restaurant) => ({
      params: { restaurantID: restaurant._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single restaurant
  const restaurantID = context.params.restaurantID;

  const client = await MongoClient.connect(
    "mongodb+srv://creater-jsy:test123@cluster0.mhkhd.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const restaurantsCollection = db.collection("restaurants");

  const selectedRestaurant = await restaurantsCollection.findOne({ _id: ObjectId(restaurantID) });

  client.close();

  return {
    props: {
      restaurantData: {
        id: selectedRestaurant._id.toString(),
        title: selectedRestaurant.title,
        address: selectedRestaurant.address,
        image: selectedRestaurant.image,
        description: selectedRestaurant.description,
      },
    },
  };
}

export default RestaurantDetails;
