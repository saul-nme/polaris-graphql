import "./App.css";
import Navigation from "./routes/Navigation";
import { AppProvider } from "@shopify/polaris";
import Link from "./utils/Link";
import esTranslations from "@shopify/polaris/locales/es.json";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider i18n={esTranslations} linkComponent={Link}>
        <Navigation />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
