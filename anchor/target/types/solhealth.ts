/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solhealth.json`.
 */
export type Solhealth = {
  "address": "EPvFfFfRmbt1ZPtgstNFePa8BGNDfBPUBmY6t9mGYT7Z",
  "metadata": {
    "name": "solhealth",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createPatient",
      "discriminator": [
        176,
        85,
        210,
        156,
        179,
        74,
        60,
        203
      ],
      "accounts": [
        {
          "name": "patient",
          "writable": true,
          "signer": true
        },
        {
          "name": "patientIdentity",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  116,
                  105,
                  101,
                  110,
                  116,
                  95,
                  105,
                  100,
                  101,
                  110,
                  116,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "patient"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "patientId",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "phone",
          "type": "string"
        },
        {
          "name": "dataHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "grantRecordAccess",
      "discriminator": [
        32,
        57,
        91,
        214,
        6,
        106,
        252,
        237
      ],
      "accounts": [
        {
          "name": "patient",
          "writable": true,
          "signer": true
        },
        {
          "name": "patientIdentity"
        },
        {
          "name": "provider",
          "writable": true
        },
        {
          "name": "accessControl",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "recordType",
          "type": {
            "defined": {
              "name": "recordType"
            }
          }
        },
        {
          "name": "recordTypeDiscriminant",
          "type": "u8"
        },
        {
          "name": "accessDuration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "insertMedicalRecord",
      "discriminator": [
        15,
        206,
        79,
        121,
        230,
        11,
        237,
        184
      ],
      "accounts": [
        {
          "name": "patient",
          "writable": true,
          "signer": true
        },
        {
          "name": "patientIdentity"
        },
        {
          "name": "medicalRecord",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  100,
                  105,
                  99,
                  97,
                  108,
                  45,
                  114,
                  101,
                  99,
                  111,
                  114,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "patientIdentity"
              },
              {
                "kind": "arg",
                "path": "recordId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "recordId",
          "type": "string"
        },
        {
          "name": "recordType",
          "type": {
            "defined": {
              "name": "recordType"
            }
          }
        },
        {
          "name": "imageUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "revokeRecordAccess",
      "discriminator": [
        180,
        88,
        36,
        123,
        244,
        11,
        203,
        42
      ],
      "accounts": [
        {
          "name": "patient",
          "writable": true,
          "signer": true
        },
        {
          "name": "patientIdentity"
        },
        {
          "name": "accessControl",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "updateMedRecord",
      "discriminator": [
        239,
        39,
        234,
        60,
        106,
        181,
        59,
        68
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "medicalRecord",
          "writable": true
        },
        {
          "name": "patientIdentity"
        },
        {
          "name": "accessControl"
        }
      ],
      "args": [
        {
          "name": "recordType",
          "type": {
            "defined": {
              "name": "recordType"
            }
          }
        },
        {
          "name": "imageUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatePatientData",
      "discriminator": [
        196,
        32,
        168,
        171,
        75,
        147,
        102,
        107
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "patientIdentity",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "newName",
          "type": "string"
        },
        {
          "name": "newDataHash",
          "type": "string"
        },
        {
          "name": "isActive",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "accessControl",
      "discriminator": [
        147,
        81,
        178,
        92,
        223,
        66,
        181,
        132
      ]
    },
    {
      "name": "medicalRecord",
      "discriminator": [
        30,
        152,
        224,
        245,
        112,
        161,
        115,
        55
      ]
    },
    {
      "name": "patientIdentity",
      "discriminator": [
        53,
        142,
        193,
        5,
        169,
        49,
        82,
        135
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameTooLong",
      "msg": "Cannot initialize, name too long"
    },
    {
      "code": 6001,
      "name": "accessAlreadyRevoked",
      "msg": "Access has already been revoked"
    },
    {
      "code": 6002,
      "name": "accessExpired",
      "msg": "Access has expired"
    },
    {
      "code": 6003,
      "name": "unauthorized",
      "msg": "Unauthorized access attempt"
    },
    {
      "code": 6004,
      "name": "notPatientIdentityOwner",
      "msg": "The signer is not the owner of this patient identity."
    },
    {
      "code": 6005,
      "name": "providerNotSigner",
      "msg": "Provider must be a signer"
    },
    {
      "code": 6006,
      "name": "invalidRecordType",
      "msg": "Invalid Record Type"
    },
    {
      "code": 6007,
      "name": "recordPatientMismatch",
      "msg": "Medical record doesn't belong to this patient"
    },
    {
      "code": 6008,
      "name": "dataHashTooLong",
      "msg": "New data hash exceeds maximum length"
    },
    {
      "code": 6009,
      "name": "invalidAccessControl",
      "msg": "Access control doesn't match patient identity"
    }
  ],
  "types": [
    {
      "name": "accessControl",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "patient",
            "type": "pubkey"
          },
          {
            "name": "provider",
            "type": "pubkey"
          },
          {
            "name": "recordType",
            "type": {
              "defined": {
                "name": "recordType"
              }
            }
          },
          {
            "name": "grantedAt",
            "type": "u64"
          },
          {
            "name": "expiresAt",
            "type": "u64"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "medicalRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "patient",
            "type": "pubkey"
          },
          {
            "name": "recordType",
            "type": {
              "defined": {
                "name": "recordType"
              }
            }
          },
          {
            "name": "recordId",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "u64"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "patientIdentity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "patientId",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "phoneNumber",
            "type": "string"
          },
          {
            "name": "dataHash",
            "type": "string"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "isSoftDeleted",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u64"
          },
          {
            "name": "updatedAt",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "recordType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "medicalHistory"
          },
          {
            "name": "medication"
          },
          {
            "name": "labResults"
          },
          {
            "name": "imaging"
          },
          {
            "name": "insurance"
          }
        ]
      }
    }
  ]
};
