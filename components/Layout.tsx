import React, { ReactElement, ReactNode } from "react";
import Header from "./Header/Header";
import Head from "next/head";
import setupAnalytics from "../utils/setupAnalytics";

interface Props {
  children: ReactNode;
  activeLink?: string;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  activeLink,
  title,
  description,
}: Props): ReactElement {
  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-173273228-2"
        ></script>
        <script>
          {
            //@ts-ignore
          }
          {setupAnalytics()}
        </script>

        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Head>
      <div className="p-0 m-0 font-bold lg:text-xl text-primary">
        <Header activeLink={activeLink} />
        <main className="w-full m-auto mb-24 font-normal md:w-3/4 xl:w-1/2">
          {children}
        </main>
      </div>
    </>
  );
}