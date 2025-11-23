import Footer from "./components/Footer";
import Header from "./components/Header";
import JobListings from "./components/JobListings/index";
import JobsSearch from "./components/JobsSearch";

function App() {
  return (
    <>
      <Header />
      <main>
        <JobsSearch />
        <JobListings />
      </main>

      <Footer />
    </>
  );
}

export default App;
