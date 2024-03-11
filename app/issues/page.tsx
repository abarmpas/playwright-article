'use client'

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button, DropdownMenu, Table } from "@radix-ui/themes"
import { AiOutlineArrowDown } from "react-icons/ai";
import axios from "axios";
import StatusPill from "../components/Status";
import { IssueTable } from "../types/issueTable";

const IssuesPage = () => {
    const [issues, setIssues] = useState<IssueTable[]>([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get<IssueTable[]>('/api/issues');
                console.log(response)
                setIssues(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchIssues();
    }, []);

    return (
        <nav className="w-3/4">
            <div className="flex w-full justify-between mb-3">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                    <Button variant="soft">
                        Options
                        <AiOutlineArrowDown width="12" height="12" />
                    </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content variant="solid">
                    <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                    <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

                    <DropdownMenu.Separator />
                    <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                        Delete
                    </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <Button><Link href='/issues/new'>New Issue</Link></Button>
            </div>
            <Table.Root variant="surface" id="issues-table">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue?.id} id="issue-row">
                            <Table.RowHeaderCell id="title">
                                <Link href={`/issues/${issue?.id}`}>{issue?.title}</Link>
                            </Table.RowHeaderCell>
                            <Table.Cell id="status">
                                <StatusPill status={issue?.status} />
                            </Table.Cell>
                            <Table.Cell id="created-at">{issue?.createdAt}</Table.Cell>
                            
                        </Table.Row>   
                    ))}
                </Table.Body>
            </Table.Root>
        </nav>
    )
}

export default IssuesPage