import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import { TendermintProxyService } from "@penumbra-zone/protobuf";
import { QueryService as AppQueryService } from "@penumbra-zone/protobuf/penumbra/core/app/v1/app_connect";
import { QueryService as StakeQueryService } from "@penumbra-zone/protobuf/penumbra/core/component/stake/v1/stake_connect";

const GRPC_ENDPOINT = "https://penumbra.stakewith.binary.builders";

const transport = createGrpcWebTransport({
  baseUrl: GRPC_ENDPOINT,
});

export const tendermintClient = createPromiseClient(
  TendermintProxyService,
  transport,
);
export const appClient = createPromiseClient(AppQueryService, transport);
export const stakeClient = createPromiseClient(StakeQueryService, transport);
