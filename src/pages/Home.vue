<template>
  <div class="home">
    <div class="header">
      <img
        src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg"
        alt="logo uber eat"
      />
      <div class="wrapper--input">
        <input
          type="text"
          placeholder="De quoi avez-vous envie?"
          v-model="user_search_restaurant"
        />
        <div class="search">
          <router-link to="/restaurant">
            <div
              v-for="(restaurant, i) in search_restaurant"
              :key="i"
              class="container--restaurant--search"
            >
              <div class="wrapper--img">
                <img :src="restaurant.image" :alt="restaurant.name" />
              </div>
              <p>{{ restaurant.name }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="banniere"></div>
    <RestaurantRow
      v-for="(data, i) in data_restaurant"
      :key="i"
      :three_restaurant="data"
    />
  </div>
</template>

<script>
import BDD from "../BDD";
import { onMounted, ref, watch } from "vue";
import RestaurantRow from "../components/RestaurantRow.vue";

export default {
  name: "HomeComponent",
  components: {
    RestaurantRow,
  },
  setup() {
    class Restaurant {
      constructor(name, note, image, drive_time) {
        this.name = name;
        this.note = note;
        this.image = image;
        this.drive_time = drive_time;
      }
    }

    let data_restaurant = ref([]);
    let all_restaurant = [];

    const makeDataRestaurant = () => {
      let three_restaurants = [];

      for (const restaurant of BDD) {
        const new_restaurant = new Restaurant(
          restaurant.name,
          restaurant.note,
          restaurant.image,
          restaurant.drive_time
        );
        all_restaurant.push(new_restaurant);
        if (three_restaurants.length === 2) {
          three_restaurants.push(new_restaurant);
          data_restaurant.value.push(three_restaurants);
          three_restaurants = [];
        } else {
          three_restaurants.push(new_restaurant);
        }
      }
    };

    let user_search_restaurant = ref("");
    let search_restaurant = ref([]);

    watch(user_search_restaurant, (new_value) => {
      let regex = RegExp(new_value.toLowerCase());

      let new_search_restaurant = all_restaurant.filter((restaurant) =>
        regex.test(restaurant.name.toLowerCase())
      );

      new_value == 0
        ? (search_restaurant.value = [])
        : (search_restaurant.value = new_search_restaurant);
    });

    onMounted(makeDataRestaurant);

    return {
      data_restaurant,
      user_search_restaurant,
      search_restaurant,
    };
  },
};
</script>

<style lang="scss">
.home {
  .header {
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 200px;
    }
    .wrapper--input {
      position: relative;
      input {
        background-color: #f6f6f6;
        border: none;
        height: 60px;
        width: 400px;
        outline: none;
        padding-left: 20px;
      }
      .search {
        position: absolute;
        top: 100%;
        width: 100%;
        background-color: #ffffff;
        .container--restaurant--search {
          display: flex;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #f6f6f6;
          }
          .wrapper--img {
            height: 60px;
            width: 60px;
            margin-right: 25px;
            border-radius: 50%;
            overflow: hidden;
            img {
              height: 100%;
              width: auto;
            }
          }
        }
      }
    }
  }
  .banniere {
    height: 200px;
    width: 100%;
    background-image: url("https://www.ubereats.com/restaurant/_static/7b308f7cbbf8e335ceda0447a8bd7c63.png");
    background-size: cover;
    background-position: center center;
  }
}
</style>
