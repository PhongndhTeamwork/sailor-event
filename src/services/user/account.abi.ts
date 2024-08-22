export const accountAbi = [
  {
    name: 'SRC6Impl',
    type: 'impl',
    interface_name: 'openzeppelin::account::interface::ISRC6',
  },
  {
    name: 'core::starknet::account::Call',
    type: 'struct',
    members: [
      {
        name: 'to',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'selector',
        type: 'core::felt252',
      },
      {
        name: 'calldata',
        type: 'core::array::Array::<core::felt252>',
      },
    ],
  },
  {
    name: 'core::array::Span::<core::felt252>',
    type: 'struct',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<core::felt252>',
      },
    ],
  },
  {
    name: 'openzeppelin::account::interface::ISRC6',
    type: 'interface',
    items: [
      {
        name: '__execute__',
        type: 'function',
        inputs: [
          {
            name: 'calls',
            type: 'core::array::Array::<core::starknet::account::Call>',
          },
        ],
        outputs: [
          {
            type: 'core::array::Array::<core::array::Span::<core::felt252>>',
          },
        ],
        state_mutability: 'view',
      },
      {
        name: '__validate__',
        type: 'function',
        inputs: [
          {
            name: 'calls',
            type: 'core::array::Array::<core::starknet::account::Call>',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
      {
        name: 'is_valid_signature',
        type: 'function',
        inputs: [
          {
            name: 'hash',
            type: 'core::felt252',
          },
          {
            name: 'signature',
            type: 'core::array::Array::<core::felt252>',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    name: 'SRC6CamelOnlyImpl',
    type: 'impl',
    interface_name: 'openzeppelin::account::interface::ISRC6CamelOnly',
  },
  {
    name: 'openzeppelin::account::interface::ISRC6CamelOnly',
    type: 'interface',
    items: [
      {
        name: 'isValidSignature',
        type: 'function',
        inputs: [
          {
            name: 'hash',
            type: 'core::felt252',
          },
          {
            name: 'signature',
            type: 'core::array::Array::<core::felt252>',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    name: 'PublicKeyImpl',
    type: 'impl',
    interface_name: 'openzeppelin::account::interface::IPublicKey',
  },
  {
    name: 'openzeppelin::account::interface::IPublicKey',
    type: 'interface',
    items: [
      {
        name: 'get_public_key',
        type: 'function',
        inputs: [],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
      {
        name: 'set_public_key',
        type: 'function',
        inputs: [
          {
            name: 'new_public_key',
            type: 'core::felt252',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
    ],
  },
  {
    name: 'PublicKeyCamelImpl',
    type: 'impl',
    interface_name: 'openzeppelin::account::interface::IPublicKeyCamel',
  },
  {
    name: 'openzeppelin::account::interface::IPublicKeyCamel',
    type: 'interface',
    items: [
      {
        name: 'getPublicKey',
        type: 'function',
        inputs: [],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
      {
        name: 'setPublicKey',
        type: 'function',
        inputs: [
          {
            name: 'newPublicKey',
            type: 'core::felt252',
          },
        ],
        outputs: [],
        state_mutability: 'external',
      },
    ],
  },
  {
    name: 'DeclarerImpl',
    type: 'impl',
    interface_name: 'openzeppelin::account::interface::IDeclarer',
  },
  {
    name: 'openzeppelin::account::interface::IDeclarer',
    type: 'interface',
    items: [
      {
        name: '__validate_declare__',
        type: 'function',
        inputs: [
          {
            name: 'class_hash',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    name: 'DeployableImpl',
    type: 'impl',
    interface_name: 'openzeppelin::account::interface::IDeployable',
  },
  {
    name: 'openzeppelin::account::interface::IDeployable',
    type: 'interface',
    items: [
      {
        name: '__validate_deploy__',
        type: 'function',
        inputs: [
          {
            name: 'class_hash',
            type: 'core::felt252',
          },
          {
            name: 'contract_address_salt',
            type: 'core::felt252',
          },
          {
            name: 'public_key',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::felt252',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    name: 'SRC5Impl',
    type: 'impl',
    interface_name: 'openzeppelin::introspection::interface::ISRC5',
  },
  {
    name: 'core::bool',
    type: 'enum',
    variants: [
      {
        name: 'False',
        type: '()',
      },
      {
        name: 'True',
        type: '()',
      },
    ],
  },
  {
    name: 'openzeppelin::introspection::interface::ISRC5',
    type: 'interface',
    items: [
      {
        name: 'supports_interface',
        type: 'function',
        inputs: [
          {
            name: 'interface_id',
            type: 'core::felt252',
          },
        ],
        outputs: [
          {
            type: 'core::bool',
          },
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    name: 'constructor',
    type: 'constructor',
    inputs: [
      {
        name: 'public_key',
        type: 'core::felt252',
      },
    ],
  },
  {
    kind: 'struct',
    name: 'openzeppelin::account::account::AccountComponent::OwnerAdded',
    type: 'event',
    members: [
      {
        kind: 'data',
        name: 'new_owner_guid',
        type: 'core::felt252',
      },
    ],
  },
  {
    kind: 'struct',
    name: 'openzeppelin::account::account::AccountComponent::OwnerRemoved',
    type: 'event',
    members: [
      {
        kind: 'data',
        name: 'removed_owner_guid',
        type: 'core::felt252',
      },
    ],
  },
  {
    kind: 'enum',
    name: 'openzeppelin::account::account::AccountComponent::Event',
    type: 'event',
    variants: [
      {
        kind: 'nested',
        name: 'OwnerAdded',
        type: 'openzeppelin::account::account::AccountComponent::OwnerAdded',
      },
      {
        kind: 'nested',
        name: 'OwnerRemoved',
        type: 'openzeppelin::account::account::AccountComponent::OwnerRemoved',
      },
    ],
  },
  {
    kind: 'enum',
    name: 'openzeppelin::introspection::src5::SRC5Component::Event',
    type: 'event',
    variants: [],
  },
  {
    kind: 'enum',
    name: 'openzeppelin::presets::account::Account::Event',
    type: 'event',
    variants: [
      {
        kind: 'flat',
        name: 'AccountEvent',
        type: 'openzeppelin::account::account::AccountComponent::Event',
      },
      {
        kind: 'flat',
        name: 'SRC5Event',
        type: 'openzeppelin::introspection::src5::SRC5Component::Event',
      },
    ],
  },
];
