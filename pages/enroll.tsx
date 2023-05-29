import { GetServerSidePropsContext, InferGetServerSidePropsType, NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import React,{useEffect, useState} from 'react'
import { authOptions } from './api/auth/[...nextauth]';
import { getProviders } from 'next-auth/react';
import EnrollComp from '@/components/Enroll/EnrollComp';
import mongoConn from '@/lib/mongoConn';
import Student from '@/models/Student';
import { getStudentData } from '@/queries/queryFunctions';
import {useQuery} from "@tanstack/react-query"

function enroll({providers} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  

  return (
    <EnrollComp />
  )
}

export default enroll


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return { redirect: { destination: "/sign-in" } };
    }
    await mongoConn();
    const student = await Student.findOne({email : session.user?.email});
    if(student?._id){
        return {
          redirect: {
            permanent: false,
            destination: "/profile",
          },
          props:{},
        }
    }
    const providers = await getProviders();
    return {
      props: { providers: providers ?? [] },
    }
}