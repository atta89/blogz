import { NextPage } from "next";

export type Page<P = {}> = NextPage<P> & {
  layout?: ComponentType;
  title?: string;
  page?: number;
};

export default Page;
