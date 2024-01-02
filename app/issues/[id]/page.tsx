'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { IssueTable } from "@/app/types/issueTable";

export default function IssuePage({
    params: { id },
  }: {
    params: { id: string }
  }) {
    const [issue, setIssue] = useState<IssueTable>();
        useEffect(() => {
            const fetchIssue = async () => {
                try {
                    const response = await axios.get<IssueTable>(`/api/issues/${id}`);
                    console.log(response)
                    setIssue(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
    
            fetchIssue();
        }, []);

    return (
        <div id={`${issue?.id}`} style={{ height: '100vh', padding: 50 }}>
          <h1 style={{ color: 'red' }}>Title: {issue?.title}</h1>
          <p>Description: {issue?.status}</p>
        </div>
      );
}

