import ProfileComp from '@/components/Profile/ProfileComp'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import mongoConn from '@/lib/mongoConn'
import Student from '@/models/Student'
import { getProviders } from 'next-auth/react'

const Profile = () => {
  return (
    <ProfileComp/>
  )
}

export default Profile

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return { redirect: { destination: "/sign-in" } };
    }
    await mongoConn();
    const student = await Student.findOne({email : session.user?.email});
    if(!student?._id){
        return {
          redirect: {
            permanent: false,
            destination: "/enroll",
          },
          props:{},
        }
    }
    const providers = await getProviders();
    return {
      props: { providers: providers ?? [] },
    }
}