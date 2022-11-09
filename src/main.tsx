import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import "./index.css";
import Root, { loader as RootLoader } from "./routes/root";
import User, { loader as UserLoader } from "./routes/user";

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Header } from "./Header";

const alchemyKey = import.meta.env.VITE_ALCHEMY_KEY;
const providers = alchemyKey
  ? [alchemyProvider({ apiKey: alchemyKey }), publicProvider()]
  : [publicProvider()];

const { chains, provider, webSocketProvider } = configureChains(
  defaultChains,
  providers
);

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: RootLoader,
    },
    {
      path: "/user/:userId",
      element: <User />,
      loader: UserLoader,
    },
  ],
  {
    basename: import.meta.env.VITE_APP_BASENAME ?? "/",
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={client}>
    <Header />
    <RouterProvider router={router} />
    <div className="text-center p-4 mt-10">
      <a
        href="https://github.com/tatarianBarbarian/popex-test-vite"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-700 hover:underline"
      >
        Source Code
      </a>
    </div>
  </WagmiConfig>
);
