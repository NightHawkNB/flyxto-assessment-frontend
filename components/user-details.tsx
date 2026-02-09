"use client";

import { useUser } from '@clerk/nextjs'

const UserDetails = () => {

    const { user, isLoaded } = useUser();

    if(isLoaded) localStorage.setItem("userEmail", user?.emailAddresses[0].emailAddress || "");

    return (
        <div></div>
    )
}

export default UserDetails