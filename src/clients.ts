import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { createPromiseClient } from '@connectrpc/connect';
import { TendermintProxyService } from '@penumbra-zone/protobuf';

const GRPC_ENDPOINT = 'https://penumbra.stakewith.binary.builders'
const transport = createGrpcWebTransport({
  baseUrl: GRPC_ENDPOINT,
});
export const tendermintClient = createPromiseClient(TendermintProxyService, transport);
const statusResponse = await tendermintClient.getStatus({});
