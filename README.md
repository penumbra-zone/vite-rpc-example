# Penumbra rpc request demo

This repo is an example of how to use bufbuild libraries to query penumbra nodes. Run example via:

```bash
npm install
npm run develop
# View code implementation in src/
```

## Guide to connecting to making rpc requests to penumbra nodes

### Install deps

```bash
npm install --save @connectrpc/connect-web @connectrpc/connect @penumbra-zone/protobuf
```

### Choose a transport

It's quite likely you'll want to use a `GrpcWebTransport` if you are issuing http requests.

```typescript
import { createGrpcWebTransport } from "@connectrpc/connect-web";

const transport = createGrpcWebTransport({
  baseUrl: GRPC_ENDPOINT, // Your grpc endpoint you'd like to issue requests to
});
```

### Import a service that you'd like to query

#### Option A: You'd like to query an rpc method from the following services:

- [penumbra-zone/penumbra](https://buf.build/penumbra-zone/penumbra)
- [cosmos/cosmos-sdk](https://buf.build/cosmos/cosmos-sdk/docs)
- [cosmos/ibc](https://buf.build/cosmos/ibc)
- [cosmos/ics23](https://buf.build/cosmos/ics23)

If so, you can import them from `@penumbra-zone/protobuf`. This removes the need to add the buf custom registry. Example:

```typescript
import { TendermintProxyService } from "@penumbra-zone/protobuf";
```

#### Option B: You'd like to query another service not specified above.

```bash
# Set your registry
npm config set @buf:registry https://buf.build/gen/npm/v1/

# Install the generated sdk. Example from cosmos/interchain-security. 
# The npm link can be found in the sdk tab of buf build: https://buf.build/cosmos/interchain-security/sdks
npm install @buf/cosmos_interchain-security.connectrpc_es@latest
```

### Instantiate & query

With the transport & service, you can construct a client and make rpc requests:

```typescript
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import { TendermintProxyService } from "@penumbra-zone/protobuf";

const GRPC_ENDPOINT = "https://penumbra.stakewith.binary.builders";
const transport = createGrpcWebTransport({
  baseUrl: GRPC_ENDPOINT,
});
export const tendermintClient = createPromiseClient(
  TendermintProxyService,
  transport,
);
const statusResponse = await tendermintClient.getStatus({});
```

Example from a service not in `@penumbra-zone/protobuf`:

```typescript
import { Query } from "@buf/cosmos_interchain-security.connectrpc_es/interchain_security/ccv/consumer/v1/query_connect";

const GRPC_ENDPOINT = "https://penumbra.stakewith.binary.builders";
const transport = createGrpcWebTransport({
  baseUrl: GRPC_ENDPOINT,
});
const icsClient = createPromiseClient(Query, transport);
const paramsResponse = await icsClient.queryParams({});
```

## Issuing RPC requests to Prax

Interested in writing a frontend that interacts with [Prax](https://praxwallet.com/)?

Use the [@penumbra-zone/client](https://github.com/penumbra-zone/web/tree/main/packages/client) npm package.
