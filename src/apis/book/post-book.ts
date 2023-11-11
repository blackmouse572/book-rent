import { authAxiosClient } from "../../lib/axios";
import FormData from 'form-data';

async function postBookApi(
  bookData: {
    category: string;
    genres: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any;
    name: string;
    rental_price: number;
    description: string;
    keyword: string;
    author: string;
  },
  image: string
) {
    
    const data = new FormData();
    data.append('name', bookData.name);
    data.append('rental_price', bookData.rental_price);
    data.append('category', bookData.category);
    data.append('description', bookData.description);
    data.append('keyword', bookData.keyword);
    data.append('genres', bookData.genres);
    data.append('author', bookData.author);

    if (image) {
    data.append('image', (bookData.image));
    }

    return await authAxiosClient.post("/book", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }, 
    })
    .then((response) => {
      if (response.status === 201) {

          return response.data;
      } else {
          // Handle other HTTP statuses as needed
          console.log(response);
          throw new Error("Request failed with status " + response.status);
      }
    })
    .catch((error) => {
        // Handle network errors or other issues
        throw error;
    });
}

export { postBookApi };