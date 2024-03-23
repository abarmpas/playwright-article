'use client'

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button, DropdownMenu, Table } from "@radix-ui/themes"
import { AiOutlineArrowDown } from "react-icons/ai";
import axios from "axios";
import { UserTable } from "../types/userTable";

const UsersPage = () => {
    const [users, setUsers] = useState<UserTable[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<UserTable[]>('/api/users');
                console.log(response)
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
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

            </div>
            <Table.Root variant="surface" id="users-table">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {users.map((user) => (
                        <Table.Row key={user?.id} id="user-row">
                            <Table.Cell id="name">
                                <Link href={`/users/${user?.id}`}>{user?.name}</Link>
                            </Table.Cell>
                            <Table.Cell id="email">{user?.email}</Table.Cell>
                            
                        </Table.Row>   
                    ))}
                </Table.Body>
            </Table.Root>
        </nav>
    )
}

export default UsersPage