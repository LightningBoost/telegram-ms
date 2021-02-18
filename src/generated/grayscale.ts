import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type PurchaseFilter = {
  id?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['DateTime']>;
};

export type Grayscale = {
  __typename?: 'Grayscale';
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  shares: Scalars['Float'];
  bitcoinsPerShare: Scalars['Float'];
  fiat: Scalars['Float'];
  bought: Scalars['Float'];
  bitcoinPrice: Scalars['Float'];
  total: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  allPurchases: Array<Grayscale>;
  getPurchase?: Maybe<Array<Maybe<Grayscale>>>;
  getLatestPurchase?: Maybe<Grayscale>;
};

export type QueryAllPurchasesArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type QueryGetPurchaseArgs = {
  filter?: Maybe<PurchaseFilter>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (sdkFunction) => sdkFunction();
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {};
}
export type Sdk = ReturnType<typeof getSdk>;
