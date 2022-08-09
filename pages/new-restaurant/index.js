import { useRouter } from "next/router";
import NewRestaurantForm from "../../components/restaurants/NewRestaurantForm";

function NewRestaurantPage() {
  const router = useRouter();

  async function addRestaurantHandler(enteredRestaurantData) {
    const response = await fetch('/api/new-restaurant', {
      method: 'POST',
      body: JSON.stringify(enteredRestaurantData),
      headers: {
        'Content-Type': 'application.json'
      }
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return <NewRestaurantForm onAddRestaurant={addRestaurantHandler}></NewRestaurantForm>;
}

export default NewRestaurantPage;
