import Gallery from "./Gallery";
import SearchForm from "./SearchForm";
import ThemeToggle from "./ThemeToggle";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <main>
      <ThemeToggle />
      <SearchForm />
      <Gallery />
      <ToastContainer position="top-center" />
    </main>
  );
};
export default App;
