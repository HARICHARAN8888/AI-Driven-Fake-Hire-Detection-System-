// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RecruiterRegistry {
    address public owner;

    struct Company {
        string name;
        string domain;
        bool isRegistered;
        int256 trustScore;
    }

    struct Recruiter {
        address wallet;
        string fullName;
        string companyDomain;
        bool isVerified;
        int256 trustScore;
    }

    struct FraudCase {
        address reporter;
        string scamType;
        uint256 timestamp;
        uint256 aiRiskScore;
    }

    mapping(string => Company) public companies;
    mapping(address => Recruiter) public recruiters;
    mapping(address => FraudCase[]) public recuiterFraudCases; // Track fraud cases against a specific recruiter

    event CompanyRegistered(string domain, string name);
    event RecruiterVerified(address wallet, string companyDomain);
    event VerificationBadgeIssued(address wallet);
    event FraudCaseRecorded(address recruiter, address reporter, string scamType, uint256 aiRiskScore);
    event TrustScoreUpdated(address entity, int256 newScore);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not an admin");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Register a legitimate company
    function registerCompany(string memory _name, string memory _domain) public onlyOwner {
        require(!companies[_domain].isRegistered, "Company already registered");
        companies[_domain] = Company(_name, _domain, true, 50);
        emit CompanyRegistered(_domain, _name);
    }

    // Initial addition of recruiter
    function verifyRecruiter(address _wallet, string memory _fullName, string memory _companyDomain) public onlyOwner {
        require(companies[_companyDomain].isRegistered, "Company not recognized");
        require(bytes(recruiters[_wallet].fullName).length == 0, "Recruiter already exists");
        
        recruiters[_wallet] = Recruiter(_wallet, _fullName, _companyDomain, false, 50);
        emit RecruiterVerified(_wallet, _companyDomain);
    }

    // Mark as completely verified/trusted
    function issueVerificationBadge(address _wallet) public onlyOwner {
        require(bytes(recruiters[_wallet].fullName).length > 0, "Unknown recruiter");
        recruiters[_wallet].isVerified = true;
        
        // Boost trust score by 20 on successful identity verification
        recruiters[_wallet].trustScore += 20;
        emit VerificationBadgeIssued(_wallet);
        emit TrustScoreUpdated(_wallet, recruiters[_wallet].trustScore);
    }

    // Automatically trigger from backend when AI Agent or User detects scam
    function recordFraudCase(address _recruiter, string memory _scamType, uint256 _aiRiskScore) public {
        require(bytes(recruiters[_recruiter].fullName).length > 0, "Recruiter unknown to registry logger");
        
        recuiterFraudCases[_recruiter].push(FraudCase({
            reporter: msg.sender,
            scamType: _scamType,
            timestamp: block.timestamp,
            aiRiskScore: _aiRiskScore
        }));
        
        // Penalty calculation based on AI score (Score range 0-100)
        // Adjust penalty severity based on the AI's confidence
        int256 penalty = int256(_aiRiskScore / 5);
        recruiters[_recruiter].trustScore -= penalty;
        
        if(recruiters[_recruiter].trustScore < 0) {
            recruiters[_recruiter].trustScore = 0;
            recruiters[_recruiter].isVerified = false; // Revoke badge if trust falls to 0
        }

        emit FraudCaseRecorded(_recruiter, msg.sender, _scamType, _aiRiskScore);
        emit TrustScoreUpdated(_recruiter, recruiters[_recruiter].trustScore);
    }

    function getTrustScore(address _wallet) public view returns (int256) {
        return recruiters[_wallet].trustScore;
    }
}
