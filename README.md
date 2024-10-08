# React + TypeScript + Vite

This repo is an example of how to use bufbuild libraries to query penumbra nodes

Run example via
```bash
npm install
npm run develop
# View code implementation in src/
```

## Guide to connecting to making rpc requests to penumbra nodes

1. Install deps:
```bash
npm install @connectrpc/connect-web @connectrpc/connect @penumbra-zone/protobuf
```

2. Choose a transport. It's quite likely you'll want to use a `GrpcWebTransport` if you are issuing http requests.
```typescript
import { createGrpcWebTransport } from '@connectrpc/connect-web';

const transport = createGrpcWebTransport({
    baseUrl: GRPC_ENDPOINT, // Your grpc endpoint you'd like to issue requests to
});
```

2. Choose a transport. It's quite likely you'll want to use a `GrpcWebTransport` if you are issuing http requests.
```typescript
import { createGrpcWebTransport } from '@connectrpc/connect-web';

const transport = createGrpcWebTransport({
    baseUrl: GRPC_ENDPOINT, // Your grpc endpoint you'd like to issue requests to
});
```

3. Import the service that has the rpc method you'd like to query.
   1. Option A: You'd like to query an rpc method from the following services:
      - [penumbra-zone/penumbra](https://buf.build/penumbra-zone/penumbra)
      - [cosmos/cosmos-sdk](https://buf.build/cosmos/cosmos-sdk/docs)
      - [cosmos/ibc](https://buf.build/cosmos/ibc)
      - [cosmos/ics23](https://buf.build/cosmos/ics23)
      If so, you can import them from `@penumbra-zone/protobuf`. Example:
      ```typescript
        import { TendermintProxyService } from '@penumbra-zone/protobuf';
      ``` 
  2. Option B: You'd like to query another service not specified above.
     ```bash
#    # Set your registry
      npm config set @buf:registry https://buf.build/gen/npm/v1/
     
     # Install the generated sdk. Example from cosmos/interchain-security:
      npm install @buf/cosmos_interchain-security.connectrpc_es@latest
     ```

4. With the transport & service, you can construct a client and make rpc requests:
```typescript
import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { createPromiseClient } from '@connectrpc/connect';
import { TendermintProxyService } from '@penumbra-zone/protobuf';

const GRPC_ENDPOINT = 'https://penumbra.stakewith.binary.builders'
const transport = createGrpcWebTransport({
  baseUrl: GRPC_ENDPOINT,
});
export const tendermintClient = createPromiseClient(TendermintProxyService, transport);
const statusResponse = await tendermintClient.getStatus({});
```



======

If you are looking to develop an app that connects to Prax go here

https://github.com/penumbra-zone/web/tree/main/packages/client
