'use client';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Button, CalloutRoot, CalloutText, TextFieldInput, TextFieldRoot } from "@radix-ui/themes"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occured.')
        }
    });

    return (
        <div className="max-w-xl">
            {error && <CalloutRoot color="red" className="mb-3">
                <CalloutText>{error}</CalloutText>
            </CalloutRoot>}
            <form 
                className="space-y-3" 
                onSubmit={onSubmit}>
                <TextFieldRoot>
                    <TextFieldInput placeholder="Title" {...register('title')}/>
                </TextFieldRoot>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller 
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage