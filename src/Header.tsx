import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

const formatAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export function Header() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const formattedAddress = address ? formatAddress(address) : undefined;

  return (
    <div className="p-5 flex justify-end">
      {isConnected ? (
        <div className="flex flex-col">
          {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
          <div>
            {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
          </div>
          <div>Connected to {connector?.name}</div>
          <button
            onClick={() => disconnect()}
            className="bg-slate-400 p-2 text-white rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <>
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
              className="bg-orange-400 p-2 text-white rounded"
            >
              {"Connect " + connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          ))}

          {error && <div>{error.message}</div>}
        </>
      )}
    </div>
  );
}
