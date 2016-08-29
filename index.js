'use strict';
const classes = require('./classes.json');

// For geth
if (typeof dapple === 'undefined') {
    var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
    var Web3 = require('web3');
}

dapple['contracts'] = (function builder () {
    var environments = {
        'default': {
            'objects': {
                'registry': {
                    'class': 'AkashaRegistry',
                    'address': '0x597cc7a9aa61a0a891fe0a562a31b3ed77f4148f'
                },
                'helper': {
                    'class': 'AkashaLib',
                    'address': '0x797ecbf3c82d5c2512dece73c5e2e8882d351183'
                },
                'tags': {
                    'class': 'AkashaTags',
                    'address': '0x910a01be28e042d2f08e7b20c099fb703afddb81'
                },
                'indexedTags': {
                    'class': 'IndexedTags',
                    'address': '0x46f060a0c283759b91d4893a9b742db4e444c180'
                },
                'badges': {
                    'class': 'AkashaBadges',
                    'address': '0xb2da16d1c23ac348341b023c5d929c3360ea74cc'
                },
                'akashaMain': {
                    'class': 'AkashaMain',
                    'address': '0x0262bf7fac19dbe7ec23a18232be6a39033ec766'
                }
            }
        }
    };

    function ContractWrapper (headers, _web3) {
        if (!_web3) {
            throw new Error('Must supply a Web3 connection!');
        }

        this.headers = headers;
        this._class = _web3.eth.contract(headers.interface);
    }

    ContractWrapper.prototype.deploy = function () {
        var args = new Array(arguments);
        args[args.length - 1].data = this.headers.bytecode;
        return this._class.new.apply(this._class, args);
    };

    var passthroughs = ['at', 'new'];
    for (var i = 0; i < passthroughs.length; i += 1) {
        ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
            return function () {
                return this._class[passthrough].apply(this._class, arguments);
            };
        })(passthroughs[i]);
    }

    function constructor (_web3, env) {
        if (!env) {
            env = {
                'objects': {
                    'registry': {
                        'class': 'AkashaRegistry',
                        'address': '0x597cc7a9aa61a0a891fe0a562a31b3ed77f4148f'
                    },
                    'helper': {
                        'class': 'AkashaLib',
                        'address': '0x797ecbf3c82d5c2512dece73c5e2e8882d351183'
                    },
                    'tags': {
                        'class': 'AkashaTags',
                        'address': '0x910a01be28e042d2f08e7b20c099fb703afddb81'
                    },
                    'indexedTags': {
                        'class': 'IndexedTags',
                        'address': '0x46f060a0c283759b91d4893a9b742db4e444c180'
                    },
                    'badges': {
                        'class': 'AkashaBadges',
                        'address': '0xb2da16d1c23ac348341b023c5d929c3360ea74cc'
                    },
                    'akashaMain': {
                        'class': 'AkashaMain',
                        'address': '0x0262bf7fac19dbe7ec23a18232be6a39033ec766'
                    }
                }
            };
        }
        while (typeof env !== 'object') {
            if (!(env in environments)) {
                throw new Error('Cannot resolve environment name: ' + env);
            }
            env = environments[env];
        }

        if (typeof _web3 === 'undefined') {
            if (!env.rpcURL) {
                throw new Error('Need either a Web3 instance or an RPC URL!');
            }
            _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
        }

        this.headers = {
            'AkashaBadges': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'name': '_knownBadges',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bytes32'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getBadge',
                        'outputs': [
                            {
                                'name': 'first',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'second',
                                'type': 'bytes32'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'name': 'createBadge',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'id',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'badgeExists',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [],
                        'type': 'constructor'
                    }
                ],
                'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b61046a8061003f6000396000f360606040523615610069576000357c010000000000000000000000000000000000000000000000000000000090048063676c20481461007657806377002fcf146100a657806383197ef0146100e1578063ae94ebd1146100f0578063af4bd7431461014c57610069565b6100745b610002565b565b005b61008c600480803590602001909190505061017a565b604051808260001916815260200191505060405180910390f35b6100bc600480803590602001909190505061019f565b6040518083600019168152602001826000191681526020019250505060405180910390f35b6100ee6004805050610211565b005b6101346004808035906020019091908060400190600280602002604051908101604052809291908260026020028082843782019150505050509090919050506102aa565b60405180821515815260200191505060405180910390f35b610162600480803590602001909190505061041d565b60405180821515815260200191505060405180910390f35b600260005081815481101561000257906000526020600020900160005b915090505481565b600060006001600050600084600019168152602001908152602001600020600050600060028110156100025790900160005b50546001600050600085600019168152602001908152602001600020600050600160028110156100025790900160005b50549150915061020c565b915091565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561026d57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561030857610002565b6103118361041d565b1561031f5760009050610417565b81600160005060008560001916815260200190815260200160002060005090600282600290908101928215610374579160200282015b82811115610373578251826000505591602001919060010190610355565b5b50905061039f9190610381565b8082111561039b5760008181506000905550600101610381565b5090565b5050600260005080548060010182818154818355818115116103f3578183600052602060002091820191016103f291906103d4565b808211156103ee57600081815060009055506001016103d4565b5090565b5b5050509190906000526020600020900160005b859091909150555060019050610417565b92915050565b60006000600102600019166001600050600084600019168152602001908152602001600020600050600060028110156100025790900160005b50546000191614159050610465565b91905056'
            },
            'AkashaBase': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [],
                        'type': 'constructor'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'method',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'reason',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'Error',
                        'type': 'event'
                    }
                ],
                'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b61014b8061003f6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806383197ef014610044578063b2bdfa7b1461005357610042565b005b610051600480505061008c565b005b6100606004805050610125565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156100e857610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
            },
            'AkashaEntry': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'withDraw',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [
                            {
                                'name': 'manager',
                                'type': 'address'
                            },
                            {
                                'name': 'owner',
                                'type': 'address'
                            }
                        ],
                        'type': 'constructor'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': false,
                                'name': '_receiver',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': '_amount',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Receiving',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'method',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'reason',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'Error',
                        'type': 'event'
                    }
                ],
                'bytecode': '606060405260405160408061064c833981016040528080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505061058e806100be6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480630fdb1c101461004f57806383197ef014610074578063b2bdfa7b146100835761004d565b005b61005c60048050506100bc565b60405180821515815260200191505060405180910390f35b61008160048050506104cf565b005b6100906004805050610568565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006000600060003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561012057610002565b60643073ffffffffffffffffffffffffffffffffffffffff1631049250600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166350228201604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638084387f604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663adb4803a604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001501515610377577f7769746844726177000000000000000000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f6e6f74456c696769626c65000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a2600093506104c9565b8073ffffffffffffffffffffffffffffffffffffffff16600084604051809050600060405180830381858888f193505050501561043f577f7c689434bedaf72871fd778e5259daba90e26b33d73ac430b39b72eb4102aab4823073ffffffffffffffffffffffffffffffffffffffff1631604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a18173ffffffffffffffffffffffffffffffffffffffff16ff600193506104c9566104c8565b7f7769746844726177000000000000000000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f6665654572726f72000000000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a2600093506104c9565b5b50505090565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561052b57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
            },
            'AkashaFaucet': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'amount',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'withDraw',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [],
                        'type': 'constructor'
                    }
                ],
                'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b6101b68061003f6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806314174f331461003957610037565b005b61004f6004808035906020019091905050610067565b60405180821515815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156100c557610002565b3073ffffffffffffffffffffffffffffffffffffffff163182111561015657600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f1935050505090506101b1565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600083604051809050600060405180830381858888f1935050505090506101b1565b91905056'
            },
            'AkashaFunds': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'amount',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'withDraw',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [],
                        'type': 'constructor'
                    }
                ],
                'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b6101b68061003f6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806314174f331461003957610037565b005b61004f6004808035906020019091905050610067565b60405180821515815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156100c557610002565b3073ffffffffffffffffffffffffffffffffffffffff163182111561015657600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003073ffffffffffffffffffffffffffffffffffffffff1631604051809050600060405180830381858888f1935050505090506101b1565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600083604051809050600060405180830381858888f1935050505090506101b1565b91905056'
            },
            'AkashaLib': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'first',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'second',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getIpfs',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'string'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'chunk',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'bytes32ToString',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'string'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [],
                        'type': 'constructor'
                    }
                ],
                'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b6105868061003f6000396000f360606040523615610053576000357c01000000000000000000000000000000000000000000000000000000009004806353ef4a531461006057806383197ef0146100ed5780639201de55146100fc57610053565b61005e5b610002565b565b005b61007f6004808035906020019091908035906020019091905050610180565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156100df5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100fa60048050506101ca565b005b6101126004808035906020019091905050610263565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101725780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60206040519081016040528060008152602001506101bd6101a6836000191661029c9090565b6101b5856000191661029c9090565b6102e8909190565b90506101c4565b92915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561022657610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b6020604051908101604052806000815260200150610290610289836000191661029c9090565b61037f9090565b9050610297565b919050565b60406040519081016040528060008152602001600081526020015060405160208101604052828152806020830152506102d4826103f6565b81600001909081815260200150505b919050565b602060405190810160405280600081526020015060206040519081016040528060008152602001506000836000015185600001510160405180591061032a5750595b908082528060200260200182016040525091506020820190506103568186602001518760000151610533565b61036f8560000151820185602001518660000151610533565b819250610377565b505092915050565b60206040519081016040528060008152602001506020604051908101604052806000815260200150600083600001516040518059106103bb5750595b908082528060200260200182016040525091506020820190506103e78185602001518660000151610533565b8192506103ef565b5050919050565b60006000600060010283600019161415610413576000915061052d565b60006001026fffffffffffffffffffffffffffffffff6001028416600019161415610460576010810190508050700100000000000000000000000000000000836001900404600102925082505b600060010267ffffffffffffffff600102841660001916141561049d57600881019050805068010000000000000000836001900404600102925082505b600060010263ffffffff60010284166000191614156104d2576004810190508050640100000000836001900404600102925082505b600060010261ffff600102841660001916141561050357600281019050805062010000836001900404600102925082505b600060010260ff60010284166000191614156105225760018101905080505b80602003915061052d565b50919050565b60005b6020821015156105625782518452602084019350835060208301925082505b6020820391508150610536565b6001826020036101000a039050801983511681855116818117865250505b5050505056'
            },
            'AkashaMain': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            }
                        ],
                        'name': 'getScoreOfEntry',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            },
                            {
                                'name': 'weight',
                                'type': 'int8'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'upVoteComment',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            },
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            }
                        ],
                        'name': 'updateEntry',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getScoreOfComment',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entry',
                                'type': 'address'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getCommentAt',
                        'outputs': [
                            {
                                'name': 'date',
                                'type': 'uint256'
                            },
                            {
                                'name': 'poster',
                                'type': 'address'
                            },
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            },
                            {
                                'name': 'weight',
                                'type': 'int8'
                            }
                        ],
                        'name': 'downVoteEntry',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            }
                        ],
                        'name': 'voteEndDate',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            },
                            {
                                'name': 'weight',
                                'type': 'int8'
                            }
                        ],
                        'name': 'upVoteEntry',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'getFundsAddress',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entry',
                                'type': 'address'
                            }
                        ],
                        'name': 'getCommentsCount',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'canWithDraw',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            }
                        ],
                        'name': 'openedToVotes',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entry',
                                'type': 'address'
                            },
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'name': 'saveComment',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            },
                            {
                                'name': 'weight',
                                'type': 'int8'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'downVoteComment',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            },
                            {
                                'name': 'tags',
                                'type': 'bytes32[]'
                            }
                        ],
                        'name': 'publishEntry',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'name': 'entryAddress',
                                'type': 'address'
                            }
                        ],
                        'name': 'getVoteOf',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'int8'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entry',
                                'type': 'address'
                            },
                            {
                                'name': 'commentId',
                                'type': 'uint256'
                            },
                            {
                                'name': 'hash',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'name': 'updateComment',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [
                            {
                                'name': 'registryAddress',
                                'type': 'address'
                            },
                            {
                                'name': 'indexAddress',
                                'type': 'address'
                            },
                            {
                                'name': 'faucetAddress',
                                'type': 'address'
                            },
                            {
                                'name': 'fundsAddress',
                                'type': 'address'
                            }
                        ],
                        'type': 'constructor'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'entry',
                                'type': 'address'
                            }
                        ],
                        'name': 'Published',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'entry',
                                'type': 'address'
                            }
                        ],
                        'name': 'Commented',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'profile',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'entry',
                                'type': 'address'
                            },
                            {
                                'indexed': false,
                                'name': 'weight',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'Voted',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'method',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'reason',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'Error',
                        'type': 'event'
                    }
                ],
                'bytecode': '6060604052604051608080613a60833981016040528080519060200190919080519060200190919080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b83600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555082600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555033600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5050505061390d806101536000396000f360606040523615610103576000357c01000000000000000000000000000000000000000000000000000000009004806313c1bfc9146101055780631e742d0014610131578063218e8bdb1461015b5780632e7fe628146101a15780633feb2f8e146101d657806341c919341461024a57806362194be61461026b57806371b0d140146102975780638084387f146102b857806383197ef0146102f15780638924474e14610300578063adb4803a1461032c578063b2bdfa7b14610351578063c5568c061461038a578063d5097103146103b8578063d7c69b9a146103fe578063d958c06614610428578063edfcded1146104a9578063fc443d1a146104e157610103565b005b61011b6004808035906020019091905050610546565b6040518082815260200191505060405180910390f35b610159600480803590602001909190803590602001909190803590602001909190505061061b565b005b61019f600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091908035906020019091905050610d49565b005b6101c06004808035906020019091908035906020019091905050611003565b6040518082815260200191505060405180910390f35b6101f56004808035906020019091908035906020019091905050611115565b604051808481526020018373ffffffffffffffffffffffffffffffffffffffff168152602001826002602002808383829060006004602084601f0104600f02600301f150905001935050505060405180910390f35b6102696004808035906020019091908035906020019091905050611216565b005b61028160048080359060200190919050506117fa565b6040518082815260200191505060405180910390f35b6102b66004808035906020019091908035906020019091905050611849565b005b6102c56004805050611e02565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102fe6004805050611e31565b005b6103166004808035906020019091905050611eca565b6040518082815260200191505060405180910390f35b6103396004805050611f0b565b60405180821515815260200191505060405180910390f35b61035e6004805050611f64565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103a06004808035906020019091905050611f8a565b60405180821515815260200191505060405180910390f35b6103fc600480803590602001909190806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091905050611fb3565b005b610426600480803590602001909190803590602001909190803590602001909190505061235a565b005b6104a76004808060400190600280602002604051908101604052809291908260026020028082843782019150505050509090919080359060200190820180359060200191919080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050909091905050612992565b005b6104c86004808035906020019091908035906020019091905050612f48565b604051808260000b815260200191505060405180910390f35b61052e600480803590602001909190803590602001909190806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091905050612fc1565b60405180821515815260200191505060405180910390f35b6000600060016002600460005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060020160009054906101000a900460030b600460005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060020160009054906101000a900460030b0260030b0401600460005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160005054029050809150610615565b50919050565b60006000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff16141561070357610002565b8360006000600060018460000b128061071f5750600a8460000b135b1561072957610002565b82156107405766038d7ea4c680009150815061074c565b655af3107a4000915081505b83840260000b820290508034101561076357610002565b8861076d81611f8a565b151561077857610002565b6000600560005060008c73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005089815481101561000257906000526020600020906004020160005b506000016000505414156107d757610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509650600560005060008b73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005088815481101561000257906000526020600020906004020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166350228201604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509550600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141561099957610002565b600660005060008b73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008981526020019081526020016000206000506000016000508054806001018281815481835581811511610a2f57818360005260206000209182019101610a2e9190610a10565b80821115610a2a5760008181506000905550600101610a10565b5090565b5b5050509190906000526020600020900160005b89909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505088600660005060008c73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008a815260200190815260200160002060005060030160005060008973ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508860000b600660005060008c73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008a81526020019081526020016000206000506001016000505401600660005060008c73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008a8152602001908152602001600020600050600101600050819055506001600660005060008c73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008a815260200190815260200160002060005060020160009054906101000a900460030b01600660005060008c73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008a815260200190815260200160002060005060020160006101000a81548163ffffffff02191690837c01000000000000000000000000000000000000000000000000000000009081020402179055508573ffffffffffffffffffffffffffffffffffffffff16600034604051809050600060405180830381858888f1935050505015610d37578673ffffffffffffffffffffffffffffffffffffffff167f174ba19ba3c8bb5c679c87e51db79fff7c3f04bb84c1fd55b7dacb470b674aa68b8b60000b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a2610d3c565b610002565b50505050505b5050505050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff161415610e2f57610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090508073ffffffffffffffffffffffffffffffffffffffff16600360005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610ffd5782600360005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160005090600282600290908101928215610fcf579160200282015b82811115610fce578251826000505591602001919060010190610fb0565b5b509050610ffa9190610fdc565b80821115610ff65760008181506000905550600101610fdc565b5090565b50505b5b505050565b6000600060016002600660005060008773ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600086815260200190815260200160002060005060020160009054906101000a900460030b600660005060008873ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600087815260200190815260200160002060005060020160009054906101000a900460030b0260030b0401600660005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008581526020019081526020016000206000506001016000505402905080915061110e565b5092915050565b600060006040604051908101604052806002905b6000815260200190600190039081611129579050506000600560005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005085815481101561000257906000526020600020906004020160005b50905080600001600050548160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600101600050806002806020026040519081016040528092919082600280156111fc576020028201915b8160005054815260200190600101908083116111e5575b5050505050905093509350935061120e565b509250925092565b6000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff1614156112fc57610002565b8160016000600060018460000b12806113185750600a8460000b135b1561132257610002565b82156113395766038d7ea4c6800091508150611345565b655af3107a4000915081505b83840260000b820290508034101561135c57610002565b8661136681611f8a565b151561137157610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015095506000600460005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060030160005060008873ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b14151561149957610002565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600034604051809050600060405180830381858888f19350505050156117ea57600460005060008973ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506000016000508054806001018281815481835581811511611574578183600052602060002091820191016115739190611555565b8082111561156f5760008181506000905550600101611555565b5090565b5b5050509190906000526020600020900160005b88909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505086600003600460005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060030160005060008873ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508660000360000b600460005060008a73ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506001016000505401600460005060008a73ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600101600050819055506001600460005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060020160009054906101000a900460030b01600460005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060020160006101000a81548163ffffffff02191690837c01000000000000000000000000000000000000000000000000000000009081020402179055508573ffffffffffffffffffffffffffffffffffffffff167f174ba19ba3c8bb5c679c87e51db79fff7c3f04bb84c1fd55b7dacb470b674aa6898960000360000b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a26117ef565b610002565b50505050505b505050565b600060006207e900600360005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005054019050809150611843565b50919050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff16141561192f57610002565b8160016000600060018460000b128061194b5750600a8460000b135b1561195557610002565b821561196c5766038d7ea4c6800091508150611978565b655af3107a4000915081505b83840260000b820290508034101561198f57610002565b8661199981611f8a565b15156119a457610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015095506000600460005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060030160005060008873ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b141515611acc57610002565b8773ffffffffffffffffffffffffffffffffffffffff16600034604051809050600060405180830381858888f1935050505015611df257600460005060008973ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506000016000508054806001018281815481835581811511611b8557818360005260206000209182019101611b849190611b66565b80821115611b805760008181506000905550600101611b66565b5090565b5b5050509190906000526020600020900160005b88909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505086600460005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060030160005060008873ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508660000b600460005060008a73ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506001016000505401600460005060008a73ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600101600050819055506001600460005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060020160009054906101000a900460030b01600460005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060020160006101000a81548163ffffffff02191690837c01000000000000000000000000000000000000000000000000000000009081020402179055508573ffffffffffffffffffffffffffffffffffffffff167f174ba19ba3c8bb5c679c87e51db79fff7c3f04bb84c1fd55b7dacb470b674aa6898960000b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a2611df7565b610002565b50505050505b505050565b6000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050611e2e565b90565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611e8d57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b6000600560005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050805490509050611f06565b919050565b60006000600360005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050541415611f5057610002565b611f5933611f8a565b159050611f61565b90565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000611f95826117fa565b421115611fa55760009050611fae565b60019050611fae565b919050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff16141561209957610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509050600560005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005080548060010182818154818355818115116122055760040281600402836000526020600020918201910161220491906121a9565b8082111561220057600060008201600050600090556001820160005060008155600101600090556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506004016121a9565b5090565b5b5050509190906000526020600020906004020160005b606060405190810160405280428152602001868152602001858152602001509091909150600082015181600001600050556020820151816001016000509060028260029090810192821561228f579160200282015b8281111561228e578251826000505591602001919060010190612270565b5b5090506122ba919061229c565b808211156122b6576000818150600090555060010161229c565b5090565b505060408201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505050508073ffffffffffffffffffffffffffffffffffffffff167f1fbc63d1b621631255c00a9e8385fd024d3a9ccdf920fca392ff12b1b0db5aac84604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b505050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff16141561244057610002565b8260006000600060018460000b128061245c5750600a8460000b135b1561246657610002565b821561247d5766038d7ea4c6800091508150612489565b655af3107a4000915081505b83840260000b82029050803410156124a057610002565b876124aa81611f8a565b15156124b557610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015095506000600560005060008b73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005088815481101561000257906000526020600020906004020160005b506000016000505414156125c157610002565b600660005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008881526020019081526020016000206000506000016000508054806001018281815481835581811511612657578183600052602060002091820191016126569190612638565b808211156126525760008181506000905550600101612638565b5090565b5b5050509190906000526020600020900160005b88909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505087600003600660005060008b73ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600089815260200190815260200160002060005060030160005060008873ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508760000360000b600660005060008b73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008981526020019081526020016000206000506001016000505401600660005060008b73ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506000898152602001908152602001600020600050600101600050819055506001600660005060008b73ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600089815260200190815260200160002060005060020160009054906101000a900460030b01600660005060008b73ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600089815260200190815260200160002060005060020160006101000a81548163ffffffff02191690837c0100000000000000000000000000000000000000000000000000000000908102040217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600034604051809050600060405180830381858888f1935050505015612986578573ffffffffffffffffffffffffffffffffffffffff167f174ba19ba3c8bb5c679c87e51db79fff7c3f04bb84c1fd55b7dacb470b674aa68a8a60000360000b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a25b50505050505b50505050565b60006000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff161415612a7a57610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509150308260405161064c806132c1833901808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050604051809103906000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515612ec05760606040519081016040528042815260200185815260200183815260200150600360005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506000820151816000016000505560208201518160010160005090600282600290908101928215612c53579160200282015b82811115612c52578251826000505591602001919060010190612c34565b5b509050612c7e9190612c60565b80821115612c7a5760008181506000905550600101612c60565b5090565b505060408201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550905050600960005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508054806001018281815481835581811511612d3057818360005260206000209182019101612d2f9190612d11565b80821115612d2b5760008181506000905550600101612d11565b5090565b5b5050509190906000526020600020900160005b83909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634aa691e38285604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f15090500193505050506020604051808303816000876161da5a03f1156100025750505060405180519060200150508173ffffffffffffffffffffffffffffffffffffffff167fac4935bb64d58dc96ef858c4d1f3b750155784a2155c4ce27e322fe81f40ab7482604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a2612f41565b7f6d61696e3a7075626c6973680000000000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f6661696c65640000000000000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a25b5b50505050565b6000600460005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060030160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b9050612fbb565b92915050565b60006000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff1614156130a957610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090508073ffffffffffffffffffffffffffffffffffffffff16600560005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005085815481101561000257906000526020600020906004020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561320257600091506132b9565b82600560005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005085815481101561000257906000526020600020906004020160005b506001016000509060028260029090810192821561328b579160200282015b8281111561328a57825182600050559160200191906001019061326c565b5b5090506132b69190613298565b808211156132b25760008181506000905550600101613298565b5090565b50505b50939250505056606060405260405160408061064c833981016040528080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505061058e806100be6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480630fdb1c101461004f57806383197ef014610074578063b2bdfa7b146100835761004d565b005b61005c60048050506100bc565b60405180821515815260200191505060405180910390f35b61008160048050506104cf565b005b6100906004805050610568565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006000600060003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561012057610002565b60643073ffffffffffffffffffffffffffffffffffffffff1631049250600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166350228201604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638084387f604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663adb4803a604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001501515610377577f7769746844726177000000000000000000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f6e6f74456c696769626c65000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a2600093506104c9565b8073ffffffffffffffffffffffffffffffffffffffff16600084604051809050600060405180830381858888f193505050501561043f577f7c689434bedaf72871fd778e5259daba90e26b33d73ac430b39b72eb4102aab4823073ffffffffffffffffffffffffffffffffffffffff1631604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a18173ffffffffffffffffffffffffffffffffffffffff16ff600193506104c9566104c8565b7f7769746844726177000000000000000000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f6665654572726f72000000000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a2600093506104c9565b5b50505090565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561052b57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
            },
            'AkashaProfile': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'getCollector',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'newAddr',
                                'type': 'address'
                            }
                        ],
                        'name': 'setEthAddress',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'chunks',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'name': 'setHash',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'getIpfs',
                        'outputs': [
                            {
                                'name': 'chunk1',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'chunk2',
                                'type': 'bytes32'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [
                            {
                                'name': 'owner',
                                'type': 'address'
                            },
                            {
                                'name': 'registrar',
                                'type': 'address'
                            },
                            {
                                'name': 'chunks',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'type': 'constructor'
                    },
                    {
                        'anonymous': false,
                        'inputs': [],
                        'name': 'UpdateInfo',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'method',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'reason',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'Error',
                        'type': 'event'
                    }
                ],
                'bytecode': '606060405260405160808061065f8339810160405280805190602001909190805190602001909190908160400150505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b82600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550806002600050906002826002909081019282156100c4579160200282015b828111156100c35782518260005055916020019190600101906100a5565b5b5090506100ef91906100d1565b808211156100eb57600081815060009055506001016100d1565b5090565b505081915081505b505050610557806101086000396000f360606040523615610074576000357c010000000000000000000000000000000000000000000000000000000090048063502282011461008157806383197ef0146100ba5780639b0da5d5146100c9578063a5685446146100e1578063b2bdfa7b1461011e578063f8dd5af51461015757610074565b61007f5b610002565b565b005b61008e6004805050610189565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100c7600480505061023a565b005b6100df600480803590602001909190505061036c565b005b61011c6004808060400190600280602002604051908101604052809291908260026020028082843782019150505050509090919050506103f7565b005b61012b60048050506104f0565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101646004805050610516565b6040518083600019168152602001826000191681526020019250505060405180910390f35b6000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561020d57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610237565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610237565b90565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561029857610002565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e79a198f604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509050801561036857600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156103c857610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561045357610002565b80600260005090600282600290908101928215610490579160200282015b8281111561048f578251826000505591602001919060010190610471565b5b5090506104bb919061049d565b808211156104b7576000818150600090555060010161049d565b5090565b50507f0427fd93f6c08e97e259405a615c46287516c798e04e361edde42cbb14ccd2a260405180905060405180910390a15b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060006002600050600060028110156100025790900160005b50546002600050600160028110156100025790900160005b505491509150610553565b909156'
            },
            'AkashaRegistry': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [],
                        'name': 'getMyProfile',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'addr',
                                'type': 'address'
                            }
                        ],
                        'name': 'getByAddr',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'name',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getById',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'name',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'ipfsChunks',
                                'type': 'bytes32[2]'
                            }
                        ],
                        'name': 'register',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'name',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'hasProfile',
                        'outputs': [
                            {
                                'name': 'exists',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'unregister',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'id',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'contr',
                                'type': 'address'
                            }
                        ],
                        'name': 'Register',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'method',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'reason',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'Error',
                        'type': 'event'
                    }
                ],
                'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b610e368061003f6000396000f36060604052361561008a576000357c01000000000000000000000000000000000000000000000000000000009004806321527e5014610097578063259a1a34146100d05780632dff0d0d1461011257806330d000121461015457806383197ef0146101b0578063ad4b7cb1146101bf578063b2bdfa7b146101ed578063e79a198f146102265761008a565b6100955b610002565b565b005b6100a4600480505061024b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100e66004808035906020019091905050610260565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101286004808035906020019091905050610300565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610198600480803590602001909190806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091905050610349565b60405180821515815260200191505060405180910390f35b6101bd6004805050610594565b005b6101d5600480803590602001909190505061062d565b60405180821515815260200191505060405180910390f35b6101fa60048050506106b4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61023360048050506106da565b60405180821515815260200191505060405180910390f35b600061025633610260565b905061025d565b90565b6000600160005060006002600050600085604051808273ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206000191681526020019081526020016000206000505460001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506102fb565b919050565b6000600160005060008360001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610344565b919050565b60006103548361062d565b156103e2577f52656769737472793a7265676973746572000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f68617350726f66696c6500000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a26000905061058e565b33308360405161065f806107d7833901808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001826002602002808383829060006004602084601f0104600f02600301f1509050019350505050604051809103906000f0600160005060008560001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550826002600050600033604051808273ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206000191681526020019081526020016000206000508190555082600019167f1082cda15f9606da555bb7e9bf4eeee2f8e34abe85d3924bf9bacb716f8feca6600160005060008660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a26001905061058e565b92915050565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156105f057610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b6000600073ffffffffffffffffffffffffffffffffffffffff1661065083610300565b73ffffffffffffffffffffffffffffffffffffffff161415806106a85750600073ffffffffffffffffffffffffffffffffffffffff1661068f33610260565b73ffffffffffffffffffffffffffffffffffffffff1614155b90506106af565b919050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600033604051808273ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014019150506040518091039020905061074160026000506000836000191681526020019081526020016000206000505461062d565b156107ca576001600050600060026000506000846000191681526020019081526020016000206000505460001916815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600260005060008260001916815260200190815260200160002060005060009055600191506107d3565b600091506107d3565b509056606060405260405160808061065f8339810160405280805190602001909190805190602001909190908160400150505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b82600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550806002600050906002826002909081019282156100c4579160200282015b828111156100c35782518260005055916020019190600101906100a5565b5b5090506100ef91906100d1565b808211156100eb57600081815060009055506001016100d1565b5090565b505081915081505b505050610557806101086000396000f360606040523615610074576000357c010000000000000000000000000000000000000000000000000000000090048063502282011461008157806383197ef0146100ba5780639b0da5d5146100c9578063a5685446146100e1578063b2bdfa7b1461011e578063f8dd5af51461015757610074565b61007f5b610002565b565b005b61008e6004805050610189565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100c7600480505061023a565b005b6100df600480803590602001909190505061036c565b005b61011c6004808060400190600280602002604051908101604052809291908260026020028082843782019150505050509090919050506103f7565b005b61012b60048050506104f0565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101646004805050610516565b6040518083600019168152602001826000191681526020019250505060405180910390f35b6000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561020d57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610237565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610237565b90565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561029857610002565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e79a198f604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f11561000257505050604051805190602001509050801561036857600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156103c857610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561045357610002565b80600260005090600282600290908101928215610490579160200282015b8281111561048f578251826000505591602001919060010190610471565b5b5090506104bb919061049d565b808211156104b7576000818150600090555060010161049d565b5090565b50507f0427fd93f6c08e97e259405a615c46287516c798e04e361edde42cbb14ccd2a260405180905060405180910390a15b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060006002600050600060028110156100025790900160005b50546002600050600160028110156100025790900160005b505491509150610553565b909156'
            },
            'AkashaTags': {
                'interface': [
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'exists',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'add',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'getTagId',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'position',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getTagAt',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bytes32'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_length',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'TagCreated',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'method',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'reason',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'Error',
                        'type': 'event'
                    }
                ],
                'bytecode': '606060405260016003600050555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b61049d806100476000396000f36060604052361561007f576000357c01000000000000000000000000000000000000000000000000000000009004806338a699a41461008c578063446bffba146100ba5780636d74e7ab146100e657806383197ef014610112578063b2bdfa7b14610121578063d857eba61461015a578063fa2b42811461018a5761007f565b61008a5b610002565b565b005b6100a260048080359060200190919050506101ad565b60405180821515815260200191505060405180910390f35b6100d060048080359060200190919050506101dd565b6040518082815260200191505060405180910390f35b6100fc600480803590602001909190505061037c565b6040518082815260200191505060405180910390f35b61011f60048050506103a8565b005b61012e6004805050610441565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101706004808035906020019091905050610467565b604051808260001916815260200191505060405180910390f35b6101976004805050610494565b6040518082815260200191505060405180910390f35b60006000600160005060008460001916815260200190815260200160002060005054141590506101d8565b919050565b60006101e8826101ad565b15610276577f5461673a61646400000000000000000000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f6578697374730000000000000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a260009050610377565b600260005080548060010182818154818355818115116102c8578183600052602060002091820191016102c791906102a9565b808211156102c357600081815060009055506001016102a9565b5090565b5b5050509190906000526020600020900160005b8490919091505550600360005054600160005060008460001916815260200190815260200160002060005081905550600360008181505480929190600101919050555081600019167f2cbbbefb5b1acf02521fecc3ca9bbb887bdd88549017993f7fffa8e5bc27cc6860405180905060405180910390a26001600050600083600019168152602001908152602001600020600050549050610377565b919050565b600060016000506000836000191681526020019081526020016000206000505490506103a3565b919050565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561040457610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260005082815481101561000257906000526020600020900160005b5054905061048f565b919050565b6003600050548156'
            },
            'IndexedTags': {
                'interface': [
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'subscribe',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'subscriber',
                                'type': 'address'
                            },
                            {
                                'name': 'tagId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'isSubscribed',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'tag',
                                'type': 'bytes32'
                            },
                            {
                                'name': 'subPosition',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'unsubscribe',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'entryAddr',
                                'type': 'address'
                            },
                            {
                                'name': 'tag',
                                'type': 'bytes32[]'
                            }
                        ],
                        'name': 'indexEntry',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'bool'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': 'subscriber',
                                'type': 'address'
                            },
                            {
                                'name': 'tagId',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'getSubPosition',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': 'mainAddress',
                                'type': 'address'
                            }
                        ],
                        'name': 'setMain',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': false,
                        'inputs': [],
                        'name': 'destroy',
                        'outputs': [],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': '',
                                'type': 'uint256'
                            }
                        ],
                        'name': 'cursor',
                        'outputs': [
                            {
                                'name': 'totalSubs',
                                'type': 'uint256'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': '_owner',
                        'outputs': [
                            {
                                'name': '',
                                'type': 'address'
                            }
                        ],
                        'type': 'function'
                    },
                    {
                        'inputs': [
                            {
                                'name': 'tags',
                                'type': 'address'
                            },
                            {
                                'name': 'registry',
                                'type': 'address'
                            }
                        ],
                        'type': 'constructor'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': false,
                                'name': 'tag',
                                'type': 'uint256'
                            },
                            {
                                'indexed': false,
                                'name': 'entry',
                                'type': 'address'
                            }
                        ],
                        'name': 'IndexedTag',
                        'type': 'event'
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': 'method',
                                'type': 'bytes32'
                            },
                            {
                                'indexed': false,
                                'name': 'reason',
                                'type': 'bytes32'
                            }
                        ],
                        'name': 'Error',
                        'type': 'event'
                    }
                ],
                'bytecode': '606060405260405160408061121b833981016040528080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5050611132806100e96000396000f360606040523615610095576000357c0100000000000000000000000000000000000000000000000000000000900480632faf44f6146100a257806336867ae6146100d057806340f74566146101075780634aa691e31461013e57806376831c22146101b0578063801161b0146101e557806383197ef0146101fd57806392cd94791461020c578063b2bdfa7b1461023857610095565b6100a05b610002565b565b005b6100b86004808035906020019091905050610271565b60405180821515815260200191505060405180910390f35b6100ef6004808035906020019091908035906020019091905050610604565b60405180821515815260200191505060405180910390f35b61012660048080359060200190919080359060200190919050506106be565b60405180821515815260200191505060405180910390f35b61019860048080359060200190919080359060200190820180359060200191919080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050909091905050610a9a565b60405180821515815260200191505060405180910390f35b6101cf6004808035906020019091908035906020019091905050610eba565b6040518082815260200191505060405180910390f35b6101fb6004808035906020019091905050610f6b565b005b61020a600480505061104f565b005b61022260048080359060200190919050506110e8565b6040518082815260200191505060405180910390f35b610245600480505061110c565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806104905750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a485604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506020604051808303816000876161da5a03f1156100025750505060405180519060200150155b806104a157506104a08183610604565b5b1561052f577f5461673a73756273637269626500000000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f6973537562736372696265640000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a2600092506105fd565b600560005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005080548060010182818154818355818115116105ab578183600052602060002091820191016105aa919061058c565b808211156105a6576000818150600090555060010161058c565b5090565b5b5050509190906000526020600020900160005b849091909150555060046000506000838152602001908152602001600020600050600101600081815054809291906001019190505550600192506105fd565b5050919050565b60006000600090505b600560005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050805490508110156106ae5782600560005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005082815481101561000257906000526020600020900160005b505414156106a057600191506106b7565b5b808060010191505061060d565b600091506106b7565b5092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab86604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663259a1a3433604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001509050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a486604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001501515610934577f5461673a756e7375627363726962650000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f7461672145786973740000000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a260009250610a92565b81600560005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005085815481101561000257906000526020600020900160005b5054141515610a0e577f5461673a756e7375627363726962650000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f6e6f745375627363726962656400000000000000000000000000000000000000604051808260001916815260200191505060405180910390a260009250610a92565b600560005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005084815481101561000257906000526020600020900160005b5060009055600460005060008381526020019081526020016000206000506001016000818150548092919060019003919050555060019250610a92565b505092915050565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610afa57610002565b600090505b8251811015610eaa57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a4848381518110156100025790602001906020020151604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506020604051808303816000876161da5a03f11561000257505050604051805190602001501515610c44577f5461673a696e6465780000000000000000000000000000000000000000000000600019167f20b95d47989a103df33423e539efac0be3fa8e6fd61af19d24050e331fe94f657f696e646578456e74727900000000000000000000000000000000000000000000604051808260001916815260200191505060405180910390a260009150610eb3565b60046000506000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab868581518110156100025790602001906020020151604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015081526020019081526020016000206000506000016000508054806001018281815481835581811511610d5c57818360005260206000209182019101610d5b9190610d3d565b80821115610d575760008181506000905550600101610d3d565b5090565b5b5050509190906000526020600020900160005b86909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550507f65e16ab7c9339d87377d6ad2c9233e53671562d663c9f30ee6a8dd861b8a1580600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab858481518110156100025790602001906020020151604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015085604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b8080600101915050610aff565b60019150610eb3565b5092915050565b60006000600090505b600560005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005080549050811015610f635782600560005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005082815481101561000257906000526020600020900160005b50541415610f5557809150610f64565b5b8080600101915050610ec3565b5b5092915050565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610fc757610002565b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561104b5780600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5b50565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156110ab57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b60046000506020528060005260406000206000915090508060010160005054905081565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156'
            }
        };

        this.classes = {};
        for (var key in this.headers) {
            this.classes[key] = new ContractWrapper(this.headers[key], _web3);
        }

        this.objects = {};
        for (var i in env.objects) {
            var obj = env.objects[i];
            this.objects[i] = this.classes[obj['class']].at(obj.address);
        }
    }

    return {
        Class: constructor,
        environments: environments
    };
})();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dapple['contracts'];
exports.classes = classes;