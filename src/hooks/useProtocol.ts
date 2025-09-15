import { gql, GraphQLClient } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import type { ProtocolResponse } from "@/lib/types";

const client = new GraphQLClient(
  "https://api.studio.thegraph.com/query/120726/grahp-init/version"
);

const GET_PROTOCOL = gql`
  query GetProtocol {
    protocol(id: "protocol") {
      id
      totalStaked
      totalRewardsClaimed
      totalWithdrawn
      totalEmergencyWithdrawn
      currentRewardRate
      users {
        id
      }
    }
  }
`;

async function fetchProtocol() {
    const data = await client.request<ProtocolResponse>(GET_PROTOCOL);
  return data;
}

export function useProtocol() {
  return useQuery({
    queryKey: ["protocol"],
    queryFn: fetchProtocol,
    staleTime: 300_000,
  });
}
