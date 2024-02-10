import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm, fetchPage, setFetchPage } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchTerm, fetchPage],
    queryFn: async () => {
      const result = await axios.get(
        `${url}&query=${searchTerm}&per_page=12&page=${fetchPage}`
      );
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = response.data.results;

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found</h4>
      </section>
    );
  }
  return (
    <main>
      <section className="image-container">
        {results.map((item) => {
          const url = item?.urls?.regular;
          return (
            <img
              src={url}
              key={item.id}
              alt={item.description}
              className="img"
            />
          );
        })}
      </section>
      <div className="pagination">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setFetchPage((prev) => Math.max(prev - 1, 1));
            console.log(fetchPage);
          }}
          disabled={fetchPage === 1}
          style={{ pointerEvents: fetchPage === 1 ? "none" : "" }}
        >
          Prev
        </button>
        <p>
          {fetchPage} / {response.data.total_pages}
        </p>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setFetchPage((prev) => (prev + 1) % response.data.total_pages);
            console.log(fetchPage);
          }}
        >
          Next
        </button>
      </div>
    </main>
  );
};
export default Gallery;
