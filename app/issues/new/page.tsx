'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Button, CalloutRoot, CalloutText, TextArea, TextFieldInput, TextFieldRoot } from "@radix-ui/themes"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();
    const [error, setError] = useState('');

    return (
        <div className="max-w-xl">
            {error && <CalloutRoot color="red" className="mb-3">
                <CalloutText>{error}</CalloutText>
            </CalloutRoot>}
            <form 
                className="space-y-3" 
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setError('An unexpected error occured.')
                    }
                })}>
                <TextFieldRoot>
                    <TextFieldInput placeholder="Title" {...register('title')}/>
                </TextFieldRoot>
                <Controller 
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage