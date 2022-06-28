import {
  Connection,
  TransactionSignature,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';
import {getNodeURL} from '@figment-solana/lib';

export default async function fund(
  receiver: PublicKey,
  lamports: number = LAMPORTS_PER_SOL,
  network?: string,
): Promise<TransactionSignature> {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');
  const hash = await connection.requestAirdrop(receiver, lamports);
  await connection.confirmTransaction(hash);
  return hash;
}
