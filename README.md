# legacy-sol-health

## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.77.2 or higher
- Anchor CLI 0.30.1 or higher
- Solana CLI 1.18.17 or higher

### Installation

#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
pnpm install
```

#### Start the web app

```
pnpm dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the
command with `pnpm`, eg: `pnpm anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the
Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
pnpm anchor keys sync
```

#### Build the program:

```shell
pnpm anchor-build
```

#### Start the test validator with the program deployed:

```shell
pnpm anchor-localnet
```

#### Run the tests

```shell
pnpm anchor-test
```

#### Deploy to Devnet

```shell
pnpm anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
pnpm dev
```

Build the web app

```shell
pnpm build
```


## Project Abstract

The secure management of digital identities in healthcare is a critical and complex issue. Traditional identity systems in healthcare rely heavily on centralized authorities to store and manage sensitive patient information. While these systems have been the standard, they are increasingly vulnerable to privacy breaches, unauthorized access, and inefficiencies that compromise the security and autonomy of patients’ data. Addressing these limitations requires innovative solutions that can protect patient information, reduce the risk of data misuse, and provide patients with greater control over their digital identities. This study investigates the potential of blockchain technology as a transformative tool for healthcare identity management, focusing on creating a secure and decentralized framework.The research identifies two major challenges in this domain. The first is ensuring that sensitive patient information remains protected from unauthorized access while allowing for seamless and secure sharing of data among authorized parties. The second challenge is designing a system that is user-friendly and accessible, yet does not compromise on the decentralized control of identity, which is crucial for empowering patients to take ownership of their data. To address these challenges, the study proposes a self-sovereign identity (SSI) platform built on blockchain technology. This platform enables patients to control their digital identities independently, without relying on a central authority. The system incorporates advanced encryption techniques and biometrics to ensure that access to health records is secure, tamper-proof, and only granted to authorized individuals or entities. Blockchain's decentralized nature ensures that patient data is not stored in a single, vulnerable location, significantly reducing the risk of breaches.The outcome of this research is a privacy-preserving digital identity management system tailored to the unique needs of the healthcare sector. By leveraging blockchain’s transparency and immutability, the system enhances patient autonomy and trust while minimizing the risks associated with traditional, centralized models. The proposed solution has the potential to revolutionize healthcare identity management by offering a secure, scalable, and patient-centric approach. This innovation not only addresses current vulnerabilities but also sets a new standard for protecting and managing healthcare identities in a digital age.
