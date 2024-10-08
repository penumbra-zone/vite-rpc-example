import { useQuery } from "@tanstack/react-query";
import { appClient, stakeClient, tendermintClient } from "./clients.ts";
import { ValidatorInfoResponse } from "@penumbra-zone/protobuf/penumbra/core/component/stake/v1/stake_pb";

const AppParams = () => {
  const {
    data: chainId,
    isLoading: chainIdLoading,
    error: chainIdError,
  } = useQuery({
    queryKey: ["chainId"],
    queryFn: async () => {
      const { appParameters } = await appClient.appParameters({});
      return appParameters?.chainId;
    },
  });

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>Chain Id</div>
      <div>
        {chainIdLoading && "Loading..."}
        {chainIdError && `Error ❌: ${chainIdError}`}
        {chainId}
      </div>
    </div>
  );
};

const BlockHeight = () => {
  const {
    data: blockHeight,
    isLoading: blockHeightLoading,
    error: blockHeightError,
  } = useQuery({
    queryKey: ["blockHeight"],
    queryFn: async () => {
      const { syncInfo } = await tendermintClient.getStatus({});
      return Number(syncInfo?.latestBlockHeight);
    },
    refetchInterval: 5000,
  });

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>Block Height</div>
      <div>
        {blockHeightLoading && "Loading..."}
        {blockHeightError && `Error ❌: ${blockHeightError}`}
        {blockHeight && Number(blockHeight)}
      </div>
    </div>
  );
};

const ValidatorCount = () => {
  const {
    data: ValCount,
    isLoading: ValCountLoading,
    error: ValCountError,
  } = useQuery({
    queryKey: ["ValCount"],
    queryFn: async () => {
      const responses: ValidatorInfoResponse[] = [];
      for await (const res of stakeClient.validatorInfo({})) {
        responses.push(res);
      }
      return responses.length;
    },
  });

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>Validator Count</div>
      <div>
        {ValCountLoading && "Loading..."}
        {ValCountError && `Error ❌: ${ValCountError}`}
        {ValCount}
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <div>
      <AppParams />
      <BlockHeight />
      <ValidatorCount />
    </div>
  );
};
