import {LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import type {NextApiRequest, NextApiResponse} from 'next';
import fundLib from '../../../lib/solana/fund';

export default async function fund(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {network, address} = req.body;
    const receiver = new PublicKey(address);
    const hash = await fundLib(receiver, LAMPORTS_PER_SOL, network);
    res.status(200).json(hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
