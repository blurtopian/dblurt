/**
 * @file Misc hive type definitions.
 * @author Johan Nordberg <code@johan-nordberg.com>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */
import { Account } from "./account";
import { Asset, Price } from "./asset";

/**
 * Large number that may be unsafe to represent natively in JavaScript.
 */
export type Bignum = string;

/**
 * Buffer wrapper that serializes to a hex-encoded string.
 */
export class HexBuffer {
  constructor(public buffer: Buffer) {}

  /**
   * Convenience to create a new HexBuffer, does not copy data if value passed is already a buffer.
   */
  public static from(value: Buffer | HexBuffer | number[] | string) {
    if (value instanceof HexBuffer) {
      return value;
    } else if (value instanceof Buffer) {
      return new HexBuffer(value);
    } else if (typeof value === "string") {
      return new HexBuffer(Buffer.from(value, "hex"));
    } else {
      return new HexBuffer(Buffer.from(value));
    }
  }

  public toString(encoding = "hex") {
    return this.buffer.toString(encoding);
  }

  public toJSON() {
    return this.toString();
  }
}

/**
 * Chain roperties that are decided by the witnesses.
 */
export interface ChainProperties {
  /**
   * This fee, paid in HIVE, is converted into VESTING SHARES for the new account. Accounts
   * without vesting shares cannot earn usage rations and therefore are powerless. This minimum
   * fee requires all accounts to have some kind of commitment to the network that includes the
   * ability to vote and make transactions.
   *
   * @note This has to be multiplied by STEEMIT ? `CREATE_ACCOUNT_WITH_HIVE_MODIFIER`
   *       (defined as 30 on the main chain) to get the minimum fee needed to create an account.
   *
   */
  account_creation_fee: string | Asset;
  /**
   * This witnesses vote for the maximum_block_size which is used by the network
   * to tune rate limiting and capacity.
   */
  maximum_block_size: number; // uint32_t
  /**
   * The HBD interest percentage rate decided by witnesses, expressed 0 to 10000.
   */
  hbd_interest_rate: number; // uint16_t
}

/** Config of Blurt RPC node */
export interface RpcNodeConfig {
  IS_TEST_NET:                   false
  BLURT_REDUCED_VOTE_POWER_RATE: number
  BLURT_100_PERCENT:             number
  BLURT_1_PERCENT:               number
  BLURT_ACCOUNT_RECOVERY_REQUEST_EXPIRATION_PERIOD: string
  BLURT_ACTIVE_CHALLENGE_COOLDOWN:                  string
  BLURT_ACTIVE_CHALLENGE_FEE: {
      amount:    string
      precision: number
      nai:       string
  }
  BLURT_ADDRESS_PREFIX:                       string
  BLURT_APR_PERCENT_MULTIPLY_PER_BLOCK:       string
  BLURT_APR_PERCENT_MULTIPLY_PER_HOUR:        string
  BLURT_APR_PERCENT_MULTIPLY_PER_ROUND:       string
  BLURT_APR_PERCENT_SHIFT_PER_BLOCK:          number
  BLURT_APR_PERCENT_SHIFT_PER_HOUR:           number
  BLURT_APR_PERCENT_SHIFT_PER_ROUND:          number
  BLURT_BANDWIDTH_AVERAGE_WINDOW_SECONDS:     number
  BLURT_BANDWIDTH_PRECISION:                  number
  BLURT_BENEFICIARY_LIMIT:                    number
  BLURT_BLOCKCHAIN_PRECISION:                 number
  BLURT_BLOCKCHAIN_PRECISION_DIGITS:          number
  BLURT_BLOCKCHAIN_HARDFORK_VERSION:          string
  BLURT_BLOCKCHAIN_VERSION:                   string
  BLURT_BLOCK_INTERVAL:                       number
  BLURT_BLOCKS_PER_DAY:                       number
  BLURT_BLOCKS_PER_HOUR:                      number
  BLURT_BLOCKS_PER_YEAR:                      number
  BLURT_CASHOUT_WINDOW_SECONDS:               number
  BLURT_CHAIN_ID:                             string
  BLURT_COMMENT_TITLE_LIMIT:                  number
  BLURT_REWARD_CONSTANT:                      string
  BLURT_CONTENT_REWARD_PERCENT_HF21:          number
  BLURT_CUSTOM_OP_DATA_MAX_LENGTH:            number
  BLURT_CUSTOM_OP_ID_MAX_LENGTH:              number
  BLURT_GENESIS_TIME:                         string
  BLURT_HARDFORK_REQUIRED_WITNESSES:          number
  BLURT_HF21_CONVERGENT_LINEAR_RECENT_CLAIMS: string
  BLURT_INFLATION_NARROWING_PERIOD:           number
  BLURT_INFLATION_RATE_START_PERCENT:         number
  BLURT_INFLATION_RATE_STOP_PERCENT:          number
  BLURT_INIT_MINER_NAME:                      string
  BLURT_INIT_PUBLIC_KEY_STR:                  string
  BLURT_INIT_SUPPLY:                          string
  BLURT_IRREVERSIBLE_THRESHOLD:               number
  BLURT_MAX_ACCOUNT_CREATION_FEE:             number
  BLURT_MAX_ACCOUNT_NAME_LENGTH:              number
  BLURT_MAX_ACCOUNT_WITNESS_VOTES:            number
  BLURT_MAX_ASSET_WHITELIST_AUTHORITIES:      number
  BLURT_MAX_AUTHORITY_MEMBERSHIP:             number
  BLURT_MAX_BLOCK_SIZE:                       number
  BLURT_SOFT_MAX_BLOCK_SIZE:                  number
  BLURT_MAX_CASHOUT_WINDOW_SECONDS:           number
  BLURT_MAX_COMMENT_DEPTH:                    number
  BLURT_MAX_INSTANCE_ID:                      string
  BLURT_MAX_MEMO_SIZE:                        number
  BLURT_MAX_WITNESSES:                        number
  BLURT_MAX_PERMLINK_LENGTH:                  number
  BLURT_MAX_PROXY_RECURSION_DEPTH:            number
  BLURT_MAX_RUNNER_WITNESSES_HF17:            number
  BLURT_MAX_SATOSHIS:                         string
  BLURT_MAX_SHARE_SUPPLY:                     string
  BLURT_MAX_SIG_CHECK_DEPTH:                  number
  BLURT_MAX_SIG_CHECK_ACCOUNTS:               number
  BLURT_MAX_TIME_UNTIL_EXPIRATION:            number
  BLURT_MAX_TRANSACTION_SIZE:                 number
  BLURT_MAX_UNDO_HISTORY:                     number
  BLURT_MAX_URL_LENGTH:                       number
  BLURT_MAX_VOTE_CHANGES:                     number
  BLURT_MAX_VOTED_WITNESSES_HF17:             number
  BLURT_MAX_WITHDRAW_ROUTES:                  number
  BLURT_MAX_WITNESS_URL_LENGTH:               number
  BLURT_MIN_ACCOUNT_CREATION_FEE:             number
  BLURT_MIN_ACCOUNT_NAME_LENGTH:              number
  BLURT_MIN_BLOCK_SIZE_LIMIT:                 number
  BLURT_MIN_BLOCK_SIZE:                       number
  BLURT_MIN_CONTENT_REWARD: {
      amount:    string
      precision: number
      nai:       string
  }
  BLURT_MIN_CURATE_REWARD: {
      amount:    string
      precision: number
      nai:       string
  }
  BLURT_MIN_PERMLINK_LENGTH:       number
  BLURT_MIN_REPLY_INTERVAL_HF20:   number
  BLURT_MIN_ROOT_COMMENT_INTERVAL: number
  BLURT_MIN_COMMENT_EDIT_INTERVAL: number
  BLURT_MIN_VOTE_INTERVAL_SEC:     number
  BLURT_MINER_ACCOUNT:             string
  BLURT_MIN_PAYOUT: {
      amount:    string
      precision: number
      nai:       string
  }
  BLURT_MIN_PRODUCER_REWARD: {
      amount:    string
      precision: number
      nai:       string
  }
  BLURT_MIN_TRANSACTION_EXPIRATION_LIMIT: number
  BLURT_MIN_TRANSACTION_SIZE_LIMIT:       number
  BLURT_MIN_UNDO_HISTORY:                 number
  BLURT_NULL_ACCOUNT:                     string
  BLURT_OWNER_AUTH_RECOVERY_PERIOD:       string
  BLURT_OWNER_CHALLENGE_COOLDOWN:         string
  BLURT_OWNER_CHALLENGE_FEE: {
      amount:    string
      precision: number
      nai:       string
  }
  BLURT_OWNER_UPDATE_LIMIT:                  number
  BLURT_POST_REWARD_FUND_NAME:               string
  BLURT_PROXY_TO_SELF_ACCOUNT:               string
  BLURT_SECONDS_PER_YEAR:                    number
  BLURT_PROPOSAL_FUND_PERCENT_HF21:          number
  BLURT_RECENT_RSHARES_DECAY_TIME_HF19:      string
  BLURT_REVERSE_AUCTION_WINDOW_SECONDS_HF21: number
  BLURT_ROOT_POST_PARENT:                    string
  BLURT_SAVINGS_WITHDRAW_REQUEST_LIMIT:      number
  BLURT_SAVINGS_WITHDRAW_TIME:               string
  BLURT_SOFT_MAX_COMMENT_DEPTH:              number
  BLURT_TEMP_ACCOUNT:                        string
  BLURT_UPVOTE_LOCKOUT_HF17:                 string
  BLURT_UPVOTE_LOCKOUT_SECONDS:              number
  BLURT_VESTING_FUND_PERCENT_HF16:           number
  BLURT_VESTING_WITHDRAW_INTERVALS:          number
  BLURT_VESTING_WITHDRAW_INTERVALS_HF5:      number
  BLURT_VESTING_WITHDRAW_INTERVAL_SECONDS:   number
  BLURT_VOTE_DUST_THRESHOLD:                 number
  BLURT_VOTING_MANA_REGENERATION_SECONDS:    number
  BLURT_SYMBOL: {
      nai:      string
      decimals: number
  }
  VESTS_SYMBOL: {
      nai:      string
      decimals: number
  }
  BLURT_VIRTUAL_SCHEDULE_LAP_LENGTH2:        string
  BLURT_DELEGATION_RETURN_PERIOD_HF20:       number
  BLURT_RD_MIN_DECAY_BITS:                   number
  BLURT_RD_MAX_DECAY_BITS:                   number
  BLURT_RD_DECAY_DENOM_SHIFT:                number
  BLURT_RD_MAX_POOL_BITS:                    number
  BLURT_RD_MAX_BUDGET_1:                     string
  BLURT_RD_MAX_BUDGET_2:                     number
  BLURT_RD_MAX_BUDGET_3:                     number
  BLURT_RD_MAX_BUDGET:                       number
  BLURT_RD_MIN_DECAY:                        number
  BLURT_RD_MIN_BUDGET:                       number
  BLURT_RD_MAX_DECAY:                        number
  BLURT_ACCOUNT_SUBSIDY_PRECISION:           number
  BLURT_WITNESS_SUBSIDY_BUDGET_PERCENT:      number
  BLURT_WITNESS_SUBSIDY_DECAY_PERCENT:       number
  BLURT_DEFAULT_ACCOUNT_SUBSIDY_DECAY:       number
  BLURT_DEFAULT_ACCOUNT_SUBSIDY_BUDGET:      number
  BLURT_DECAY_BACKSTOP_PERCENT:              number
  BLURT_BLOCK_GENERATION_POSTPONED_TX_LIMIT: number
  BLURT_PENDING_TRANSACTION_EXECUTION_LIMIT: number
  BLURT_TREASURY_ACCOUNT:                    string
  BLURT_TREASURY_FEE:                        number
  BLURT_PROPOSAL_MAINTENANCE_PERIOD:         number
  BLURT_PROPOSAL_MAINTENANCE_CLEANUP:        number
  BLURT_PROPOSAL_SUBJECT_MAX_LENGTH:         number
  BLURT_PROPOSAL_MAX_IDS_NUMBER:             number
  BLURT_PROPOSAL_MAX_END_DATE:               number
  BLURT_PROPOSAL_EXPIRATION_UNFUNDED:        number
  BLURT_INIT_POST_REWARD_BALANCE:            number
}

export interface VestingDelegation {
  /**
   * Delegation id.
   */
  id: number; // id_type
  /**
   * Account that is delegating vests to delegatee.
   */
  delegator: string; // account_name_type
  /**
   * Account that is receiving vests from delegator.
   */
  delegatee: string; // account_name_type
  /**
   * Amount of VESTS delegated.
   */
  vesting_shares: Asset | string;
  /**
   * Earliest date delegation can be removed.
   */
  min_delegation_time: string; // time_point_sec
}

/**
 * Node state.
 */
export interface DynamicGlobalProperties {
  id: number;
  /**
   * Current block height.
   */
  head_block_number: number;
  head_block_id: string;
  /**
   * UTC Server time, e.g. 2020-01-15T00:42:00
   */
  time: string;
  /**
   * Currently elected witness.
   */
  current_witness: string;
  /**
   * The total POW accumulated, aka the sum of num_pow_witness at the time
   * new POW is added.
   */
  total_pow: number;
  /**
   * The current count of how many pending POW witnesses there are, determines
   * the difficulty of doing pow.
   */
  num_pow_witnesses: number;
  virtual_supply: Asset | string;
  current_supply: Asset | string;
  /**
   * Total asset held in confidential balances.
   */
  confidential_supply: Asset | string;
  total_vesting_fund_blurt: Asset | string;
  total_vesting_shares: Asset | string;
  total_reward_fund_blurt: Asset | string;
  /**
   * The running total of REWARD^2.
   */
  total_reward_shares2: string;
  pending_rewarded_vesting_shares: Asset | string;
  pending_rewarded_vesting_blurt: Asset | string;
  /**
   * This property defines the interest rate that HBD deposits receive.
   */
  hbd_interest_rate: number;
  hbd_print_rate: number;
  /**
   *  Average block size is updated every block to be:
   *
   *     average_block_size = (99 * average_block_size + new_block_size) / 100
   *
   *  This property is used to update the current_reserve_ratio to maintain
   *  approximately 50% or less utilization of network capacity.
   */
  average_block_size: number;
  /**
   * Maximum block size is decided by the set of active witnesses which change every round.
   * Each witness posts what they think the maximum size should be as part of their witness
   * properties, the median size is chosen to be the maximum block size for the round.
   *
   * @note the minimum value for maximum_block_size is defined by the protocol to prevent the
   * network from getting stuck by witnesses attempting to set this too low.
   */
  maximum_block_size: number;
  /**
   * The current absolute slot number. Equal to the total
   * number of slots since genesis. Also equal to the total
   * number of missed slots plus head_block_number.
   */
  current_aslot: number;
  /**
   * Used to compute witness participation.
   */
  recent_slots_filled: Bignum;
  participation_count: number;
  last_irreversible_block_num: number;
  /**
   * The maximum bandwidth the blockchain can support is:
   *
   *    max_bandwidth = maximum_block_size * BANDWIDTH_AVERAGE_WINDOW_SECONDS / BLOCK_INTERVAL
   *
   * The maximum virtual bandwidth is:
   *
   *    max_bandwidth * current_reserve_ratio
   */
  max_virtual_bandwidth: Bignum;
  /**
   * Any time average_block_size <= 50% maximum_block_size this value grows by 1 until it
   * reaches MAX_RESERVE_RATIO.  Any time average_block_size is greater than
   * 50% it falls by 1%.  Upward adjustments happen once per round, downward adjustments
   * happen every block.
   */
  current_reserve_ratio: number;
  /**
   * The number of votes regenerated per day.  Any user voting slower than this rate will be
   * "wasting" voting power through spillover; any user voting faster than this rate will have
   * their votes reduced.
   */
  vote_power_reserve_rate: number;
}

/**
 * Return the vesting share price.
 */
export function getVestingSharePrice(props: DynamicGlobalProperties): Price {
  // empty string is needed to skip the type check error
  const totalVestingFund = Asset.from(props.total_vesting_fund_blurt);
  const totalVestingShares = Asset.from(props.total_vesting_shares);
  if (totalVestingFund.amount === 0 || totalVestingShares.amount === 0) {
    return new Price(new Asset(1, "VESTS"), new Asset(1, "BLURT"));
  }
  return new Price(totalVestingShares, totalVestingFund);
}

/**
 * Returns the vests of specified account. Default: Subtract delegated & add received
 */
export function getVests(
  account: Account,
  subtract_delegated = true,
  add_received = true
) {
  let vests: Asset = Asset.from(account.vesting_shares);
  const vests_delegated: Asset = Asset.from(account.delegated_vesting_shares);
  const vests_received: Asset = Asset.from(account.received_vesting_shares);
  const withdraw_rate: Asset = Asset.from(account.vesting_withdraw_rate);
  const already_withdrawn =
    (Number(account.to_withdraw) - Number(account.withdrawn)) / 1000000;
  const withdraw_vests = Math.min(withdraw_rate.amount, already_withdrawn);
  vests = vests.subtract(withdraw_vests);

  if (subtract_delegated) {
    vests = vests.subtract(vests_delegated);
  }
  if (add_received) {
    vests = vests.add(vests_received);
  }

  return vests.amount;
}

/** Reward Fund (post) */
export interface RewardFund {
  id:                       number
  name:                     'post'
  reward_balance:           Asset
  recent_claims:            string
  last_update:              string // YYYY-MM-DDTHH:mm:ss
  content_constant:         string
  percent_curation_rewards: number
  percent_content_rewards:  number
  author_reward_curve:      'convergent_linear'
  curation_reward_curve:    'convergent_square_root'
}
