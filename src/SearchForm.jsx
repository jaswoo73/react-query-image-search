import { toast } from "react-toastify";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) {
      toast.warning("Please enter search term");
      return;
    }
    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className="title">unsplash image</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="dog"
          className="form-input search-input"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </section>
  );
};
export default SearchForm;
