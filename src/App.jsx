import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Router from "./shared/Router";
import { Reset } from "styled-reset";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
