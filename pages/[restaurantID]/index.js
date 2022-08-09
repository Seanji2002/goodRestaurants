import { Fragment } from "react";
import RestaurantDetail from "../../components/restaurants/RestaurantDetail";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";

function RestaurantDetails(props) {
  const router = useRouter();
  async function deleteRestaurantHandler(enteredRestaurantData) {
    const response = await fetch("/api/delete-restaurant", {
      method: "DELETE",
      body: JSON.stringify(enteredRestaurantData),
      headers: {
        "Content-Type": "application.json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return (
    <RestaurantDetail
      onDeleteRestaurant={deleteRestaurantHandler}
      _id={props.restaurantData.id}
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

  const restaurants = await restaurantsCollection
    .find({}, { _id: 1 })
    .toArray();

  client.close();

  return {
    fallback: true,
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

  const selectedRestaurant = await restaurantsCollection.findOne({
    _id: ObjectId(restaurantID),
  });

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
