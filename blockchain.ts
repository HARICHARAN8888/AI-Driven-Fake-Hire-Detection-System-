import { ethers } from "ethers";

// Use public RPC or Alchemy/Infura for read requests
const RPC_URL = process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://polygon-rpc.com";

// ABI snippet for the necessary verification functions
const RegistryABI = [
    "function getTrustScore(address _wallet) public view returns (int256)",
    "function recruiters(address) public view returns (address wallet, string fullName, string companyDomain, bool isVerified, int256 trustScore)",
    "function companies(string) public view returns (string name, string domain, bool isRegistered, int256 trustScore)"
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS || "0xYourDeployedPolygonContractAddress";

export const getBlockchainProvider = () => {
    return new ethers.JsonRpcProvider(RPC_URL);
}

export const getRegistryContract = () => {
    const provider = getBlockchainProvider();
    return new ethers.Contract(CONTRACT_ADDRESS, RegistryABI, provider);
}

export const fetchRecruiterScore = async (walletAddress: string) => {
    try {
        const contract = getRegistryContract();
        const score = await contract.getTrustScore(walletAddress);
        return { success: true, trustScore: Number(score) };
    } catch (error) {
        console.error("Error fetching trust score:", error);
        return { success: false, error: "Unable to retrieve trust score from Polygon Network" };
    }
}

export const fetchRecruiterStatus = async (walletAddress: string) => {
    try {
        const contract = getRegistryContract();
        const data = await contract.recruiters(walletAddress);
        return { 
            success: true, 
            data: {
                fullName: data.fullName,
                companyDomain: data.companyDomain,
                isVerified: data.isVerified,
                trustScore: Number(data.trustScore)
            }
        };
    } catch (error) {
        console.error("Error fetching recruiter status:", error);
        return { success: false, error: "Unable to find recruiter record." };
    }
}
