pragma solidity ^0.5.16;

contract SignSafeContract{

    address internal contract_owner;
    uint256 public creation_date;
    uint256 public contract_completed_date;
    uint256 public contract_cancelled_date;
    uint internal contractHash;
    bool internal contractUploaded = false;


    enum sign_safe_contract_state{
        SETUP, PENDING, COMPLETED, CANCELLED
    }

    mapping(address => bool) public who_has_signed;
    mapping(address => bool) public signatories;
    mapping(address => bool) public hashMatch;
    mapping(address => uint) public signature_timestamps;

    sign_safe_contract_state public STATE;

    modifier only_owner(){
        require(msg.sender == contract_owner);
        _;
    }

    modifier only_signatories(){
        require(signatories[msg.sender] == true);
        _;
    }
    modifier only_SETUP(){
        require(STATE == sign_safe_contract_state.SETUP);
        _;
    }

    modifier only_PENDING(){
        require(STATE == sign_safe_contract_state.PENDING);
        _;
    }

    modifier only_unsigned_signatories(){
        require(who_has_signed[msg.sender] == false);
        _;
    }

    modifier only_hash_match(){
        require(hashMatch[msg.sender] == true);
        _;
    }

    modifier only_contract_uploaded(){
        require(contractUploaded == true);
        _;
    }

    modifier has_signed(){
        require(who_has_signed[msg.sender] == true);
        _;
    }

    event contractComplete(string message, bool complete, uint timestamp);
    event signature(address indexed signatory, bool has_signed, uint timestamp);
    event contractCanceled(string message, bool canceled, uint timestamp);

    function hashContract(string memory kontract) only_owner only_SETUP public {
        contractHash = uint(keccak256(abi.encodePacked(kontract)));
        contractUploaded = true;
    }

    function confirmContract(string memory kontract) only_contract_uploaded only_PENDING only_signatories public returns(bool) {
        uint hash = uint(keccak256(abi.encodePacked(kontract)));
        if(hash == contractHash){
            hashMatch[msg.sender] = true;
            return true;
        }
        else{
            hashMatch[msg.sender] = false;
            return false;
        }
    }

    function getContractHash() only_contract_uploaded public returns(uint) {
        return contractHash;
    }

    function ownerCancelContract() only_owner public {
        require(STATE != sign_safe_contract_state.COMPLETED);
        STATE = sign_safe_contract_state.CANCELLED;
        contract_cancelled_date = now;
        string memory emit_message = "The contract owner has cancelled the contract. ";
        emit contractCanceled(emit_message, true, now);
    }

}