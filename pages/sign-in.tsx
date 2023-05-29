import SignInComp from '@/components/SignIn/SignInComp'
import React from 'react'
import { getProviders,useSession, signIn, signOut } from "next-auth/react"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";




export type Provider =  InferGetServerSidePropsType<typeof getServerSideProps>;

const SignIn = ({ providers }: Provider) => {
  return (
    <SignInComp providers={providers}/>
  )
}

export default SignIn

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    
    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
      return { redirect: { destination: "/enroll" } };
    }
  
    const providers = await getProviders();
    
    return {
      props: { providers: providers ?? [] },
    }
  }