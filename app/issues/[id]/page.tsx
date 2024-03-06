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
        <div id={`${issue?.id}`} className="bg-blue-100 rounded-lg p-6 shadow-md">
          <h1 className="text-xl font-bold mb-2">{issue?.title}</h1>
          <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">Status:</span>
                <span className={`px-2 py-1 rounded ${issue?.status === 'OPEN' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {issue?.status}
                </span>
          </div>
          <div className="flex items-center">
                <span className="text-gray-600 mr-2">Created At:</span>
                <span>{issue?.createdAt}</span>
          </div>
        </div>
      );
}

