'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { UserTable } from "@/app/types/userTable";

export default function UserPage({
    params: { id },
  }: {
    params: { id: string }
  }) {
    const [user, setUser] = useState<UserTable>();
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const response = await axios.get<UserTable>(`/api/users/${id}`);
                    console.log(response)
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
    
            fetchUser();
        }, []);

    return (
        <div id={`${user?.id}`} className="bg-gray-100 rounded-lg p-6 shadow-md">
          <h1 id="username-text" className="text-2xl font-bold mb-2">{user?.name}</h1>
          <h2 id="email-text" className="text-lg text-gray-600">Email: {user?.email}</h2>
        </div>
      );
}

